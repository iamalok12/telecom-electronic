import SectionHeader from '../components/SectionHeader'
import AnimateIn from '../components/AnimateIn'
import brands from '../data/brands.json'

export default function Brands() {
  return (
    <div className="container-x py-14 md:py-20">
      <AnimateIn variant="fade-up">
        <SectionHeader
          eyebrow="Brands & Partners"
          title="We stock and service trusted brands"
          subtitle="A curated selection of leading security manufacturers — so you get reliable hardware and genuine warranty support."
        />
      </AnimateIn>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {brands.items.map((b, i) => (
          <AnimateIn key={b.id} variant="scale" delay={Math.min(i * 35, 500)}>
            <div className="aspect-[3/2] rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-brand-300 transition grid place-items-center px-3 text-center shadow-sm">
              <span className="text-sm md:text-base font-semibold text-gray-700">{b.name}</span>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  )
}
