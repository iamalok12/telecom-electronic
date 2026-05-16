import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

export default function SEO({ 
  title = 'Telecom Electronics',
  description = 'Your trusted partner for advanced CCTV cameras, security systems, and surveillance solutions in Patna. Professional installation, maintenance, and 24/7 support.',
  keywords = 'CCTV cameras, security systems, surveillance, Patna, Bihar, CCTV installation, security solutions, IP cameras, DVR, NVR',
  image = '/og-image.jpg',
  url = 'https://telecom-electronics.com',
  type = 'website',
  author = 'Telecom Electronics',
  structuredData = null
}) {
  const fullTitle = title === 'Telecom Electronics' ? title : `${title} | Telecom Electronics`
  const siteUrl = url || 'https://telecom-electronics.com'

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Telecom Electronics" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-BR" />
      <meta name="geo.placename" content="Patna" />
      <meta name="geo.position" content="25.5941;85.1376" />
      <meta name="ICBM" content="25.5941, 85.1376" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  structuredData: PropTypes.object
}
