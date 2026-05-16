import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import SectionHeader from '../components/SectionHeader'
import AnimateIn from '../components/AnimateIn'
import SEO from '../components/SEO'
import { createBreadcrumbStructuredData } from '../utils/structuredData'
import clientsData from '../data/clients.json'

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
              <div className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.clients.length} clients</p>
                  </div>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.clients.map((client, clientIndex) => (
                    <AnimateIn 
                      key={`${category.id}-${clientIndex}`} 
                      variant="scale" 
                      delay={Math.min(clientIndex * 30, 400)}
                    >
                      <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 hover:border-brand-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-100 to-brand-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-10 -mt-10 rounded-full blur-2xl"></div>
                        
                        {/* Client name */}
                        <div className="relative">
                          <div className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 rounded-full bg-brand-500 shrink-0"></div>
                            <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-brand-700 transition-colors">
                              {client}
                            </h4>
                          </div>
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
