import { useRef } from 'react'
import { Link } from 'react-router-dom'
import shop from '../data/shop.json'
import { getCtaLinks } from '../utils/links'
import { PhoneIcon, WhatsAppIcon, ArrowRightIcon, ShieldIcon, CameraIcon } from './Icons'

/**
 * Hero with subtle cursor-follow tilt parallax on the product visual.
 * Pure CSS transforms via inline style — no external animation libraries.
 */
export default function Hero() {
  const cta = getCtaLinks()
  const tiltRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotY = x * 12
    const rotX = -y * 12
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
  }

  const handleMouseLeave = () => {
    const el = tiltRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(47,112,255,0.12),transparent_60%)]" />
      </div>

      <div
        className="container-x grid gap-10 lg:grid-cols-12 items-center pt-14 pb-20 md:pt-20 md:pb-28"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="lg:col-span-7 fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Trusted local CCTV & security experts
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
            Protect what matters with
            <span className="block gradient-text">{shop.name}.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
            {shop.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={cta.tel}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition shadow-lg shadow-brand-600/30"
            >
              <PhoneIcon className="w-5 h-5" />
              Call {shop.primaryPhone}
            </a>
            <a
              href={cta.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-lg shadow-emerald-600/30"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Us
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition"
            >
              Browse Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
            {shop.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <dt className="text-xl md:text-2xl font-bold text-white">{s.value}</dt>
                <dd className="text-xs text-slate-400 mt-0.5">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 fade-in">
          <div
            ref={tiltRef}
            className="relative mx-auto max-w-md transition-transform duration-200 ease-out will-change-transform"
            style={{ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' }}
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-brand-600/20 to-transparent blur-2xl" />
            <div className="relative aspect-square rounded-[2rem] glow-ring border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-8 grid place-items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative grid place-items-center w-44 h-44 rounded-full bg-brand-600/15 ring-1 ring-brand-500/30">
                <CameraIcon className="w-24 h-24 text-brand-200" />
              </div>
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-slate-200 text-[11px] font-semibold border border-white/10">
                <ShieldIcon className="w-3.5 h-3.5 text-brand-300" />
                Secured
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
