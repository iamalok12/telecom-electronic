import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import AnimateIn from '../components/AnimateIn'
import products from '../data/products.json'
import brands from '../data/brands.json'
import services from '../data/services.json'
import shop from '../data/shop.json'
import { ServiceIcon, ArrowRightIcon, MapPinIcon, PhoneIcon } from '../components/Icons'

export default function Home() {
  const featured = products.items.filter((p) => p.featured).slice(0, 4)
  const topServices = services.items.slice(0, 3)

  return (
    <div>
      <Hero />

      {/* Featured Products */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <SectionHeader
              eyebrow="Featured Products"
              title="Surveillance gear we recommend"
              subtitle="Hand-picked CCTV cameras and recorders from brands we trust and stock daily."
            />
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all products <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </AnimateIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <AnimateIn key={p.id} variant="fade-up" delay={i * 80}>
              <ProductCard product={p} />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <SectionHeader
            eyebrow="Our Services"
            title="More than just a shop"
            subtitle="From the first site visit to long-term maintenance, we handle every part of your security setup."
          />
        </AnimateIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((s, i) => (
            <AnimateIn key={s.id} variant="fade-up" delay={i * 100}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition h-full">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200">
                  <ServiceIcon name={s.icon} className="w-5 h-5" />
                </span>
                <h3 className="mt-4 text-gray-900 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn variant="fade-up" delay={100} className="mt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all services <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </section>

      {/* Brands strip */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <SectionHeader
            eyebrow="Brands We Stock"
            title="Trusted by leading security brands"
            align="center"
          />
        </AnimateIn>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {brands.items.slice(0, 12).map((b, i) => (
            <AnimateIn key={b.id} variant="scale" delay={i * 40}>
              <div className="rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-5 px-3 grid place-items-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition shadow-sm h-full">
                {b.name}
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn variant="fade-up" delay={100} className="mt-8 text-center">
          <Link
            to="/brands"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all brands <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </section>

      {/* Locations strip */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <SectionHeader
            eyebrow="Our Locations"
            title="Two branches, one team"
            subtitle="Visit either of our branches for sales, installation advice, and after-sales support."
            align="center"
          />
        </AnimateIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
          {shop.branches.map((b, i) => (
            <AnimateIn key={b.name} variant="fade-up" delay={i * 120}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition h-full">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="text-gray-900 font-bold text-lg">{b.name}</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 shrink-0">{b.tag}</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2.5">
                    <MapPinIcon className="w-4 h-4 mt-0.5 text-brand-600 shrink-0" />
                    <span>{b.address}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <PhoneIcon className="w-4 h-4 mt-0.5 text-brand-600 shrink-0" />
                    <a href={`tel:${b.phone.replace(/[^+\d]/g, '')}`} className="hover:text-brand-600 transition">{b.phone}</a>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-brand-600 font-bold shrink-0 mt-0.5">⏰</span>
                    <span>{b.hours}</span>
                  </li>
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </div>
  )
}
