import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    n: '01',
    title: 'Software a medida',
    word: 'a medida',
    desc: 'Sistemas de gestión, plataformas internas y apps que se ajustan a cómo trabaja tu negocio. Nada de plantillas.',
    tags: ['Plataformas', 'Dashboards', 'APIs'],
  },
  {
    n: '02',
    title: 'Páginas web & landings',
    word: '& landings',
    desc: 'Sitios que se ven increíbles, cargan rápido y convierten visitas en clientes. Diseño con carácter, no genérico.',
    tags: ['Diseño', 'SEO', 'Responsive'],
  },
  {
    n: '03',
    title: 'E-commerce',
    word: 'commerce',
    desc: 'Tiendas online completas con catálogo, pagos y despacho. Vende 24/7 sin depender de intermediarios.',
    tags: ['Pagos', 'Catálogo', 'Stock'],
  },
  {
    n: '04',
    title: 'IA & automatización',
    word: 'automatización',
    desc: 'Chatbots, visión computacional e integraciones que automatizan lo repetitivo. Lo que otros creen imposible.',
    tags: ['Visión', 'Asistentes IA', 'Integraciones'],
  },
]

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="servicios" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-40">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-peach-500">
            (Servicios)
          </span>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-tight tracking-tight text-espresso sm:text-6xl">
            Cuatro formas de <span className="font-serif italic">construir</span> contigo
          </h2>
        </div>
        <p className="max-w-xs text-espresso/60">
          Desde una landing hasta un sistema completo. Elige por dónde empezar; del
          resto nos encargamos nosotros.
        </p>
      </div>

      <div className="border-t border-espresso/15">
        {services.map((s, i) => (
          <div
            key={s.n}
            onMouseEnter={() => setActive(i)}
            className="group relative border-b border-espresso/15"
          >
            <button
              type="button"
              onClick={() => setActive(active === i ? -1 : i)}
              className="flex w-full items-center gap-5 py-7 text-left sm:gap-10 sm:py-9"
            >
              <span className="font-mono text-sm text-espresso/40">{s.n}</span>
              <h3
                className={`flex-1 font-display text-3xl font-medium tracking-tight transition-colors duration-300 sm:text-5xl md:text-6xl ${
                  active === i ? 'text-espresso' : 'text-espresso/35'
                }`}
              >
                {s.title.replace(s.word, '')}
                <span className="font-serif italic text-gradient">{s.word}</span>
              </h3>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-espresso/20 text-lg transition-all duration-300 ${
                  active === i
                    ? 'rotate-45 bg-espresso text-cream-50'
                    : 'text-espresso/50'
                }`}
              >
                ↗
              </span>
            </button>

            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-5 pb-9 pl-10 sm:flex-row sm:items-center sm:justify-between sm:pl-16">
                    <p className="max-w-lg text-lg leading-relaxed text-espresso/70">
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-espresso/15 bg-white/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-espresso/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
