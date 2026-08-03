import { Link, useNavigate, useLocation } from 'react-router-dom'
import { CONTACT } from '../lib/config'
import { useWarp } from '../lib/warp'

export default function Footer() {
  const warpTo = useWarp()
  const navigate = useNavigate()
  const location = useLocation()

  const goSection = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { section: id } })
    }
  }

  const linkCls = 'link-underline w-fit text-left transition-colors hover:text-espresso'

  return (
    <footer className="relative z-10 border-t border-espresso/15 bg-white/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-peach-500">
              (Construyamos algo)
            </span>
            <p className="mt-4 font-display text-4xl font-medium tracking-tight text-espresso sm:text-6xl">
              ¿Tienes una idea?
              <br />
              <span className="font-serif italic text-gradient">Hagámosla real.</span>
            </p>
          </div>
          <nav className="flex flex-col gap-2 font-display text-lg font-medium text-espresso/70">
            <button type="button" onClick={() => goSection('servicios')} className={linkCls}>Servicios</button>
            <button type="button" onClick={() => goSection('proceso')} className={linkCls}>Proceso</button>
            <Link to="/cotizar" className={linkCls}>Cómo cotizamos</Link>
            <button type="button" onClick={() => warpTo(CONTACT.portfolioUrl)} className={linkCls}>Portafolio</button>
            <button type="button" onClick={() => goSection('contacto')} className={linkCls}>Contacto</button>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-espresso/15 pt-8 font-mono text-xs uppercase tracking-widest text-espresso/50 sm:flex-row">
          <span>© 2026 CALFERS · Todos los derechos reservados</span>
          <span>Estudio de software · Chile</span>
        </div>
      </div>
    </footer>
  )
}
