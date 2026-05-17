import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import SectionHeader from '../components/SectionHeader'
import AnimateIn from '../components/AnimateIn'
import SEO from '../components/SEO'
import { createBreadcrumbStructuredData } from '../utils/structuredData'
import clientsData from '../data/clients.json'

// Icon helper for client categories
const getCategoryIcon = (categoryName) => {
  const icons = {
    'Government Sector': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    'Hotels': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    ),
    'Hospitals': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    'Colleges & Universities': (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  }
  return icons[categoryName] || icons['Government Sector']
}

export default function Partners() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Fetch from Firestore
        const querySnapshot = await getDocs(collection(db, 'partners'))
        const partnersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        const sortedPartners = partnersData.sort((a, b) => a.name.localeCompare(b.name))
        setPartners(sortedPartners)
      } catch (error) {
        console.error('Error fetching partners:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  const breadcrumbData = createBreadcrumbStructuredData([
    { name: 'Home', url: 'https://telecom-electronics.com/' },
    { name: 'Partners', url: 'https://telecom-electronics.com/partners' }
  ])

  return (
    <div className="container-x py-14 md:py-20">
      <SEO 
        title="Our Partners & Clients - Trusted Security Brands & Prestigious Clients"
        description="We stock and service products from leading security manufacturers. Trusted by 40+ prestigious clients including government institutions, hospitals, hotels, and universities across Bihar and Jharkhand."
        keywords="CCTV brands, security brands, Hikvision, Dahua, CP Plus, security manufacturers, government clients, hospital security, hotel security, university security, Bihar security systems"
        url="https://telecom-electronics.com/partners"
        structuredData={breadcrumbData}
      />
      <AnimateIn variant="fade-up">
        <SectionHeader
          eyebrow="Partners"
          title="We stock and service trusted partners"
          subtitle="A curated selection of leading security manufacturers — so you get reliable hardware and genuine warranty support."
        />
      </AnimateIn>

      {loading ? (
        <div className="mt-10 text-center text-gray-500">Loading partners...</div>
      ) : partners.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">No partners available at the moment.</div>
      ) : (
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {partners.map((partner, i) => (
            <AnimateIn key={partner.id} variant="scale" delay={Math.min(i * 35, 500)}>
              <div className="group rounded-2xl border-2 border-gray-200 bg-white hover:border-brand-400 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-white group-hover:from-brand-50 group-hover:to-white transition-all duration-300 flex items-center justify-center">
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm md:text-base font-semibold text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 bg-white">
                  <h3 className="text-sm font-semibold text-gray-900 text-center truncate">{partner.name}</h3>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      )}

      {/* Trusted Clients Section */}
      <div className="mt-24 md:mt-32">
        <AnimateIn variant="fade-up">
          <SectionHeader
            eyebrow="Trusted By"
            title="Our Prestigious Clients"
            subtitle="Serving government institutions, leading hotels, healthcare facilities, and educational institutions across Bihar and Jharkhand since 1984."
            align="center"
          />
        </AnimateIn>

        <div className="mt-12 space-y-16">
          {clientsData.categories.map((category, catIndex) => (
            <AnimateIn key={category.id} variant="fade-up" delay={catIndex * 100}>
              <div className="relative mb-12">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-brand-200">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full inline-block">
                      {category.clients.length} Prestigious Clients
                    </p>
                  </div>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {category.clients.map((client, clientIndex) => (
                    <AnimateIn 
                      key={`${category.id}-${clientIndex}`} 
                      variant="scale" 
                      delay={Math.min(clientIndex * 30, 400)}
                    >
                      <div className="group relative overflow-hidden rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 hover:border-brand-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[100px] flex items-center">
                        {/* Decorative gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Icon */}
                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all flex items-center justify-center">
                            {getCategoryIcon(category.name)}
                          </div>
                        </div>
                        
                        {/* Client name */}
                        <div className="relative flex-1 pr-12">
                          <div className="flex items-start gap-3">
                            <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0 ring-4 ring-brand-100"></div>
                            <h4 className="text-base font-bold text-gray-900 leading-tight group-hover:text-brand-700 transition-colors">
                              {client}
                            </h4>
                          </div>
                        </div>

                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                        </div>
                      </div>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Trust Badge */}
        <AnimateIn variant="fade-up" delay={200}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-200">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900">40+ Years</p>
                  <p className="text-sm text-gray-600">of Excellence & Trust</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 max-w-2xl">
                Serving <span className="font-semibold text-brand-700">{clientsData.categories.reduce((acc, cat) => acc + cat.clients.length, 0)}+ prestigious clients</span> with cutting-edge security solutions and unmatched service.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
