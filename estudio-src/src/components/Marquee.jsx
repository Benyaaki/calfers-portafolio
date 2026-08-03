const words = [
  'Software a medida',
  'Páginas web',
  'E-commerce',
  'Inteligencia artificial',
  'Apps de gestión',
  'Automatización',
  'Visión computacional',
]

export default function Marquee() {
  const line = [...words, ...words]
  return (
    <div className="relative border-y border-espresso/15 bg-white/25 py-5 backdrop-blur-[2px]">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={
                i % 2 === 0
                  ? 'font-serif text-2xl italic text-espresso'
                  : 'font-display text-2xl font-medium text-espresso/60'
              }
            >
              {w}
            </span>
            <span className="font-mono text-lg text-peach-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
