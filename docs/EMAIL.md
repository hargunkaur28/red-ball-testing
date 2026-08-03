# Transactional Email

All outgoing email goes through a single module: [`server/utils/emailService.js`](../server/utils/emailService.js).
Controllers only ever import the named `send*` helpers from it — none of them talk to a
mail provider directly. Swapping providers therefore means rewriting one `send()`
function, not touching the eight call sites.

---

## Current provider — Brevo (since 4 Aug 2026)

Mail is sent over the **Brevo transactional HTTP API**, not SMTP:

```
POST https://api.brevo.com/v3/smtp/email
headers: { 'api-key': BREVO_API_KEY }
body:    { sender: { email, name }, to: [{ email }], subject, htmlContent }
```

The HTTP API is used instead of Brevo's SMTP relay because outbound SMTP ports are
frequently blocked on PaaS hosts, and the API returns a usable error body
(`{ code, message }`) instead of a generic socket timeout.

### Environment variables

Set these in `server/.env`:

| Variable            | Required | Purpose                                                                 |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `BREVO_API_KEY`     | yes      | Brevo → SMTP & API → API Keys. Starts with `xkeysib-`.                   |
| `BREVO_SENDER_EMAIL`| yes      | The From address. **Must be a verified sender or a domain you authenticated in Brevo**, otherwise every send is rejected. |
| `BREVO_SENDER_NAME` | no       | From display name. Defaults to `Alchemy 360 Academy`.                   |
| `BREVO_REPLY_TO`    | no       | Reply-To address. Omitted from the payload when unset.                  |

`BREVO_API_KEY` and `BREVO_SENDER_EMAIL` are enforced at boot by
[`server/config/validateEnv.js`](../server/config/validateEnv.js) — the server refuses
to start without them.

### Verifying it works

```bash
cd server
node scripts/testEmail.js            # sends to BREVO_SENDER_EMAIL
node scripts/testEmail.js you@x.com  # or to an address you pass
```

It sends a membership welcome email (with a rendered invoice) and an admin payment
alert, so it exercises both the largest HTML body and the admin path.

### What gets sent, and when

| Helper                             | Trigger                                          | Recipient              |
| ---------------------------------- | ------------------------------------------------ | ---------------------- |
| `sendPasswordResetOTP`             | Forgot-password request                          | the user               |
| `sendFailedLoginAlert`             | Repeated failed logins on a privileged account   | that account           |
| `sendMembershipWelcomeEmail`       | Membership activated (manual or Razorpay)        | the member             |
| `sendAdminPaymentAlert`            | Any payment captured                             | `ADMIN_NOTIFICATION_EMAIL` |
| `sendOneTimePassUserEmail`         | One-time pass purchased                          | the buyer              |
| `sendOrderReadyEmail`              | Restaurant order marked ready                    | the customer           |
| `sendKitchenOrderEmail`            | New restaurant order placed                      | `MANAGER_EMAIL`        |
| `sendSlotBookingConfirmationEmail` | Slot booked / booking paid                       | the player             |

Every call site is fire-and-forget with a `.catch()` that logs — a mail failure must
never roll back a payment or a booking. Keep it that way.

Recipient fields accept a comma-separated list, so `ADMIN_NOTIFICATION_EMAIL` and
`MANAGER_EMAIL` can each hold several addresses.

---

## Previous provider — Hostinger SMTP via Nodemailer (scrapped 4 Aug 2026)

Recorded here so the old configuration isn't lost. **This is no longer wired up** —
`nodemailer` has been removed from `server/package.json`.

It used a pooled Nodemailer SMTP transport against Hostinger's mail server:

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,              // STARTTLS on 587
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
  auth: {
    user: process.env.EMAIL_USER,   // full mailbox address, e.g. noreply@yourdomain
    pass: process.env.EMAIL_PASS,   // that mailbox's password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const getSender = () =>
  `"${process.env.EMAIL_SENDER_NAME || 'Alchemy 360 Academy'}" <${process.env.EMAIL_USER}>`;

const send = ({ to, subject, htmlContent }) =>
  transporter.sendMail({ from: getSender(), to, subject, html: htmlContent });
```

Its env vars were `EMAIL_USER`, `EMAIL_PASS` and `EMAIL_SENDER_NAME`. They are no
longer read by any code; the entries left in `server/.env` are dead and safe to
delete once the Brevo migration is confirmed working in production.

Notes on why it was replaced, worth remembering if it's ever reconsidered:

- The mailbox password sat in `EMAIL_PASS`, so a leak exposed a real mailbox rather
  than a revocable API key.
- `tls.rejectUnauthorized: false` disabled certificate verification, which defeats
  the point of STARTTLS and was presumably a workaround for a cert mismatch.
- Shared-hosting SMTP has low daily send caps and no delivery/bounce reporting; Brevo
  gives per-message logs and a dashboard.
- The 60s timeouts meant a hung SMTP connection could pin a pooled socket for a
  minute at a time under load.

### Restoring it

1. `npm install nodemailer` in `server/`.
2. Put the block above back at the top of `server/utils/emailService.js`, replacing the
   Brevo `send()`. The eight `send*` helpers below it are provider-agnostic and need
   no changes.
3. Swap `BREVO_API_KEY` / `BREVO_SENDER_EMAIL` back to `EMAIL_USER` / `EMAIL_PASS` in
   `server/config/validateEnv.js`.
