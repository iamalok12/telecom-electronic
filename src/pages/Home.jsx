import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import AnimateIn from '../components/AnimateIn'
import PromotionPopup from '../components/PromotionPopup'
import shop from '../data/shop.json'
import { ServiceIcon, ArrowRightIcon, MapPinIcon, PhoneIcon } from '../components/Icons'

export default function Home() {
  const [products, setProducts] = useState([])
  const [solutions, setSolutions] = useState([])
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch featured products, solutions, and partners from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const q = query(
          collection(db, 'products'),
          where('featured', '==', true)
        )
        const productsSnapshot = await getDocs(q)
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProducts(productsData)

        // Fetch top 3 solutions
        const solutionsSnapshot = await getDocs(collection(db, 'solutions'))
        const solutionsData = solutionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).slice(0, 3)
        setSolutions(solutionsData)

        // Fetch top 12 partners
        const partnersSnapshot = await getDocs(collection(db, 'partners'))
        const partnersData = partnersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.name.localeCompare(b.name)).slice(0, 12)
        setPartners(partnersData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <PromotionPopup />
      <Hero />

      {/* Featured Products */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <SectionHeader
              eyebrow="Featured Products"
              title="Surveillance gear we recommend"
              subtitle="Hand-picked CCTV cameras and recorders from partners we trust and stock daily."
            />
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all products <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </AnimateIn>
        {loading ? (
          <div className="mt-10 text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading featured products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-10 text-center py-12">
            <p className="text-gray-600">No featured products available yet.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <AnimateIn key={p.id} variant="fade-up" delay={i * 80}>
                <ProductCard product={p} />
              </AnimateIn>
            ))}
          </div>
        )}
      </section>

      {/* Solutions preview */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <SectionHeader
            eyebrow="Our Solutions"
            title="More than just a shop"
            subtitle="From the first site visit to long-term maintenance, we handle every part of your security setup."
          />
        </AnimateIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
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
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all solutions <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </section>

      {/* Partners strip */}
      <section className="container-x py-16 md:py-20">
        <AnimateIn variant="fade-up">
          <SectionHeader
            eyebrow="Partners We Stock"
            title="Trusted by leading security partners"
            align="center"
          />
        </AnimateIn>
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {partners.map((partner, i) => (
            <AnimateIn key={partner.id} variant="scale" delay={i * 40}>
              <div className="group rounded-xl border-2 border-gray-200 bg-white hover:border-brand-400 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-white group-hover:from-brand-50 group-hover:to-white transition-all duration-300 flex items-center justify-center">
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-semibold text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="px-3 py-2 border-t border-gray-100 bg-white">
                  <h3 className="text-xs font-semibold text-gray-900 text-center truncate">{partner.name}</h3>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn variant="fade-up" delay={100} className="mt-8 text-center">
          <Link
            to="/partners"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all partners <ArrowRightIcon className="w-4 h-4" />
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
