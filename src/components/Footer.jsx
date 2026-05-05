import { Link } from 'react-router-dom'
import shop from '../data/shop.json'
import nav from '../data/navigation.json'
import { getCtaLinks } from '../utils/links'
import { PhoneIcon, MailIcon, MapPinIcon, WhatsAppIcon, ShieldIcon } from './Icons'

export default function Footer() {
  const cta = getCtaLinks()
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-600/20 text-brand-300 ring-1 ring-brand-500/30">
              <ShieldIcon className="w-5 h-5" />
            </span>
            <span className="font-bold text-white text-lg">{shop.name}</span>
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-md leading-relaxed">
            {shop.shortIntro}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={cta.tel} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition">
              <PhoneIcon className="w-4 h-4" /> Call
            </a>
            <a href={cta.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            {nav.primary.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-slate-400 hover:text-white transition">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Reach Us</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <MapPinIcon className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
              <span>{shop.address.full}</span>
            </li>
            {shop.phones.map((p) => (
              <li key={p.number} className="flex gap-2.5">
                <PhoneIcon className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
                <a href={`tel:${p.number.replace(/[^+\d]/g, '')}`} className="hover:text-white transition">
                  {p.label}: {p.number}
                </a>
              </li>
            ))}
            <li className="flex gap-2.5">
              <MailIcon className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
              <a href={cta.mail} className="hover:text-white transition">{shop.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-slate-500">
          <p>© {year} {shop.name}. All rights reserved.</p>
          <p>Designed for reliability and trust.</p>
        </div>
      </div>
    </footer>
  )
}
