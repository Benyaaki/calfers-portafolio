import { Link, useNavigate, useLocation } from 'react-router-dom'
import { CONTACT } from '../lib/config'
import { useWarp } from '../lib/warp'
import { useLanguage } from '../lib/i18n'

export default function Footer() {
  const warpTo = useWarp()
  const navigate = useNavigate()
  const location = useLocation()
  const { c, lang } = useLanguage()

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
            <p className="font-display text-4xl font-medium tracking-tight text-espresso sm:text-6xl">
              {c.footer.a}
              <br />
              <span className="font-serif italic text-gradient">{c.footer.b}</span>
            </p>
          </div>
          <nav className="flex flex-col gap-2 font-display text-lg font-medium text-espresso/70">
            <button type="button" onClick={() => goSection('servicios')} className={linkCls}>{c.nav.services}</button>
            <button type="button" onClick={() => goSection('proceso')} className={linkCls}>{c.nav.process}</button>
            <Link to="/cotizar" className={linkCls}>{c.footer.how}</Link>
            <button type="button" onClick={() => warpTo(`${CONTACT.portfolioUrl}?lang=${lang}`)} className={linkCls}>{c.nav.portfolio}</button>
            <button type="button" onClick={() => goSection('contacto')} className={linkCls}>{c.nav.contact}</button>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-espresso/15 pt-8 font-mono text-xs uppercase tracking-widest text-espresso/50 sm:flex-row">
          <span>© 2026 CALFERS · {c.footer.rights}</span>
          <span>{c.footer.studio}</span>
        </div>
      </div>
    </footer>
  )
}
