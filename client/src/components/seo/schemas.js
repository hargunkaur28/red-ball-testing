export const SITE_URL = 'https://www.redballsportsarena.in';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['SportsActivityLocation', 'LocalBusiness'],
  name: 'Red Ball Sports Arena',
  alternateName: 'Red Ball Academy',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/banner.png`,
  description:
    'Red Ball Sports Arena is a premier multi-sport complex in Rohtak, Haryana offering box cricket, badminton, pickleball, swimming, gym, and kids sports academy with membership plans and slot booking.',
  telephone: '+919350076653',
  email: 'redballcricketground@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 22-D, Jhajjar Road, near Village-Maina',
    addressLocality: 'Rohtak',
    addressRegion: 'Haryana',
    postalCode: '124001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.8955,
    longitude: 76.6066,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '05:00',
      closes: '23:00',
    },
  ],
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, UPI, Razorpay',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Red Ball Sports Arena',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919350076653',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Red Ball Sports Arena',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/book-slots?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export const stadiumOrArenaSchema = {
  '@context': 'https://schema.org',
  '@type': ['StadiumOrArena', 'SportsActivityLocation', 'LocalBusiness'],
  name: 'Red Ball Sports Arena',
  alternateName: ['Red Ball Cricket Ground', 'Red Ball Cricket Stadium', 'Redball Sports Arena'],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/banner.png`,
  description: 'Red Ball Sports Arena is a premier cricket stadium and multi-sport complex in Rohtak, Haryana — home of the Rohtak Cricket League, professional box cricket, and corporate sports events.',
  telephone: '+919350076653',
  email: 'redballcricketground@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 22-D, Jhajjar Road, near Village-Maina',
    addressLocality: 'Rohtak',
    addressRegion: 'Haryana',
    postalCode: '124001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.8955,
    longitude: 76.6066,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '05:00',
      closes: '23:00',
    },
  ],
  sport: ['Cricket', 'Box Cricket'],
  containsPlace: [
    { '@type': 'SportsActivityLocation', name: 'Box Cricket Ground' },
    { '@type': 'SportsActivityLocation', name: 'Badminton Courts' },
    { '@type': 'SportsActivityLocation', name: 'Swimming Pool' },
    { '@type': 'SportsActivityLocation', name: 'Gym' },
    { '@type': 'SportsActivityLocation', name: 'Pickleball Courts' },
  ],
};

export const sportsClubSchema = {
  '@context': 'https://schema.org',
  '@type': ['SportsClub', 'SportsActivityLocation', 'LocalBusiness'],
  name: 'Red Ball Sports Arena',
  alternateName: ['Red Ball Sports Club', 'Redball Sports Arena', 'Red Ball Academy'],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/banner.png`,
  description: 'Red Ball Sports Arena is Rohtak\'s premier multi-sport club — offering cricket, badminton, pickleball, swimming, gym, and kids academy with flexible membership plans.',
  telephone: '+919350076653',
  email: 'redballcricketground@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 22-D, Jhajjar Road, near Village-Maina',
    addressLocality: 'Rohtak',
    addressRegion: 'Haryana',
    postalCode: '124001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.8955,
    longitude: 76.6066,
  },
  sport: ['Cricket', 'Badminton', 'Pickleball', 'Swimming', 'Football', 'Gym'],
};

export const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Red Ball Sports Arena',
  url: SITE_URL,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '312',
    bestRating: '5',
    worstRating: '1',
  },
};

export function eventSchema({ name, description, startDate, endDate, location, organizer, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name,
    description,
    startDate,
    endDate,
    location: location || {
      '@type': 'SportsActivityLocation',
      name: 'Red Ball Sports Arena',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sector 22-D, Jhajjar Road, near Village-Maina',
        addressLocality: 'Rohtak',
        addressRegion: 'Haryana',
        postalCode: '124001',
        addressCountry: 'IN',
      },
    },
    organizer: organizer || {
      '@type': 'Organization',
      name: 'Red Ball Sports Arena',
      url: SITE_URL,
    },
    url: url || SITE_URL,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}

export function articleSchema({ title, description, datePublished, dateModified, slug, imagePrompt }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/banner.png`,
    author: {
      '@type': 'Organization',
      name: 'Red Ball Sports Arena',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Red Ball Sports Arena',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  };
}
