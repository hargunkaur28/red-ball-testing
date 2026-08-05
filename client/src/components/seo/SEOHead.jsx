// SPA limitation: react-helmet-async injects tags after JS executes.
// Google renders JS and will see per-page meta correctly.
// Non-JS crawlers (some AI bots) may only see the index.html base tags.
// Mitigation: llms.txt + sitemap.xml act as the content map for non-JS crawlers.
// Future improvement: add Vite SSR/prerendering for SEO routes if needed.
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.alchemy360.in';
const SITE_NAME = 'Alchemy 360';
const DEFAULT_IMAGE = `${SITE_URL}/banner.png`;

export default function SEOHead({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
}) {
  const fullTitle = title.includes('Alchemy 360') ? title : `${title} | Alchemy 360 Rohtak`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${fullTitle} — Alchemy 360, Rohtak`} />

      {/* Geo */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Rohtak, Haryana, India" />

      {/* Schema JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
