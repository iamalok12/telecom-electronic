import { getCtaLinks } from '../utils/links'
import { PhoneIcon, WhatsAppIcon } from './Icons'

export default function FloatingCTA() {
  const cta = getCtaLinks()
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:bottom-6 md:right-6">
      <a
        href={cta.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
      >
        <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a
        href={cta.tel}
        aria-label="Call now"
        className="grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition md:hidden"
      >
        <PhoneIcon className="w-5 h-5" />
      </a>
    </div>
  )
}
