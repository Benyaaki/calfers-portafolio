import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WarpContext = createContext(() => {})
export const useWarp = () => useContext(WarpContext)

// Transición "warp": al saltar a otro sitio (el portafolio) se cierra un
// telón de anillos concéntricos y recién ahí navega. Se siente como un salto,
// no como una recarga.
export function WarpProvider({ children }) {
  const [target, setTarget] = useState(null)

  const warpTo = useCallback((href) => setTarget(href), [])

  return (
    <WarpContext.Provider value={warpTo}>
      {children}
      <AnimatePresence
        onExitComplete={() => {
          if (target) window.location.href = target
        }}
      >
        {target && (
          <motion.div
            key="warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-espresso"
            onAnimationComplete={() => setTimeout(() => setTarget(null), 620)}
          >
            {/* túnel de anillos */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 14, opacity: 0 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeIn' }}
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
