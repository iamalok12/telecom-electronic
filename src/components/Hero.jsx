import { useRef, useState, useEffect } from 'react'
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
  const [detected, setDetected] = useState(false)
  const [threatLevel, setThreatLevel] = useState(0)
  const [scanAngle, setScanAngle] = useState(0)
  const [motionPings, setMotionPings] = useState([])

  const [clock, setClock] = useState(() => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))

  // Rotate scan line
  useEffect(() => {
    const id = setInterval(() => setScanAngle((a) => (a + 2) % 360), 30)
    return () => clearInterval(id)
  }, [])

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })), 1000)
    return () => clearInterval(id)
  }, [])

  // Randomly simulate motion detection
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.3) {
        setDetected(true)
        setThreatLevel(Math.floor(Math.random() * 3) + 1)
        const x = 30 + Math.random() * 40
        const y = 30 + Math.random() * 40
        const ping = { id: Date.now(), x, y }
        setMotionPings((prev) => [...prev.slice(-2), ping])
        setTimeout(() => setDetected(false), 2000)
      }
    }, 3000)
    return () => clearInterval(id)
  }, [])

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
            Trusted since 1984 · 2 Locations · Local CCTV & security experts
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

            {/* Surveillance monitor outer shell */}
            <div className={`relative aspect-square rounded-[2rem] border bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden shadow-2xl transition-all duration-500 ${detected ? 'border-red-400 shadow-red-500/30' : 'border-slate-700 shadow-brand-500/10'}`}>

              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-20 [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.4)_2px,rgba(0,0,0,0.4)_4px)]" />

              {/* Radar grid */}
              <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(0,255,100,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,.8)_1px,transparent_1px)] [background-size:24px_24px]" />

              {/* Top HUD bar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-slate-900/80 backdrop-blur border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${detected ? 'bg-red-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${detected ? 'text-red-400' : 'text-emerald-400'}`}>
                    {detected ? 'MOTION DETECTED' : 'MONITORING ACTIVE'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">CAM-01</span>
              </div>

              {/* Radar sweep */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative w-44 h-44">
                  {/* Concentric rings */}
                  {[44, 88, 132, 176].map((size) => (
                    <div key={size} className="absolute border border-emerald-500/20 rounded-full" style={{ width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                  ))}
                  {/* Cross hairs */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-emerald-500/20" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-px h-full bg-emerald-500/20" />
                  </div>
                  {/* Sweep line */}
                  <div
                    className="absolute inset-0 origin-center"
                    style={{ transform: `rotate(${scanAngle}deg)` }}
                  >
                    <div className="absolute top-0 left-1/2 w-px h-1/2 origin-bottom"
                      style={{ background: 'linear-gradient(to top, rgba(0,255,100,0.6), transparent)' }}
                    />
                  </div>
                  {/* Sweep glow wedge */}
                  <div
                    className="absolute inset-0 origin-center rounded-full overflow-hidden"
                    style={{ transform: `rotate(${scanAngle}deg)` }}
                  >
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 origin-bottom-right"
                      style={{ background: 'conic-gradient(from 0deg at 100% 100%, rgba(0,255,100,0.15) 0deg, transparent 60deg)' }}
                    />
                  </div>
                  {/* Camera icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`grid place-items-center w-14 h-14 rounded-full border transition-all duration-300 ${detected ? 'bg-red-500/20 border-red-400/50' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                      <CameraIcon className={`w-7 h-7 transition-colors duration-300 ${detected ? 'text-red-400' : 'text-emerald-400'}`} />
                    </div>
                  </div>
                  {/* Motion ping blips */}
                  {motionPings.map((p) => (
                    <div key={p.id} className="absolute w-2 h-2 rounded-full bg-red-400 animate-ping" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }} />
                  ))}
                </div>
              </div>

              {/* Bottom HUD bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-slate-900/80 backdrop-blur border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <ShieldIcon className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-[10px] font-semibold text-brand-400 tracking-wider">SECURED</span>
                </div>
                {/* Threat level bar */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Threat</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((lvl) => (
                      <div key={lvl} className={`w-3 h-2 rounded-sm transition-all duration-300 ${detected && lvl <= threatLevel ? (lvl === 3 ? 'bg-red-500' : lvl === 2 ? 'bg-orange-400' : 'bg-yellow-400') : 'bg-slate-700'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{clock}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
