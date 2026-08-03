import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Conversamos',
    desc: 'Nos cuentas tu idea. Escuchamos, preguntamos y entendemos tu negocio antes de escribir una sola línea de código.',
    blob: '42% 58% 63% 37% / 41% 44% 56% 59%',
  },
  {
    n: '02',
    title: 'Proponemos',
    desc: 'Definimos alcance, tiempos y una cotización clara. Sabes exactamente qué recibes y cuándo. Sin sorpresas.',
    blob: '58% 42% 37% 63% / 56% 59% 41% 44%',
  },
  {
    n: '03',
    title: 'Construimos',
    desc: 'Desarrollamos por etapas y te mostramos avances reales. Ajustamos en el camino según tu feedback.',
    blob: '38% 62% 58% 42% / 48% 42% 58% 52%',
  },
  {
    n: '04',
    title: 'Lanzamos',
    desc: 'Publicamos, dejamos todo funcionando y te acompañamos después. Tu sistema no queda solo.',
    blob: '63% 37% 42% 58% / 41% 56% 44% 59%',
  },
]

function Step({ step }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-start gap-6 sm:gap-10"
    >
      {/* Nodo con blob (opaco, tapa el riel) */}
      <div className="relative z-10 shrink-0">
        <div
          className="animate-morph grid h-24 w-24 place-items-center bg-gradient-to-br from-lavender-300 to-peach-300 shadow-glow sm:h-32 sm:w-32"
          style={{ borderRadius: step.blob }}
        >
          <span className="font-serif text-3xl italic text-espresso/80 sm:text-5xl">{step.n}</span>
        </div>
      </div>

      {/* Texto */}
      <div className="flex-1 pt-4 sm:pt-8">
        <h3 className="font-display text-2xl font-medium text-espresso sm:text-4xl">{step.title}</h3>
        <p className="mt-2 max-w-md text-base leading-relaxed text-espresso/60 sm:text-lg">
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.6'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="proceso" ref={ref} className="relative mx-auto max-w-3xl px-6 py-28 sm:py-40">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-peach-500">
          (Cómo trabajamos)
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-espresso sm:text-6xl">
          Un proceso <span className="font-serif italic">simple</span>, sin cajas negras
        </h2>
      </div>

      <div className="relative">
        {/* Riel a la izquierda, DETRÁS de los nodos (z-0) — alineado al centro de los blobs */}
        <div className="absolute left-12 top-12 bottom-12 hidden w-[2px] -translate-x-1/2 bg-espresso/10 sm:left-16 sm:block">
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-gradient-to-b from-lavender-400 via-peach-400 to-espresso/40"
          />
        </div>

        <div className="flex flex-col gap-14 sm:gap-20">
          {steps.map((s) => (
            <Step key={s.n} step={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
