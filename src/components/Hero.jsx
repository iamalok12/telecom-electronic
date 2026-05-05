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
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-brand-100/60 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(47,112,255,0.06),transparent_60%)]" />
      </div>

      <div
        className="container-x grid gap-10 lg:grid-cols-12 items-center pt-14 pb-20 md:pt-20 md:pb-28"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="lg:col-span-7 fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-medium text-brand-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Trusted local CCTV & security experts
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.05]">
            Protect what matters with
            <span className="block gradient-text">{shop.name}.</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
            {shop.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={cta.tel}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition shadow-lg shadow-brand-600/20"
            >
              <PhoneIcon className="w-5 h-5" />
              Call {shop.primaryPhone}
            </a>
            <a
              href={cta.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-lg shadow-emerald-600/20"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Us
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold border border-gray-200 transition"
            >
              Browse Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
            {shop.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <dt className="text-xl md:text-2xl font-bold text-gray-900">{s.value}</dt>
                <dd className="text-xs text-gray-500 mt-0.5">{s.label}</dd>
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
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-2xl" />
            <div className="relative aspect-square rounded-[2rem] glow-ring border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 grid place-items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(0,0,0,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.3)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative grid place-items-center w-44 h-44 rounded-full bg-brand-50 ring-1 ring-brand-200">
                <CameraIcon className="w-24 h-24 text-brand-600" />
              </div>
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 text-[11px] font-semibold border border-gray-200">
                <ShieldIcon className="w-3.5 h-3.5 text-brand-600" />
                Secured
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
