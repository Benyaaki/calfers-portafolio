import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * LogoReveal — El logo CALFERS entra rodando desde la derecha A TAMAÑO GRANDE (126vh),
 * va revelando el texto conforme pasa su centro, se ESTACIONA pegado al párrafo alargado (2-3 líneas),
 * y luego retoma y sale por la izquierda.
 */
export default function LogoReveal() {
  const ref = useRef(null)
  const [isDesktop, setIsDesktop] = useState(
    () => (typeof window === 'undefined' ? true : window.matchMedia('(min-width: 640px)').matches),
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={ref} className="relative h-[170vh] sm:h-[300vh]">
      <Roller key={isDesktop ? 'd' : 'm'} progress={scrollYProgress} isDesktop={isDesktop} />
    </section>
  )
}

function Roller({ progress, isDesktop }) {
  const [dims, setDims] = useState({ vw: 1200, vh: 800 })

  useEffect(() => {
    const update = () => setDims({ vw: window.innerWidth, vh: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { vw, vh } = dims

  // 1. Tamaño del logo: protagónico (~91vh en desktop, 231px en móvil).
  // (Reducido ~28% respecto al 1.26vh / 320px originales: dos pasos de -15%.)
  const logoSize = isDesktop ? vh * 0.910 : 231
  const logoR = logoSize / 2

  // 2. Posición de estacionado (parkX):
  // El párrafo alargado empieza en ~42% del viewport (sm:mr-[14%] sm:w-[44%]).
  // El mark visible dentro del SVG ocupa el 25.4%–75.3% del viewBox (hay padding
  // transparente), así que su BORDE DERECHO está a 0.2527*logoSize del centro.
  // Anclamos en ese borde real (no en el de la caja) para que el logo quede
  // pegado al texto con un gap constante en cualquier tamaño de pantalla; antes
  // se usaba `- logoR + 75`, cuyo hueco crecía con la altura del viewport.
  const markRightFromCenter = logoSize * 0.2527
  const gap = Math.max(40, vw * 0.03)
  const shiftLeft = vw * 0.10 // corrimiento extra del logo hacia la izquierda
  const textLeftEdge = isDesktop ? vw * 0.42 : vw * 0.15
  const parkX = isDesktop
    ? textLeftEdge - gap - markRightFromCenter - shiftLeft
    : vw * 0.22

  const offRight = vw + logoR + 60
  const offLeft = -(logoR + 60)

  // 3. Paradas del Scroll
  const stops = isDesktop
    ? [0.00, 0.38, 0.65, 0.98]
    : [0.00, 0.45, 0.70, 0.98]

  const xPositions = [offRight, parkX, parkX, offLeft]
  const rotDeg = [0, -360, -360, -720]

  const logoXpx = useTransform(progress, stops, xPositions)
  const rotVal = useTransform(progress, stops, rotDeg)

  // ── Máscara de revelado del texto desde el centro del logo ──
  const textMask = useTransform(logoXpx, (cx) => {
    if (cx <= parkX + 15) {
      return 'linear-gradient(to right, #000 0%, #000 100%)'
    }
    const fadeStart = Math.max(0, cx - 40)
    const fadeEnd = Math.min(vw, cx + 40)
    return `linear-gradient(to right, transparent 0px, transparent ${fadeStart}px, #000 ${fadeEnd}px, #000 100%)`
  })

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center overflow-x-clip">
      {/* Logo rodando — tamaño grande protagónico (126vh) */}
      <motion.div
        style={{
          x: logoXpx,
          y: '-50%',
        }}
        className="pointer-events-none absolute top-1/2 left-0 z-20"
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt=""
          aria-hidden
          style={{
            rotate: rotVal,
            width: logoSize,
            height: logoSize,
            marginLeft: -logoR,
          }}
          className="block max-w-none"
        />
      </motion.div>

      {/* Contenedor del texto — Párrafo alargado horizontal original (sm:max-w-none, 2-3 líneas) */}
      <motion.div
        style={{
          maskImage: textMask,
          WebkitMaskImage: textMask,
        }}
        className="absolute inset-0 z-10 flex items-center justify-center sm:justify-end"
      >
        <div className="w-full max-w-2xl px-6 text-center sm:mr-[14%] sm:w-[44%] sm:max-w-none sm:px-0 sm:text-left">
          <p className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-6xl md:text-7xl">
            No entregamos software. Entregamos una forma más
            <span className="font-serif italic text-gradient"> simple de trabajar</span>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

