// Helper functions for creating structured data (JSON-LD)

export function createWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://telecom-electronics.com/#website',
    name: 'Telecom Electronics',
    url: 'https://telecom-electronics.com',
    description: 'Your trusted partner for advanced security and surveillance solutions in Patna, Bihar',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://telecom-electronics.com/#organization',
      name: 'Telecom Electronics',
      url: 'https://telecom-electronics.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://telecom-electronics.com/logo.png'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://telecom-electronics.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}

export function createLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://telecom-electronics.com',
    name: 'Telecom Electronics',
    alternateName: 'Security Zone',
    description: 'Your trusted partner for advanced security and surveillance solutions. We specialize in CCTV systems, access control, fire safety, networking, and complete security infrastructure.',
    image: 'https://telecom-electronics.com/og-image.jpg',
    logo: 'https://telecom-electronics.com/logo.png',
    url: 'https://telecom-electronics.com',
    telephone: '+917004831973',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Prabhat Building, Opposite Veena Cinema, Pillar No 17, Main Station Road, Frazer Road',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      postalCode: '800001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.5941',
      longitude: '85.1376'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '21:00'
      }
    ],
    sameAs: [
      'https://facebook.com/',
      'https://instagram.com/',
      'https://youtube.com/'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150'
    }
  }
}

export function createProductStructuredData(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image || 'https://telecom-electronics.com/product-placeholder.jpg',
    description: product.description || `${product.name} from Telecom Electronics`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Telecom Electronics'
    },
    offers: {
      '@type': 'Offer',
      url: `https://telecom-electronics.com/products#${product.id}`,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Telecom Electronics'
      }
    }
  }
}

export function createBreadcrumbStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
