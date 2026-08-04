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
  // Dos copias idénticas: la animación mueve -50% (exactamente una copia),
  // así el loop es continuo. El espaciado va DENTRO de cada ítem (mx en el ✦)
  // para que no haya un hueco extra en el punto de reinicio.
  const line = [...words, ...words]
  return (
    <div className="relative overflow-hidden py-12">
      {/* Cinta ondulada (fondo con máscara de onda que se desplaza) */}
      <div
        className="marquee-wave absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-white/35 backdrop-blur-[2px]"
        aria-hidden
      />
      {/* Palabras encima (sin ondear) */}
      <div className="relative flex w-max animate-marquee items-center whitespace-nowrap">
        {line.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={
                i % 2 === 0
                  ? 'font-serif text-2xl italic text-espresso'
                  : 'font-display text-2xl font-medium text-espresso/60'
              }
            >
              {w}
            </span>
            <span className="mx-10 font-mono text-lg text-peach-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
