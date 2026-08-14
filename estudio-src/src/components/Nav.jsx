import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT } from '../lib/config'
import { useWarp } from '../lib/warp'

const sections = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'portafolio', label: 'Portafolio', warp: true },
  { id: 'contacto', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const warpTo = useWarp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del body con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const goSection = (id) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { section: id } })
    }
  }

  const onNavClick = (l) => {
    if (l.warp) {
      setMenuOpen(false)
      warpTo(CONTACT.portfolioUrl)
    } else {
      goSection(l.id)
    }
  }

  const toTop = () => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`relative flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled || menuOpen ? 'glass-strong shadow-soft' : 'bg-transparent'
        }`}
      >
        <Link to="/" onClick={toTop} className="flex items-center gap-2.5">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="CALFERS"
            className="h-11 w-11 object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-espresso">
            CALFERS
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => onNavClick(l)}
                className="rounded-full px-4 py-2 text-sm font-medium text-espresso/70 transition-colors hover:bg-white/50 hover:text-espresso"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/cotizar"
            className="group hidden items-center gap-2 rounded-full bg-gradient-to-br from-peach-400 to-peach-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_6px_24px_-4px_rgba(225,118,79,0.75)] ring-1 ring-peach-300/60 transition-all hover:scale-105 hover:shadow-[0_8px_30px_-2px_rgba(225,118,79,0.9)] active:scale-95 md:flex"
          >
            Cotizar
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25 text-xs transition-transform group-hover:rotate-45">
              ↗
            </span>
          </Link>

          {/* Botón hamburguesa (solo móvil) */}
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-espresso transition-colors hover:bg-white/50 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 rounded bg-espresso transition-all duration-300 ${
                  menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded bg-espresso transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 rounded bg-espresso transition-all duration-300 ${
                  menuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>

        {/* Panel del menú móvil */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute inset-x-2 top-[calc(100%+0.5rem)] overflow-hidden rounded-4xl p-2 shadow-soft md:hidden"
            >
              <ul className="flex flex-col">
                {sections.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => onNavClick(l)}
                      className="flex w-full items-center justify-between rounded-3xl px-5 py-4 text-left font-display text-lg font-medium text-espresso/80 transition-colors hover:bg-white/50 hover:text-espresso"
                    >
                      {l.label}
                      <span className="text-espresso/40">↗</span>
                    </button>
                  </li>
                ))}
                <li className="p-2">
                  <Link
                    to="/cotizar"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-3xl bg-espresso px-5 py-4 font-display text-lg font-semibold text-cream-50"
                  >
                    Cotiza tu proyecto
                    <span className="text-cream-50/70">↗</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
