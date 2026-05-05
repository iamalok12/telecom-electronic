import SectionHeader from '../components/SectionHeader'
import brands from '../data/brands.json'

export default function Brands() {
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeader
        eyebrow="Brands & Partners"
        title="We stock and service trusted brands"
        subtitle="A curated selection of leading security manufacturers — so you get reliable hardware and genuine warranty support."
      />

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {brands.items.map((b) => (
          <div
            key={b.id}
            className="aspect-[3/2] rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-brand-500/30 transition grid place-items-center px-3 text-center"
          >
            <span className="text-sm md:text-base font-semibold text-slate-200">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
