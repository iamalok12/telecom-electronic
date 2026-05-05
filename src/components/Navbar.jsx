import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import shop from '../data/shop.json'
import nav from '../data/navigation.json'
import { getCtaLinks } from '../utils/links'
import { PhoneIcon, MenuIcon, CloseIcon } from './Icons'
import brandIcon from '../assets/brand-icon.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cta = getCtaLinks()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-white' : 'text-slate-300 hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? 'bg-ink-950/85 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-600/20 text-brand-300 ring-1 ring-brand-500/30 group-hover:bg-brand-600/30 transition">
            <img src={brandIcon} alt="Brand Icon" className="w-6 h-6 object-contain" />
          </span>
          <span className="font-bold text-white text-lg tracking-tight">
            {shop.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.primary.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass} end={item.path === '/'}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={cta.tel}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition shadow-lg shadow-brand-600/20"
          >
            <PhoneIcon className="w-4 h-4" />
            Call Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-lg text-slate-200 hover:bg-white/5"
        >
          {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-ink-950/95 backdrop-blur">
          <div className="container-x py-3 flex flex-col">
            {nav.primary.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-base ${
                    isActive ? 'text-white bg-white/5' : 'text-slate-300 hover:bg-white/5'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <a
              href={cta.tel}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-600 text-white text-sm font-semibold"
            >
              <PhoneIcon className="w-4 h-4" />
              Call {shop.primaryPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
