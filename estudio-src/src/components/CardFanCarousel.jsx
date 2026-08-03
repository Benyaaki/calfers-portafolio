import { useEffect, useState } from 'react'

// Carrusel de tarjetas en abanico. La activa sube al frente; las demás se
// despliegan en arco desde el centro. Transforms CSS (deterministas) + controles.
export default function CardFanCarousel({ cards }) {
  const n = cards.length
  const [active, setActive] = useState(Math.floor((n - 1) / 2))
  const [spacing, setSpacing] = useState(150)

  useEffect(() => {
    const onResize = () =>
      setSpacing(window.innerWidth < 640 ? 66 : window.innerWidth < 1024 ? 112 : 150)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const go = (d) => setActive((a) => (a + d + n) % n)

  return (
    <div className="relative w-full">
      <div
        className="relative flex h-[440px] items-center justify-center sm:h-[560px]"
        style={{ perspective: '1600px' }}
      >
        {cards.map((c, i) => {
          const offset = i - active
          const abs = Math.abs(offset)
          const isActive = offset === 0
          const hidden = abs > 3
          const transform = [
            `translateX(${offset * spacing}px)`,
            `translateY(${isActive ? -60 : 40 + abs * 18}px)`,
            `rotateY(${isActive ? 0 : offset * -16}deg)`,
            `rotate(${isActive ? 0 : offset * 6}deg)`,
            `scale(${hidden ? 0.55 : isActive ? 1.12 : 1 - abs * 0.1})`,
          ].join(' ')
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              data-cursor
              className="absolute origin-center cursor-pointer"
              style={{
                transform,
                filter: isActive ? 'none' : `blur(${Math.min(abs * 2.2, 6)}px)`,
                zIndex: isActive ? 50 : n - abs,
                opacity: hidden ? 0 : isActive ? 1 : 1 - abs * 0.08,
                transition:
                  'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, filter 0.5s ease',
              }}
            >
              <div
                className={`relative h-[300px] w-[210px] overflow-hidden rounded-[1.75rem] p-6 text-left shadow-soft ring-1 ring-white/40 sm:h-[380px] sm:w-[270px] ${c.bg}`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-white/25 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/90 backdrop-blur-sm">
                      {c.tag}
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                      {c.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-white/85">{c.desc}</p>
                    <div className="mt-4 font-serif text-5xl italic text-white/30">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 bg-white/50 text-espresso transition-transform hover:scale-110 active:scale-95"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-7 bg-espresso' : 'w-2 bg-espresso/25 hover:bg-espresso/45'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 bg-white/50 text-espresso transition-transform hover:scale-110 active:scale-95"
        >
          →
        </button>
      </div>
    </div>
  )
}
