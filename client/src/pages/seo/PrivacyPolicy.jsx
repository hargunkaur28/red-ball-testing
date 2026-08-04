import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { ContactBand } from '../../components/seo/SEOLandingLayout';
import { breadcrumbSchema } from '../../components/seo/schemas';
import { useAcademyInfo } from '../../hooks/useAcademyInfo';

const schema = breadcrumbSchema([{ name: 'Privacy Policy', path: '/privacy-policy' }]);

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>{title}</h2>
    <div className="text-sm text-[#0D0D0D]/70 leading-relaxed space-y-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </div>
  </section>
);

export default function PrivacyPolicy() {
  const academy = useAcademyInfo();
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Privacy Policy | Alchemy 360 Sports Arena Rohtak"
        description="Privacy Policy for Alchemy 360 Sports Arena and Alchemy 360 Academy, Rohtak, Haryana. Learn how we collect, use, and protect your personal data."
        canonical="/privacy-policy"
        schema={schema}
      />

      {/* Header */}
      <div className="bg-[#0D0D0D] text-white px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-white/50 text-xs hover:text-white mb-4 inline-block" style={{ fontFamily: "'DM Sans', sans-serif" }}>← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>Privacy Policy</h1>
          <p className="text-white/50 text-sm mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Alchemy 360 Sports Arena / Alchemy 360 Academy · Last updated: June 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        <Section title="Introduction">
          <p>
            Alchemy 360 Sports Arena ("we", "our", "us") operates the website at <strong>alchemy360.in</strong> and the Alchemy 360 Academy sports facility at Sector 22-D, Jhajjar Road, Rohtak, Haryana 124001.
          </p>
          <p>
            This Privacy Policy explains what information we collect when you use our website, book sports sessions, purchase memberships, or use our services — and how we use, store, and protect that information. By using our website or services, you agree to the terms described here.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p><strong>Account information:</strong> When you create an account on our platform, we collect your name, email address, phone number, and a hashed (encrypted) password.</p>
          <p><strong>Booking data:</strong> When you book a slot, we collect the sport selected, date/time, court, and payment details. We do not store full card numbers — payments are processed by Razorpay.</p>
          <p><strong>Membership data:</strong> Membership purchases include your name, contact details, selected plan, payment confirmation, and membership duration.</p>
          <p><strong>Food and table orders:</strong> If you place food orders at our restaurant, we collect your table number, order details, and payment status.</p>
          <p><strong>QR and check-in data:</strong> We generate and store QR codes linked to your bookings for facility entry. Check-in and check-out timestamps are recorded.</p>
          <p><strong>Communication:</strong> If you contact us via email, phone, or our website contact form, we retain that correspondence.</p>
          <p><strong>Device and usage data:</strong> We may collect browser type, IP address, pages visited, and time spent — used for site analytics and security.</p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use collected information to:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Process and manage slot bookings, memberships, and orders</li>
            <li>Send booking confirmations and reminders via SMS or email</li>
            <li>Generate QR codes for facility entry</li>
            <li>Process payments securely through Razorpay</li>
            <li>Provide customer support</li>
            <li>Send important updates about your account or bookings</li>
            <li>Improve our services based on usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>
        </Section>

        <Section title="Payments and Razorpay">
          <p>
            Online payments are processed by <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway. When you make a payment, you are redirected to Razorpay's secure environment. We receive payment confirmation but do not store your card details, UPI IDs, or banking credentials on our servers.
          </p>
          <p>
            Razorpay's privacy policy applies to payment processing. We recommend reviewing it at their official website.
          </p>
        </Section>

        <Section title="SMS and Email Notifications">
          <p>
            By creating an account, you agree to receive transactional messages (booking confirmations, payment receipts, membership reminders) via SMS and/or email. These are service messages, not marketing, and are required for the normal operation of the platform.
          </p>
          <p>
            If we send promotional communications, you can opt out by contacting us at <a href={`mailto:${academy.email}`} className="text-[#C5DB3B] hover:underline">{academy.email}</a>.
          </p>
        </Section>

        <Section title="Cookies and Local Storage">
          <p>
            Our website uses browser local storage to maintain your login session (authentication tokens). This is necessary for the platform to function. We do not use third-party advertising cookies.
          </p>
          <p>
            We may use basic analytics tools to understand how users interact with our site. These do not identify you personally.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>
            We retain your account and booking data for as long as your account is active, or as required to comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <p>
            If you request account deletion, we will remove your personal data within 30 days, subject to any legal retention requirements.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We take reasonable technical and organisational measures to protect your data against unauthorised access, alteration, or loss. These include password hashing, HTTPS encryption, JWT-based authentication with expiry, and rate limiting on sensitive endpoints.
          </p>
          <p>
            No system is completely secure. In the event of a data breach affecting your rights, we will notify you as required by applicable law.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Withdraw consent for non-essential communications</li>
          </ul>
          <p>To exercise these rights, contact us at <a href={`mailto:${academy.email}`} className="text-[#C5DB3B] hover:underline">{academy.email}</a>.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            Our kids sports academy serves children under parental supervision. Accounts for minors must be created and managed by a parent or guardian. We do not knowingly collect personal data directly from children without parental consent.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>We use the following third-party services that may process your data:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Razorpay</strong> — payment processing</li>
            <li><strong>Cloudinary</strong> — image hosting (sports/profile images)</li>
            <li><strong>Brevo (Sendinblue)</strong> — email delivery</li>
            <li><strong>Fast2SMS</strong> — SMS notifications</li>
            <li><strong>MongoDB Atlas</strong> — database hosting</li>
            <li><strong>Google OAuth</strong> — social sign-in (optional)</li>
          </ul>
          <p>Each of these services has its own privacy policy governing how they handle data.</p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised date. Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>For privacy-related queries, contact:</p>
          <p>
            <strong>{academy.academyName}</strong><br />
            {academy.address}<br />
            Email: <a href={`mailto:${academy.email}`} className="text-[#C5DB3B] hover:underline">{academy.email}</a><br />
            Phone: <a href={`tel:${academy.phone.replace(/\s/g, '')}`} className="text-[#C5DB3B] hover:underline">{academy.phone}</a>
          </p>
        </Section>

        <div className="pt-6 border-t border-black/10">
          <Link to="/terms-and-conditions" className="text-[#C5DB3B] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            View Terms and Conditions →
          </Link>
        </div>
      </div>

      <ContactBand />
    </SEOLandingLayout>
  );
}
