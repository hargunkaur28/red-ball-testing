// Fallback visuals and metadata for sports that don't have custom images/descriptions in the DB

const FALLBACKS = {
  badminton: {
    icon: '🏸',
    tagline: 'Fast. Precise. Electrifying.',
    rentalEquipment: '🏸 Racket & Shuttle available for renting',
    description:
      'Professional indoor badminton courts with premium synthetic flooring, LED tournament lighting, and proper net standards. Whether you are a weekend warrior or training for competition, our courts deliver the performance surface you deserve.',
    features: ['Indoor Courts', 'Coaching Available', 'Equipment Rental', 'Beginner Friendly', 'LED Lighting', 'AC Courts'],
    chips: ['Indoor', 'AC Courts'],
    thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625310591486-6ab1bf8b81a3?q=80&w=800&auto=format&fit=crop',
    ],
    color: '#E84393',
  },



  gym: {
    icon: '🏋️',
    tagline: 'Forge Your Strength.',
    rentalEquipment: '🏋️ Wide range of equipment available',
    description:
      'A fully equipped strength and conditioning facility with modern machines, free weights, cardio equipment, and dedicated functional training zones. Personal trainers available to build customised plans for your goals.',
    features: ['Free Weights', 'Cardio Zone', 'Strength Machines', 'Functional Training', 'Personal Training', 'Locker Rooms'],
    chips: ['AC Facility', 'Personal Trainers', 'Equipment Included'],
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    ],
    color: '#F5A623',
  },
  pickleball: {
    icon: '🎾',
    tagline: 'The Fastest Growing Sport.',
    rentalEquipment: '🎾 Paddle & Ball included',
    description:
      'Dedicated pickleball courts with premium cushioned flooring, proper net heights, and great lighting. Join the fastest-growing sport in India — fun for all ages, perfect for singles and doubles.',
    features: ['Dedicated Courts', 'Cushioned Flooring', 'Paddles Available', 'Coaching Sessions', 'Beginner Programs', 'Tournament Play'],
    chips: ['Indoor Courts', 'Paddles Available', 'Beginner Friendly', 'AC Facility'],
    thumbnail: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    ],
    color: '#A855F7',
  },
};

const DEFAULT_FALLBACK = {
  icon: '🏆',
  tagline: 'World-Class Facilities Await.',
  description:
    'A premium sports facility at Alchemy 360 — professionally maintained, well-equipped, and open to members and walk-ins alike. Book by the hour or grab a membership for unlimited access.',
  features: ['Professional Facility', 'Trained Staff', 'Locker Rooms', 'Coaching Available'],
  chips: [],
  thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop',
  heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1400&auto=format&fit=crop',
  images: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop'],
  color: '#C5DB3B',
};

export function getSportFallback(slugOrName = '') {
  const key = slugOrName.toLowerCase().replace(/\s+/g, '-');
  return FALLBACKS[key] || DEFAULT_FALLBACK;
}
