export const SITE_URL = 'https://redballsportsarena.in';

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
