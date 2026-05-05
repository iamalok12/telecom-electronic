import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'
import brands from '../data/brands.json'
import services from '../data/services.json'
import { ServiceIcon, ArrowRightIcon } from '../components/Icons'

export default function Home() {
  const featured = products.items.filter((p) => p.featured).slice(0, 4)
  const topServices = services.items.slice(0, 3)

  return (
    <div>
      <Hero />

      {/* Featured Products */}
      <section className="container-x py-16 md:py-20">
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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="container-x py-16 md:py-20">
        <SectionHeader
          eyebrow="Our Services"
          title="More than just a shop"
          subtitle="From the first site visit to long-term maintenance, we handle every part of your security setup."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition"
            >
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200">
                <ServiceIcon name={s.icon} className="w-5 h-5" />
              </span>
              <h3 className="mt-4 text-gray-900 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all services <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Brands strip */}
      <section className="container-x py-16 md:py-20">
        <SectionHeader
          eyebrow="Brands We Stock"
          title="Trusted by leading security brands"
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {brands.items.slice(0, 12).map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-5 px-3 grid place-items-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition shadow-sm"
            >
              {b.name}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/brands"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all brands <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
