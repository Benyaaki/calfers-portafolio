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
    desc: 'Chatbots, visión computacional e integraciones que automatizan lo repetitivo, para que tu equipo se enfoque en lo que de verdad importa.',
    tags: ['Visión', 'Asistentes IA', 'Integraciones'],
  },
]

/* Ilustraciones line-art por servicio (elementos gráficos con propósito) */
function ServiceGraphic({ n, className }) {
  const common = {
    viewBox: '0 0 240 150',
    fill: 'none',
    className: `text-espresso ${className}`,
  }

  if (n === 0) {
    // Software a medida → panel / dashboard
    return (
      <svg {...common}>
        <rect x="1" y="1" width="238" height="148" rx="14" stroke="currentColor" strokeOpacity="0.2" />
        <path d="M1 32 H239" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="18" cy="16.5" r="3.5" className="fill-peach-400" />
        <circle cx="32" cy="16.5" r="3.5" className="fill-lavender-400" />
        <circle cx="46" cy="16.5" r="3.5" fill="currentColor" fillOpacity="0.25" />
        <path d="M64 32 V149" stroke="currentColor" strokeOpacity="0.2" />
        <rect x="16" y="48" width="34" height="5" rx="2.5" fill="currentColor" fillOpacity="0.28" />
        <rect x="16" y="63" width="34" height="5" rx="2.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="16" y="78" width="24" height="5" rx="2.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="86" y="96" width="20" height="34" rx="4" className="fill-lavender-300" />
        <rect x="116" y="74" width="20" height="56" rx="4" className="fill-peach-300" />
        <rect x="146" y="54" width="20" height="76" rx="4" className="fill-lavender-400" />
        <rect x="176" y="84" width="20" height="46" rx="4" className="fill-peach-400" />
        <path d="M80 130 H210" stroke="currentColor" strokeOpacity="0.2" />
      </svg>
    )
  }

  if (n === 1) {
    // Páginas web & landings → navegador / layout
    return (
      <svg {...common}>
        <rect x="1" y="1" width="238" height="148" rx="14" stroke="currentColor" strokeOpacity="0.2" />
        <path d="M1 30 H239" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="18" cy="15" r="3.5" className="fill-peach-400" />
        <circle cx="32" cy="15" r="3.5" className="fill-lavender-400" />
        <rect x="54" y="9" width="150" height="12" rx="6" fill="currentColor" fillOpacity="0.12" />
        <rect x="20" y="44" width="120" height="12" rx="6" className="fill-lavender-300" />
        <rect x="20" y="64" width="90" height="8" rx="4" fill="currentColor" fillOpacity="0.2" />
        <rect x="20" y="80" width="70" height="11" rx="5.5" className="fill-peach-400" />
        <rect x="158" y="44" width="62" height="50" rx="8" className="fill-peach-200" />
        <circle cx="176" cy="63" r="7" className="fill-lavender-400" />
        <path d="M162 90 l14 -14 l10 10 l8 -6 l18 14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
        <rect x="20" y="112" width="60" height="24" rx="6" fill="currentColor" fillOpacity="0.1" />
        <rect x="90" y="112" width="60" height="24" rx="6" fill="currentColor" fillOpacity="0.1" />
        <rect x="160" y="112" width="60" height="24" rx="6" fill="currentColor" fillOpacity="0.1" />
      </svg>
    )
  }

  if (n === 2) {
    // E-commerce → bolsa + chispa + etiqueta de precio
    return (
      <svg {...common}>
        <path
          d="M78 60 H162 L169 132 a10 10 0 0 1 -10 11 H89 a10 10 0 0 1 -10 -11 Z"
          className="fill-peach-200"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        <path d="M99 60 v-9 a21 21 0 0 1 42 0 v9" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
        <path d="M120 88 l5 11 l11 5 l-11 5 l-5 11 l-5 -11 l-11 -5 l11 -5 z" className="fill-lavender-400" />
        <g transform="rotate(-12 172 58)">
          <path
            d="M156 42 h20 a4 4 0 0 1 4 4 v20 l-16 16 -20 -20 z"
            className="fill-lavender-100"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.6"
          />
          <circle cx="170" cy="56" r="3.5" fill="currentColor" fillOpacity="0.5" />
        </g>
      </svg>
    )
  }

  // n === 3 → IA & automatización → asistente / chatbot con chispa
  return (
    <svg {...common}>
      {/* avatar de IA con chispa */}
      <circle cx="48" cy="58" r="22" className="fill-lavender-200" />
      <path d="M48 42 l5 11 l11 5 l-11 5 l-5 11 l-5 -11 l-11 -5 l11 -5 z" className="fill-lavender-500" />
      {/* burbuja de respuesta */}
      <rect x="84" y="34" width="132" height="50" rx="16" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" />
      <rect x="100" y="49" width="100" height="7" rx="3.5" fill="currentColor" fillOpacity="0.28" />
      <rect x="100" y="63" width="74" height="7" rx="3.5" fill="currentColor" fillOpacity="0.18" />
      {/* burbuja "escribiendo" */}
      <rect x="84" y="98" width="66" height="30" rx="15" className="fill-peach-200" />
      <circle cx="104" cy="113" r="4" className="fill-peach-500" />
      <circle cx="117" cy="113" r="4" className="fill-peach-500" opacity="0.65" />
      <circle cx="130" cy="113" r="4" className="fill-peach-500" opacity="0.4" />
      {/* chispita decorativa */}
      <path d="M198 26 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" className="fill-lavender-400" />
    </svg>
  )
}

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="servicios" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-40">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-xl font-display text-4xl font-medium leading-tight tracking-tight text-espresso sm:text-6xl">
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
                  <div className="grid items-center gap-8 pb-9 pl-10 sm:pl-16 md:grid-cols-[1fr_auto]">
                    <div>
                      <p className="max-w-lg text-lg leading-relaxed text-espresso/70">
                        {s.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
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
                    <ServiceGraphic
                      n={i}
                      className="w-full max-w-[240px] justify-self-start md:justify-self-end"
                    />
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
