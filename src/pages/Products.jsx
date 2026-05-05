import { useMemo, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import AnimateIn from '../components/AnimateIn'
import products from '../data/products.json'

export default function Products() {
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return products.items
    return products.items.filter((p) => p.category === active)
  }, [active])

  const tabs = [{ id: 'all', name: 'All' }, ...products.categories]

  return (
    <div className="container-x py-14 md:py-20">
      <AnimateIn variant="fade-up">
        <SectionHeader
          eyebrow="Our Products"
          title="Cameras, recorders & accessories"
          subtitle="Browse our catalogue of CCTV cameras, DVR/NVR systems and security accessories. Call us for live pricing and combos."
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p, i) => (
          <AnimateIn key={p.id} variant="fade-up" delay={Math.min(i * 60, 400)}>
            <ProductCard product={p} />
          </AnimateIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No products available in this category.</p>
      )}
    </div>
  )
}
