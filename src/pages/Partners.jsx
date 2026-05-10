import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import SectionHeader from '../components/SectionHeader'
import AnimateIn from '../components/AnimateIn'

export default function Partners() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Check sessionStorage cache first
        const cachedPartners = sessionStorage.getItem('partners')
        
        if (cachedPartners) {
          // Use cached data for instant loading
          setPartners(JSON.parse(cachedPartners))
          setLoading(false)
          return
        }

        // Fetch from Firestore if no cache
        const querySnapshot = await getDocs(collection(db, 'partners'))
        const partnersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        const sortedPartners = partnersData.sort((a, b) => a.name.localeCompare(b.name))
        setPartners(sortedPartners)
        sessionStorage.setItem('partners', JSON.stringify(sortedPartners))
      } catch (error) {
        console.error('Error fetching partners:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  return (
    <div className="container-x py-14 md:py-20">
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
    </div>
  )
}
