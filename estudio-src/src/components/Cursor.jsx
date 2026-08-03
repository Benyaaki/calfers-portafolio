import { useEffect, useRef } from 'react'

// Cursor blob con inercia. Crece sobre enlaces/botones. Se oculta en táctil.
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const dot = ref.current
    if (!dot) return
    if (window.matchMedia('(hover: none)').matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor]')
      dot.style.width = interactive ? '56px' : '28px'
      dot.style.height = interactive ? '56px' : '28px'
      dot.style.background = interactive
        ? 'rgba(225, 118, 79, 0.45)'
        : 'rgba(139, 111, 224, 0.55)'
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return <div ref={ref} className="cursor-dot" aria-hidden />
}
