import { useMemo, useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import AnimateIn from '../components/AnimateIn'

export default function Products() {
  const [active, setActive] = useState('all')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch products and categories from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsSnapshot = await getDocs(collection(db, 'products'))
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProducts(productsData)

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'))
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filtered = useMemo(() => {
    if (active === 'all') return products
    return products.filter((p) => p.category === active)
  }, [active, products])

  const tabs = [{ id: 'all', name: 'All' }, ...categories]

  return (
    <div className="container-x py-14 md:py-20">
      <AnimateIn variant="fade-up">
        <SectionHeader
          eyebrow="Our Products"
          title="Cameras, recorders & accessories"
          subtitle="Browse our advanced range of security, surveillance and safety solutions. Call us for live pricing and combos."
        />
      </AnimateIn>

      <AnimateIn variant="fade-up" delay={100} className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                isActive
                  ? 'bg-brand-600 text-white border-brand-500 shadow shadow-brand-600/20'
                  : 'bg-white text-gray-600 hover:text-gray-900 border-gray-200 hover:border-gray-300'
              }`}
            >
              {t.name}
            </button>
          )
        })}
      </AnimateIn>

      {loading ? (
        <div className="mt-10 text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <AnimateIn key={p.id} variant="fade-up" delay={Math.min(i * 60, 400)}>
                <ProductCard product={p} />
              </AnimateIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-gray-500">
              {products.length === 0 
                ? 'No products available yet. Check back soon!' 
                : 'No products available in this category.'}
            </p>
          )}
        </>
      )}
    </div>
  )
}
