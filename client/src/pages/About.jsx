import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Trophy, Users, Star, Tv2, ArrowRight } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { useAcademyInfo } from '../hooks/useAcademyInfo';

const SPORTS = [
  {
    name: 'Box Cricket / Cricket',
    icon: '🏏',
    desc: 'Professional floodlit cricket ground for day-night matches. Supports hard-ball and tennis-ball cricket. Home of the Rohtak Cricket League (RCL). Box 360 — Rohtak\'s first 24/7 circular box cricket facility.',
    link: '/sports/box-cricket',
  },
  {
    name: 'Badminton',
    icon: '🏸',
    desc: 'Wooden-floored courts to BWF dimension standards. Match-standard lighting with no shadows. Singles and doubles play. Coaching from beginner to advanced; kids program from age 6+.',
    link: '/sports/badminton',
  },
  {
    name: 'Swimming',
    icon: '🏊',
    desc: 'Open-air pool with daily water quality monitoring. Certified instructors. Four-level program from Beginner to Advanced. Kids Aqua Tots program from age 4. Lifeguard supervision at all times.',
    link: '/sports/swimming',
  },
  {
    name: 'Pickleball',
    icon: '🎾',
    desc: 'Dedicated pickleball courts to IFP specifications — one of the very few in Haryana. Equipment provided. Coaching for beginners available. Corporate pickleball events hosted.',
    link: '/sports/pickleball',
  },
  {
    name: 'Gym & Fitness',
    icon: '🏋️',
    desc: 'Modern cardio equipment, free weights, fixed weight machines, and functional training area. Personal training available. Open 5:00 AM to 11:00 PM daily.',
    link: '/sports/gym',
  },
  {
    name: 'Kids Sports Academy',
    icon: '🧒',
    desc: 'Multi-sport youth program covering cricket, badminton, and swimming. Age 4–14. Milestone-based progression. Morning and evening batches around school schedules.',
    link: '/kids-sports-academy-rohtak',
  },
];

const STATS = [
  { value: '4.7★', label: '312+ Google Reviews' },
  { value: '500+', label: 'Active Members' },
  { value: '6', label: 'Sports & Facilities' },
  { value: '5AM–11PM', label: 'Open Every Day' },
];

const TIMELINE = [
  { year: 'Founded', text: 'Alchemy 360 Sports Arena was established by Sonu Malik with a vision to bring world-class multi-sport facilities to Rohtak, Haryana.' },
  { year: 'Cricket', text: 'The cricket ground quickly became the home of the Rohtak Cricket League (RCL) — Rohtak\'s premier T20 competition, broadcast live on YouTube, Siti Cable, and DEN Networks.' },
  { year: 'Expansion', text: 'Added badminton courts, swimming pool, gym, pickleball courts, and Box 360 — making Alchemy 360 one of the most comprehensive private sports complexes in Haryana.' },
  { year: 'Today', text: 'Serving 500+ active members across Rohtak and surrounding districts. Registered with the Haryana Cricket Association (HCA).' },
];

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const academy = useAcademyInfo();

  return (
    <>
      <SEOHead
        title="About Alchemy 360 Sports Arena — Rohtak's Premier Multi-Sport Complex"
        description="Learn about Alchemy 360 Sports Arena in Rohtak, Haryana — founded by Sonu Malik. Home of the Rohtak Cricket League. Cricket, badminton, swimming, pickleball, gym & kids academy."
        canonical="/about"
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[#0A0D0D] pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: '#C5DB3B' }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8" style={{ background: '#F5A623' }} />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
          <FadeIn>
            <p className="text-[#C5DB3B] text-xs font-black uppercase tracking-[0.25em] mb-4">Rohtak, Haryana · Est. Alchemy 360 Sports Arena</p>
            <h1
              className="text-white leading-none mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '2px' }}
            >
              About Alchemy 360<br />Sports Arena
            </h1>
            <p className="text-white/55 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Rohtak's most comprehensive private multi-sport complex — cricket, badminton, swimming, pickleball, gym, and a kids academy under one roof. Home of the Rohtak Cricket League.
            </p>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-14 rounded-2xl overflow-hidden border border-white/8">
              {STATS.map((s, i) => (
                <div key={i} className="bg-white/5 px-6 py-5 text-center">
                  <p className="text-white font-black text-2xl leading-none mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}>{s.value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <p className="text-[#C5DB3B] text-xs font-black uppercase tracking-[0.25em] mb-3">Our Story</p>
              <h2 className="text-[#0D0D0D] font-black text-4xl md:text-5xl leading-none mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1.5px' }}>
                Built for Rohtak's Sports Community
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Alchemy 360 Sports Arena was founded by <strong className="text-[#0D0D0D]">Sonu Malik</strong> with a single goal: to give the people of Rohtak access to world-class sports infrastructure — no compromises.
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                What started as a cricket ground has grown into Rohtak's most complete sports destination — six sports, a kids academy, an on-site restaurant, digital QR-based entry, and the home of the Rohtak Cricket League (RCL), broadcast live across Haryana.
              </p>
              <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Located at Sector 22-D, Jhajjar Road, the facility serves members from Rohtak, Jhajjar, Bahadurgarh, Sonipat, and across the Delhi NCR.
              </p>

              {/* Founder chip */}
              <div className="flex items-center gap-4 mt-8 p-4 rounded-2xl bg-gray-50 border border-gray-100 w-fit">
                <div className="w-11 h-11 rounded-full bg-[#C5DB3B] flex items-center justify-center text-white font-black text-sm shrink-0" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>SM</div>
                <div>
                  <p className="text-[#0D0D0D] font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sonu Malik</p>
                  <p className="text-[#9CA3AF] text-xs uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Founder & Owner</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C5DB3B] shrink-0 mt-1.5" />
                      {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-5">
                      <p className="text-[#C5DB3B] text-xs font-black uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.year}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="bg-[#F9F6F1] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <FadeIn>
            <p className="text-[#C5DB3B] text-xs font-black uppercase tracking-[0.25em] mb-3">What We Offer</p>
            <h2 className="text-[#0D0D0D] font-black text-4xl md:text-5xl leading-none mb-12" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1.5px' }}>
              Sports & Facilities
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPORTS.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.06}>
                <Link
                  to={s.link}
                  className="group block bg-white rounded-2xl p-6 border border-black/5 hover:border-[#C5DB3B]/20 hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="text-[#0D0D0D] font-black text-base mb-2 group-hover:text-[#C5DB3B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.name}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-[#C5DB3B] text-xs font-bold">
                    Learn more <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── RCL ── */}
      <section className="bg-[#0A0D0D] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <p className="text-[#C5DB3B] text-xs font-black uppercase tracking-[0.25em] mb-3">Cricket in Rohtak</p>
              <h2 className="text-white font-black text-4xl md:text-5xl leading-none mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1.5px' }}>
                Home of the Rohtak Cricket League
              </h2>
              <p className="text-white/55 leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Alchemy 360 Sports Arena is the official home ground of the <strong className="text-white">Rohtak Cricket League (RCL)</strong> — Rohtak's premier 20-over T20 competition featuring corporate and franchise teams from Rohtak, Haryana, and Delhi NCR.
              </p>
              <p className="text-white/55 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                RCL matches are broadcast live on YouTube, Siti Cable, and DEN Networks — making it one of the few local cricket leagues in Haryana with full live television and digital coverage.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { icon: <Tv2 size={14} />, text: 'Live on YouTube & TV' },
                  { icon: <Trophy size={14} />, text: '20-over T20 Format' },
                  { icon: <Users size={14} />, text: 'Corporate & Franchise Teams' },
                  { icon: <Star size={14} />, text: 'Floodlit Night Matches' },
                ].map((chip) => (
                  <span key={chip.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/60 border border-white/10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {chip.icon}{chip.text}
                  </span>
                ))}
              </div>
              <Link
                to="/rohtak-cricket-league"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[#C5DB3B] text-white font-bold text-sm hover:bg-[#96AC2E] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About the RCL <ArrowRight size={14} />
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-white/8">
                <img
                  src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAEP6A9XM-alVILJusO_Ifjrou4zYxU11ifUO2r_Pp2xb-PNxA7lV5vhtFrzmCk3CvcZHoGrtVEWDZ9Aly35PnKv7TVIKs3JVNXyMtsRE7CqUru4Jzvr9sonCeG2npxvlUuWOhhI=s1360-w1360-h1020-rw"
                  alt="Rohtak Cricket League at Alchemy 360 Sports Arena"
                  className="w-full h-72 object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Location & Contact ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <FadeIn>
            <p className="text-[#C5DB3B] text-xs font-black uppercase tracking-[0.25em] mb-3">Find Us</p>
            <h2 className="text-[#0D0D0D] font-black text-4xl md:text-5xl leading-none mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1.5px' }}>
              Location & Contact
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <MapPin size={18} className="text-[#C5DB3B]" />, label: 'Address', value: 'Sector 22-D, Jhajjar Road, near Village-Maina, Rohtak, Haryana 124001' },
              { icon: <Clock size={18} className="text-[#C5DB3B]" />, label: 'Hours', value: academy.operatingHours },
              { icon: <Phone size={18} className="text-[#C5DB3B]" />, label: 'Phone', value: academy.phone },
              { icon: <Mail size={18} className="text-[#C5DB3B]" />, label: 'Email', value: academy.email },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.07}>
                <div className="bg-[#F9F6F1] rounded-2xl p-6 h-full">
                  <div className="mb-3">{item.icon}</div>
                  <p className="text-[#0D0D0D] font-bold text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.value}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/book-slots"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C5DB3B] text-white font-bold hover:bg-[#96AC2E] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book a Slot <ArrowRight size={14} />
              </Link>
              <Link
                to="/buy-membership"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#0D0D0D] text-[#0D0D0D] font-bold hover:bg-[#0D0D0D] hover:text-white transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View Memberships
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
