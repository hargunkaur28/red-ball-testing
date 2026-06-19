import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import SEOLandingLayout, { ContactBand } from '../../components/seo/SEOLandingLayout';
import { breadcrumbSchema } from '../../components/seo/schemas';
import { useAcademyInfo } from '../../hooks/useAcademyInfo';

const schema = breadcrumbSchema([{ name: 'Terms and Conditions', path: '/terms-and-conditions' }]);

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>{title}</h2>
    <div className="text-sm text-[#0D0D0D]/70 leading-relaxed space-y-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </div>
  </section>
);

export default function TermsAndConditions() {
  const academy = useAcademyInfo();
  return (
    <SEOLandingLayout>
      <SEOHead
        title="Terms and Conditions | Red Ball Sports Arena Rohtak"
        description="Terms and Conditions for Red Ball Sports Arena and Red Ball Academy, Rohtak, Haryana. Booking rules, membership terms, payments, cancellations & more."
        canonical="/terms-and-conditions"
        schema={schema}
      />

      {/* Header */}
      <div className="bg-[#0D0D0D] text-white px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-white/50 text-xs hover:text-white mb-4 inline-block" style={{ fontFamily: "'DM Sans', sans-serif" }}>← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>Terms and Conditions</h1>
          <p className="text-white/50 text-sm mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Red Ball Sports Arena / Red Ball Academy · Last updated: June 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        <Section title="About These Terms">
          <p>
            These Terms and Conditions govern your use of the Red Ball Sports Arena website (<strong>redballsportsarena.in</strong>) and your access to all facilities and services operated by Red Ball Sports Arena / Red Ball Academy at Sector 22-D, Jhajjar Road, Rohtak, Haryana 124001.
          </p>
          <p>
            By creating an account, booking a slot, purchasing a membership, or visiting the facility, you agree to these terms. Please read them carefully.
          </p>
        </Section>

        <Section title="Slot Booking">
          <ul className="list-disc ml-5 space-y-2">
            <li>Bookings are confirmed only after successful payment or explicit confirmation by a super admin.</li>
            <li>Booked slots are time-bound. Entry is allowed during the booked slot window only.</li>
            <li>A QR code is issued upon confirmation. Present this QR code at the facility entrance for check-in.</li>
            <li>Late arrivals do not get an extension of the booked time. The slot ends at the original scheduled time.</li>
            <li>We reserve the right to cancel or reschedule slots due to facility maintenance, technical issues, or force majeure. In such cases, a credit or refund will be offered.</li>
            <li>Sharing your QR code with others for simultaneous or unauthorised access is not permitted and may result in account suspension.</li>
          </ul>
        </Section>

        <Section title="Memberships and Subscriptions">
          <ul className="list-disc ml-5 space-y-2">
            <li>Memberships are personal and non-transferable. A membership can only be used by the registered member.</li>
            <li>Membership benefits, session quotas, and validity are as specified in the plan purchased. Check the Membership page for current plans.</li>
            <li>Unused sessions do not carry forward beyond the membership expiry date.</li>
            <li>Membership cancellations mid-term are generally non-refundable unless the cancellation is due to a facility-side issue.</li>
            <li>We may modify membership pricing and benefits with reasonable advance notice. Existing memberships are honoured at the purchased terms.</li>
            <li>Kids academy memberships require a parent or guardian's consent and contact details.</li>
          </ul>
        </Section>

        <Section title="Payments and Refunds">
          <ul className="list-disc ml-5 space-y-2">
            <li>Payments are processed securely through <strong>Razorpay</strong>. We accept UPI, cards, net banking, and wallets.</li>
            <li>All prices are in Indian Rupees (INR) and inclusive of applicable taxes where stated.</li>
            <li>Refunds for cancellations made 24 hours or more before the booked slot may be processed at our discretion. Cancellations less than 24 hours before the slot are non-refundable.</li>
            <li>If a booking is rejected or cancelled by the facility, a full refund will be processed to the original payment method within 5–7 business days.</li>
            <li>Manual payments made in person and recorded by a super admin are non-refundable unless explicitly agreed in writing.</li>
          </ul>
        </Section>

        <Section title="Facility Rules and Conduct">
          <ul className="list-disc ml-5 space-y-2">
            <li>All visitors must behave respectfully toward staff, coaches, and other users at all times.</li>
            <li>Appropriate sportswear and footwear is required for all sports activities. The facility is not responsible for injuries resulting from improper clothing or footwear.</li>
            <li>Smoking, alcohol, and non-prescribed substances are strictly prohibited on the premises.</li>
            <li>Children must be accompanied and supervised by a parent or guardian unless enrolled in a supervised kids program.</li>
            <li>Users are responsible for their personal belongings. Red Ball Sports Arena is not liable for lost, stolen, or damaged property.</li>
            <li>Any damage to facility equipment or property caused by a user must be compensated by that user.</li>
          </ul>
        </Section>

        <Section title="QR Code and Check-In">
          <ul className="list-disc ml-5 space-y-2">
            <li>Each booking generates a unique QR code for facility access.</li>
            <li>QR codes are single-use or session-bound as specified.</li>
            <li>Entry without a valid QR code or membership check-in is not permitted.</li>
            <li>Session overtime — staying beyond the booked slot — may attract an additional charge at the prevailing rate, applied automatically or manually by staff.</li>
          </ul>
        </Section>

        <Section title="Restaurant and Food Orders">
          <ul className="list-disc ml-5 space-y-2">
            <li>Food and beverage orders placed at our on-site restaurant are subject to the restaurant's own menu and pricing.</li>
            <li>Once an order is prepared and delivered to your table, it cannot be cancelled or refunded.</li>
            <li>Dietary requirements and allergies should be communicated to staff before ordering. We cannot guarantee allergen-free preparation.</li>
            <li>Table orders placed through the portal are attributed to the specific table and must be paid before leaving.</li>
          </ul>
        </Section>

        <Section title="Academy and Kids Programs">
          <ul className="list-disc ml-5 space-y-2">
            <li>Enrollment in the kids sports academy requires accurate age and contact information for the child and parent/guardian.</li>
            <li>An admission fee may apply in addition to the membership fee. This is non-refundable once paid.</li>
            <li>Red Ball Academy reserves the right to place a child in an appropriate age/skill batch, which may differ from the parent's preference.</li>
            <li>Photography or video of children during academy sessions requires express written permission.</li>
          </ul>
        </Section>

        <Section title="Court and Facility Availability">
          <ul className="list-disc ml-5 space-y-2">
            <li>Court and facility availability is subject to maintenance schedules, seasonal adjustments, and operational hours.</li>
            <li>Operating hours may change during public holidays or special events. We will communicate changes in advance where possible.</li>
            <li>Red Ball Sports Arena reserves the right to close or restrict any area for maintenance, safety, or legal reasons.</li>
          </ul>
        </Section>

        <Section title="Health and Safety">
          <ul className="list-disc ml-5 space-y-2">
            <li>Users participate in all sports and physical activities at their own risk.</li>
            <li>Users with medical conditions are advised to consult a physician before engaging in physical activity at the facility.</li>
            <li>Red Ball Sports Arena is not liable for injuries resulting from normal sporting activity, provided facility equipment is maintained in safe condition.</li>
          </ul>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, Red Ball Sports Arena's liability for any claim arising out of your use of the facility or website is limited to the amount paid by you for the specific booking or service in question. We are not liable for indirect, consequential, or incidental damages.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            We may update these Terms and Conditions periodically. Updates will be posted on this page with a revised date. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>
        </Section>

        <Section title="Governing Law">
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Rohtak, Haryana.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            For queries about these Terms and Conditions:<br />
            <strong>{academy.academyName}</strong><br />
            {academy.address}<br />
            Email: <a href={`mailto:${academy.email}`} className="text-[#C8102E] hover:underline">{academy.email}</a><br />
            Phone: <a href={`tel:${academy.phone.replace(/\s/g, '')}`} className="text-[#C8102E] hover:underline">{academy.phone}</a>
          </p>
        </Section>

        <div className="pt-6 border-t border-black/10">
          <Link to="/privacy-policy" className="text-[#C8102E] text-sm font-semibold hover:underline" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            View Privacy Policy →
          </Link>
        </div>
      </div>

      <ContactBand />
    </SEOLandingLayout>
  );
}
