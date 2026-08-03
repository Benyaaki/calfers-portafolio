import { motion } from 'framer-motion'
import { waLink } from '../lib/config'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-28 sm:px-10"
    >
      {/* Titular */}
      <div className="mx-auto mt-[12vh] w-full max-w-7xl sm:mt-[16vh]">
        <h1 className="font-display font-medium leading-[0.9] tracking-tight text-espresso">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="block text-[clamp(3rem,12vw,10rem)]"
          >
            Tu idea,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.22 }}
            className="block text-[clamp(3rem,12vw,10rem)]"
          >
            hecha{' '}
            <span className="font-serif font-normal italic text-gradient">
              software
            </span>
            <span className="text-peach-500">.</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-lg leading-relaxed text-espresso/70">
            En <span className="font-semibold text-espresso">CALFERS</span> diseñamos y
            construimos productos digitales a medida (webs, sistemas, e-commerce e IA)
            que se sienten vivos.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={waLink('Hola CALFERS, quiero cotizar un proyecto.')}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-3 rounded-full bg-espresso px-8 py-4 text-base font-semibold text-cream-50 transition-transform hover:scale-105 active:scale-95"
            >
              Cuéntanos tu idea
              <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-50 text-espresso transition-transform group-hover:rotate-45">
                ↗
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Pie / scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-espresso/50"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-8 w-[1px] animate-pulse bg-espresso/40" />
          Baja para explorar
        </span>
        <span className="hidden md:block">Software · Web · E-commerce · IA</span>
      </motion.div>
    </section>
  )
}
