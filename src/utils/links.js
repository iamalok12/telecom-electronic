import shop from '../data/shop.json'

/**
 * Build canonical CTA links from shop JSON only.
 */
export function getCtaLinks() {
  const phone = shop.primaryPhone.replace(/[^+\d]/g, '')
  const wa = shop.whatsapp.number.replace(/\D/g, '')
  const msg = encodeURIComponent(shop.whatsapp.defaultMessage)
  return {
    tel: `tel:${phone}`,
    whatsapp: `https://wa.me/${wa}?text=${msg}`,
    mail: `mailto:${shop.email}`,
  }
}

export function buildWhatsAppLink(message) {
  const wa = shop.whatsapp.number.replace(/\D/g, '')
  const text = encodeURIComponent(message || shop.whatsapp.defaultMessage)
  return `https://wa.me/${wa}?text=${text}`
}
