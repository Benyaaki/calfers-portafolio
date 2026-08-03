import { motion } from 'framer-motion'

// Envoltorio de transición entre páginas internas: entra con un leve
// desenfoque + subida, sale hacia arriba. Da sensación de "salto" suave.
const variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(8px)',
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
}

export default function PageShell({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}
