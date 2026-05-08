import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProductCard({ product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <LazyLoadImage
          src={product.image}
          alt={product.name}
          effect="blur"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-gray-900 font-semibold leading-snug">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
          {product.description}
        </p>
        {product.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
