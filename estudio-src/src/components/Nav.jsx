import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  const location = useLocation()
  const navigate = useNavigate()
  const warpTo = useWarp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goSection = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { section: id } })
    }
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled ? 'glass-strong shadow-soft' : 'bg-transparent'
        }`}
      >
        <Link to="/" onClick={toTop} className="flex items-center gap-2.5">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="CALFERS"
            className="h-9 w-9 object-contain"
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
                onClick={() => (l.warp ? warpTo(CONTACT.portfolioUrl) : goSection(l.id))}
                className="rounded-full px-4 py-2 text-sm font-medium text-espresso/70 transition-colors hover:bg-white/50 hover:text-espresso"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <Link
          to="/cotizar"
          className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-peach-400 to-peach-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_6px_24px_-4px_rgba(225,118,79,0.75)] ring-1 ring-peach-300/60 transition-all hover:scale-105 hover:shadow-[0_8px_30px_-2px_rgba(225,118,79,0.9)] active:scale-95"
        >
          Cotizar
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25 text-xs transition-transform group-hover:rotate-45">
            ↗
          </span>
        </Link>
      </nav>
    </motion.header>
  )
}
