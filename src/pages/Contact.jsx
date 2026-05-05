import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import AnimateIn from '../components/AnimateIn'
import shop from '../data/shop.json'
import { getCtaLinks, buildWhatsAppLink } from '../utils/links'
import { PhoneIcon, MailIcon, MapPinIcon, WhatsAppIcon } from '../components/Icons'

export default function Contact() {
  const cta = getCtaLinks()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // No backend — open prefilled WhatsApp with the user's enquiry.
    const text = `Hi ${shop.name}, I'm ${form.name || 'a customer'}${
      form.phone ? ` (${form.phone})` : ''
    }. ${form.message || shop.whatsapp.defaultMessage}`
    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(shop.address.full)}&output=embed`

  return (
    <div className="container-x py-14 md:py-20">
      <AnimateIn variant="fade-up">
        <SectionHeader
          eyebrow="Contact"
          title="Let's secure your space"
          subtitle="Visit our shop, call us, or send a message on WhatsApp — we usually respond within minutes during business hours."
        />
      </AnimateIn>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        {/* Info side */}
        <div className="lg:col-span-2 space-y-4">
          <AnimateIn variant="fade-left" delay={0}>
          <a href={cta.tel} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 p-5 transition shadow-sm">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Call us</p>
              {shop.phones.map((p) => (
                <p key={p.number} className="text-gray-900 font-semibold">
                  {p.label}: {p.number}
                </p>
              ))}
            </div>
          </a>
          </AnimateIn>

          <AnimateIn variant="fade-left" delay={80}>
          <a href={cta.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 p-5 transition shadow-sm">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shrink-0">
              <WhatsAppIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">WhatsApp</p>
              <p className="text-gray-900 font-semibold">Chat with our team</p>
              <p className="text-sm text-gray-500 mt-0.5">Pre-filled with your enquiry</p>
            </div>
          </a>
          </AnimateIn>

          <AnimateIn variant="fade-left" delay={160}>
          <a href={cta.mail} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 p-5 transition shadow-sm">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 shrink-0">
              <MailIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Email</p>
              <p className="text-gray-900 font-semibold break-all">{shop.email}</p>
            </div>
          </a>
          </AnimateIn>

          <AnimateIn variant="fade-left" delay={240}>
          <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 shrink-0">
              <MapPinIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Visit shop</p>
              <p className="text-gray-900 font-medium">{shop.address.line1}</p>
              <p className="text-sm text-gray-500">{shop.address.line2}</p>
              <p className="text-sm text-gray-500">
                {shop.address.city}, {shop.address.state} {shop.address.pincode}
              </p>
              <div className="mt-3 text-sm text-gray-500 space-y-0.5">
                {shop.hours.map((h) => (
                  <p key={h.day}>
                    <span className="text-gray-700">{h.day}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
          </AnimateIn>
        </div>

        {/* Form + Map */}
        <AnimateIn variant="fade-right" className="lg:col-span-3 space-y-6">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <h3 className="text-gray-900 font-semibold text-lg">Send us a message</h3>
            <p className="text-sm text-gray-500 mt-1">
              Fill in your details and we'll continue the chat over WhatsApp.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-gray-700" htmlFor="name">Your name</label>
                <input
                  id="name" name="name" type="text" required
                  value={form.name} onChange={onChange}
                  className="mt-1.5 w-full rounded-lg bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700" htmlFor="phone">Phone</label>
                <input
                  id="phone" name="phone" type="tel"
                  value={form.phone} onChange={onChange}
                  className="mt-1.5 w-full rounded-lg bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-gray-700" htmlFor="message">How can we help?</label>
              <textarea
                id="message" name="message" rows="4"
                value={form.message} onChange={onChange}
                className="mt-1.5 w-full rounded-lg bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 resize-none"
                placeholder="I'm looking for a 4-camera CCTV setup for my shop..."
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-5 h-5" /> Send via WhatsApp
            </button>

            {submitted && (
              <p className="mt-3 text-sm text-emerald-600">
                Opening WhatsApp… you can also call us directly at {shop.primaryPhone}.
              </p>
            )}
          </form>

          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
            <iframe
              title={`${shop.name} location map`}
              src={mapsSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-72 md:h-80 border-0"
            />
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
