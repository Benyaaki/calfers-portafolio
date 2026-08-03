import { useEffect, useRef, useState } from 'react'

// Carrusel orbital: tarjetas arqueadas, la activa sube al frente y un número
// grande al centro marca el avance. Transforms CSS (deterministas) + autoplay.
export default function OrbitalCarousel({ items, autoplay = true }) {
  const n = items.length
  const [active, setActive] = useState(0)
  const [spacing, setSpacing] = useState(220)
  const hovering = useRef(false)

  useEffect(() => {
    const onResize = () =>
      setSpacing(window.innerWidth < 640 ? 120 : window.innerWidth < 1024 ? 180 : 220)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % n)
    }, 3800)
    return () => clearInterval(id)
  }, [autoplay, n])

  const go = (d) => setActive((a) => (a + d + n) % n)

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="relative flex h-[380px] items-center justify-center sm:h-[440px]">
        {/* Número grande al centro */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex -translate-y-1/2 flex-col items-center">
          <span className="font-serif text-[8rem] italic leading-none text-espresso/10 sm:text-[11rem]">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-espresso/40">
            de {String(n).padStart(2, '0')}
          </span>
        </div>

        {/* Tarjetas */}
        {items.map((it, i) => {
          const offset = i - active
          const abs = Math.abs(offset)
          const isActive = offset === 0
          const hidden = abs > 2
          const transform = [
            `translateX(${offset * spacing}px)`,
            `translateY(${isActive ? -28 : abs * 26}px)`,
            `rotate(${offset * 6}deg)`,
            `scale(${isActive ? 1.06 : 1 - abs * 0.14})`,
          ].join(' ')
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              data-cursor
              className="absolute cursor-pointer"
              style={{
                transform,
                zIndex: isActive ? 30 : 20 - abs,
                opacity: hidden ? 0 : isActive ? 1 : 0.55,
                transition:
                  'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
              }}
            >
              <div
                className={`h-[240px] w-[210px] overflow-hidden rounded-[1.5rem] p-6 text-left shadow-soft sm:h-[280px] sm:w-[240px] ${
                  isActive
                    ? 'glass-strong ring-1 ring-white/60'
                    : 'bg-white/45 ring-1 ring-white/40 backdrop-blur-sm'
                }`}
              >
                <span className="inline-block rounded-full bg-espresso px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream-50">
                  {it.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-espresso">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/65">{it.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 bg-white/50 text-espresso transition-transform hover:scale-110 active:scale-95"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
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
