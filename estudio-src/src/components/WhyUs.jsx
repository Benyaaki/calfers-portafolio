import { motion } from 'framer-motion'
import { CONTACT } from '../lib/config'
import { useWarp } from '../lib/warp'

const stats = [
  { k: '24/7', v: 'Sistemas operando en terreno, sin pausa' },
  { k: '+8', v: 'Nos desempeñamos en distintos rubros, adaptando la tecnología a cada uno' },
  { k: '1:1', v: 'Trato directo con quien diseña y construye tu producto' },
  { k: '48 h', v: 'De tu idea a una propuesta clara' },
]

export default function WhyUs() {
  const warpTo = useWarp()
  return (
    <section id="portafolio" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-peach-500">
            (Por qué CALFERS)
          </span>
          <h2 className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-espresso sm:text-7xl">
            No prometemos.
            <br />
            <span className="font-serif italic text-gradient">Ya lo hicimos.</span>
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-espresso/70">
            Detrás de CALFERS hay sistemas reales operando hoy en distintos rubros,
            con la tecnología ajustada a la medida de cada uno. Antes de contratarnos,
            míralos funcionando.
          </p>
          <button
            type="button"
            onClick={() => warpTo(CONTACT.portfolioUrl)}
            className="group mt-9 inline-flex items-center gap-3 text-lg font-semibold text-espresso"
          >
            <span className="link-underline">Ver el portafolio completo</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-espresso/25 transition-transform group-hover:rotate-45">
              ↗
            </span>
          </button>
        </div>

        <div className="flex flex-col divide-y divide-espresso/15 border-y border-espresso/15">
          {stats.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-baseline gap-6 py-6"
            >
              <span className="font-serif text-5xl italic text-espresso sm:text-6xl">{s.k}</span>
              <span className="text-espresso/60">{s.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
