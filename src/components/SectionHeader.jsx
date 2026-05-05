export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-500 leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
