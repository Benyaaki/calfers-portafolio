import { motion } from 'framer-motion'

// Envoltorio de transición entre páginas internas. Solo opacidad a propósito:
// un `filter`/`transform` persistente en este contenedor rompería el
// `position: sticky` de secciones internas (p. ej. el logo rodante).
const variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}

export default function PageShell({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}
