import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const text =
  'No empezamos escribiendo código. Empezamos escuchando. Entendemos el problema y, recién entonces, construimos la herramienta que lo resuelve.'
const words = text.split(' ')

function Word({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  )
}

export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10 sm:py-48">
      <p className="flex flex-wrap font-serif text-3xl font-normal leading-[1.25] tracking-tight text-espresso sm:text-5xl md:text-6xl">
        {words.map((w, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          const emph = /escuchando|entendemos|resuelve/i.test(w)
          return (
            <span key={i} className={emph ? 'italic text-peach-500' : ''}>
              <Word word={w} progress={scrollYProgress} range={[start, end]} />
            </span>
          )
        })}
      </p>
    </section>
  )
}
