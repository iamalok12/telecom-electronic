export default function ProductCard({ product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] hover:border-brand-500/30 hover:bg-white/[0.05] transition">
      <div className="aspect-[4/3] overflow-hidden bg-ink-900">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-white font-semibold leading-snug">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
          {product.description}
        </p>
        {product.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-300 border border-brand-500/20">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
