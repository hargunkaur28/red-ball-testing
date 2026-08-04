# Alchemy 360 Cricket Academy & Sports Ground

Welcome to the official repository of **Alchemy 360**, a premium multi-sports facility and cricket academy located in Rohtak, Haryana. 

This platform serves as the digital gateway for athletes, members, and visitors to interact with the facility, book play times, manage memberships, and order from the on-site restaurant.

---

## 🏏 What is Alchemy 360?

**Alchemy 360** is more than just a cricket ground—it is a state-of-the-art sports complex designed to nurture athletic talent and provide premium spaces for recreational play. From professional-grade pitches to floodlit courts, Alchemy 360 is the ultimate hub for sports lovers.

### 📍 Location & Contact
*   **Academy Location:** Haryana 124001

## 👥 Who is this Platform for?

The Alchemy 360 web portal connects everyone involved with the academy and ground:

### 1. **Players & Recreational Athletes**
Allows anyone to book world-class sports facilities by the hour. No long-term commitment or membership required—simply pick a sport, select a time slot, and play.

### 2. **Academy Members & Trainees**
Designed for members enrolled in training programs, particularly the **Alchemy 360 Cricket Academy** (affiliated/registered with the Haryana Cricket Association). Trainees can manage their schedules, view coaching details under Head Coach Mandeep Singh, and track membership status.

### 3. **Diners & Visitors**
Integrated with the on-site restaurant, the portal lets visitors view menus, place orders, and coordinate table service while enjoying their time at the sports ground.

### 4. **Management & Staff**
Includes dedicated portals for coaches, restaurant managers, and super-administrators to manage slot bookings, process payments, view orders, and handle user check-ins.

---

## ⚡ Key Features of the Website

*   **Cinematic Experience:** An immersive, high-production intro sequence that greets visitors and sets a premium tone.
*   **24/7 Hourly Rentals:** A live booking calendar for renting sports facilities like Cricket grounds, Badminton courts, Football pitches, Swimming slots, and Gym time.
*   **Coaching & Memberships:** Multi-tier membership plans for recreational access and professional academy coaching.
*   ~~**On-Site Restaurant Orders:** Seamless ordering system for the complex's food and beverage services.~~ *(frontend currently disabled — see [Restaurant module](#-restaurant-module-disabled))*
*   **QR Code Entry & Check-In:** Digital member passes for instant, contactless check-ins at the physical gates.
*   **Interactive Dashboards:** Tailored user interfaces for customers, managers, and super-admins.

---

## 📚 Developer Docs

*   [Transactional Email](docs/EMAIL.md) — Brevo setup, the env vars to fill in, what gets sent and when, and the scrapped Hostinger SMTP config kept for reference.

---

## 🍽️ Restaurant module (disabled)

The restaurant/food-ordering feature is **switched off, frontend and API**. Nothing was
deleted — every entry point is commented out and tagged with a `RESTAURANT DISABLED`
marker, so the whole module can be brought back by uncommenting. Find every site with:

```bash
grep -rn "RESTAURANT DISABLED" client/src server
```

The routes, controllers, models and jobs all still exist and compile. Only the HTTP
mounts and the UI that reaches them are commented out, so the feature is unreachable
from a browser **and** from a direct API call.

### What was commented out, and where

| Surface | File | What went |
| --- | --- | --- |
| Home page | `client/src/pages/Home.jsx` | `FeaturedMenu` + `RestaurantTeaser` sections and their imports |
| Public navbar | `client/src/components/home/Navbar.jsx` | "Restaurant" nav link (desktop + mobile drawer) |
| Hero CTA | `client/src/components/home/HeroSection.jsx` | `manager` role no longer deep-links to `/restaurant` |
| User sidebar | `client/src/components/layout/UserLayout.jsx` | "Order Food" and "Order History" menu items |
| User bottom nav | `client/src/components/layout/UserLayout.jsx` | "Order Food" tab (mobile) |
| User dashboard | `client/src/pages/user/Dashboard.jsx` | `my-orders` query, the "Order Food" / "Order History" quick-action tiles, and the "Recent Food Orders" list |
| Super Admin sidebar | `client/src/components/layout/SuperAdminLayout.jsx` | "Order Management", "Menu Items", "Tables & QR" |
| Hero tiles | `client/src/components/home/HeroSection.jsx` | the "Order Food" landing tile |
| Super Admin settings | `client/src/pages/admin/Settings.jsx` | the "Delivery Charge" card (it called `/api/kitchen`); its query is left in place but `enabled: false` |
| Routes | `client/src/App.jsx` | `/table-portal`, `/table/:tableId`, `/user/table-portal`, `/user/orders`, the Super Admin `orders`/`menu`/`tables` routes, and the entire `/restaurant` manager panel |
| Login redirect | `client/src/store/authStore.js` | `manager` role now lands on `/user` instead of the removed `/restaurant` |

### API mounts commented out — `server/index.js`

| Mount | Serves |
| --- | --- |
| `/api/orders` | food orders (+ its three `restaurantOrderLimiter` rate-limit rules) |
| `/api/menu` | menu items |
| `/api/tables` | restaurant tables & QR |
| `/api/kitchen` | kitchen status and delivery-charge settings |
| `/api/inventory` | stock, only ever consumed by `order.controller` |

All five now return **404**. Everything else (`/api/sports`, `/api/slots`,
`/api/memberships`, …) is unaffected. The `require(...)` lines for these routers are
deliberately left in place so uncommenting a single `app.use` line restores each one.

**Not disabled:** the scheduled low-stock alert job still runs (`jobs/` is untouched),
and the `Order`/`MenuItem`/`Table` models are still read by analytics aggregations.
Neither is reachable over HTTP, but remove the cron if you want it fully silent.

### Note on the `manager` role

`manager` existed **only** to access the restaurant panel — it has no other screens.
With the panel disabled its post-login redirect points at `/user`, so a manager
account still logs in successfully but sees the ordinary member dashboard. If the
restaurant is re-enabled, restore the redirect in `authStore.js` alongside the routes.

### Files kept but no longer reachable

These are still in the repo and still compile; they simply have no route pointing at
them: `pages/table/*`, `pages/restaurant/*`, `pages/user/OrderHistory.jsx`,
`components/layout/RestaurantLayout.jsx`, `components/home/FeaturedMenu.jsx`,
`components/home/RestaurantTeaser.jsx`.
