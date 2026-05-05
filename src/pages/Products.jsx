import { useMemo, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
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
      <SectionHeader
        eyebrow="Our Products"
        title="Cameras, recorders & accessories"
        subtitle="Browse our catalogue of CCTV cameras, DVR/NVR systems and security accessories. Call us for live pricing and combos."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                isActive
                  ? 'bg-brand-600 text-white border-brand-500 shadow shadow-brand-600/20'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              {t.name}
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-slate-400">No products available in this category.</p>
      )}
    </div>
  )
}
