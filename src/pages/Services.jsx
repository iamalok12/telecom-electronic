import SectionHeader from '../components/SectionHeader'
import services from '../data/services.json'
import shop from '../data/shop.json'
import { ServiceIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons'
import { getCtaLinks } from '../utils/links'

export default function Services() {
  const cta = getCtaLinks()
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeader
        eyebrow="Services"
        title="End-to-end security services"
        subtitle="Whether you need a fresh installation or maintenance for an existing setup, our team handles it on-site with care."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition"
          >
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200">
              <ServiceIcon name={s.icon} className="w-6 h-6" />
            </span>
            <h3 className="mt-5 text-gray-900 font-semibold text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.description}</p>
            <ul className="mt-4 space-y-2">
              {s.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 mt-0.5 text-brand-600 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Need a free site survey?</h3>
          <p className="mt-2 text-gray-600">Talk to our team and get a tailored quote — no obligations.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={cta.tel} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition">
            <PhoneIcon className="w-5 h-5" /> Call {shop.primaryPhone}
          </a>
          <a href={cta.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition">
            <WhatsAppIcon className="w-5 h-5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
