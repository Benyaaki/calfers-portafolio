import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WarpContext = createContext(() => {})
export const useWarp = () => useContext(WarpContext)

// Transición "warp": al saltar a otro sitio (el portafolio) se despliega un
// telón de anillos concéntricos y, cuando termina, navega. Se siente como un
// salto, no como una recarga.
export function WarpProvider({ children }) {
  const [target, setTarget] = useState(null)

  const warpTo = useCallback((href) => setTarget(href), [])

  // Cuando hay destino, dejamos correr la animación (~0.95s) y navegamos.
  useEffect(() => {
    if (!target) return
    const id = setTimeout(() => {
      window.location.href = target
    }, 950)
    return () => clearTimeout(id)
  }, [target])

  return (
    <WarpContext.Provider value={warpTo}>
      {children}
      <AnimatePresence>
        {target && (
          <motion.div
            key="warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-espresso"
          >
            {/* túnel de anillos */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 14, opacity: 0 }}
                transition={{ duration: 1, delay: i * 0.09, ease: 'easeIn' }}
                className="absolute h-24 w-24 rounded-full border border-peach-300/70"
              />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative z-10 text-center"
            >
              <span className="font-serif text-4xl italic text-cream-50">CALFERS</span>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-peach-300">
                entrando al portafolio
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WarpContext.Provider>
  )
}
