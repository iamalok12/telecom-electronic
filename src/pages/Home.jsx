import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import Hero from '../components/Hero'
import SecurityAwarenessBanner from '../components/SecurityAwarenessBanner'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import AnimateIn from '../components/AnimateIn'
import PromotionPopup from '../components/PromotionPopup'
import SEO from '../components/SEO'
import { createLocalBusinessStructuredData, createBreadcrumbStructuredData } from '../utils/structuredData'
import shop from '../data/shop.json'
import clientsData from '../data/clients.json'
import { ServiceIcon, ArrowRightIcon, MapPinIcon, PhoneIcon } from '../components/Icons'

// Icon helper for client categories
const getCategoryIcon = (category) => {
  const icons = {
    'Government': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    'Hotels': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    ),
    'Hospitals': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    'Colleges': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  }
  return icons[category] || icons['Government']
}

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

  const structuredData = createLocalBusinessStructuredData()
  const breadcrumbData = createBreadcrumbStructuredData([
    { name: 'Home', url: 'https://telecom-electronics.com/' }
  ])

  return (
    <div>
      <SEO 
        title="CCTV & Security Solutions in Patna, Bihar"
        description="Your trusted partner for advanced CCTV cameras, security systems, and surveillance solutions in Patna. Serving 40+ prestigious clients including government institutions, hospitals, and universities. Professional installation, maintenance, and 24/7 support since 1984."
        keywords="CCTV cameras Patna, security systems Bihar, surveillance solutions, CCTV installation, IP cameras, DVR, NVR, access control, fire safety, security infrastructure Patna, government security systems, hospital CCTV, university surveillance"
        url="https://telecom-electronics.com/"
        structuredData={[structuredData, breadcrumbData]}
      />
      <PromotionPopup />
      <Hero />
      <SecurityAwarenessBanner />

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

      {/* Trusted Clients Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-brand-50/30 to-orange-50/20 py-16 md:py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container-x relative z-10">
          <AnimateIn variant="fade-up">
            <SectionHeader
              eyebrow="Trusted By"
              title="Serving prestigious organizations"
              subtitle="From government institutions to leading hospitals and universities — security partners since 1984."
              align="center"
            />
          </AnimateIn>

          {/* Featured Clients Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {clientsData.featured.map((client, index) => (
            <AnimateIn key={index} variant="fade-up" delay={index * 60}>
              <div className="group relative overflow-hidden rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 hover:border-brand-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[140px] flex flex-col">
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon/Badge at top */}
                <div className="relative mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    {getCategoryIcon(client.category)}
                  </div>
                </div>
                
                {/* Client name */}
                <div className="relative flex-1">
                  <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-brand-700 transition-colors">
                    {client.name}
                  </h3>
                </div>

                {/* Category badge */}
                <div className="relative mt-4 pt-3 border-t-2 border-gray-200 group-hover:border-brand-300 transition-colors">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md inline-block">
                    {client.category}
                  </span>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
              </div>
            </AnimateIn>
          ))}
          </div>

          {/* Stats and CTA */}
          <AnimateIn variant="fade-up" delay={100}>
            <div className="mt-10 flex flex-col items-center gap-6">
              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-center">
                <div className="px-6 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-2xl font-bold text-brand-600">{clientsData.categories.reduce((acc, cat) => acc + cat.clients.length, 0)}+</p>
                  <p className="text-xs text-gray-600 mt-1">Trusted Clients</p>
                </div>
                <div className="px-6 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-2xl font-bold text-brand-600">40+</p>
                  <p className="text-xs text-gray-600 mt-1">Years of Service</p>
                </div>
                <div className="px-6 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-2xl font-bold text-brand-600">4</p>
                  <p className="text-xs text-gray-600 mt-1">Key Sectors</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/partners"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View all our clients <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>
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
