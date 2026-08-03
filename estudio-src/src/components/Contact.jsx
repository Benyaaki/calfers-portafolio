import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONTACT, waLink, mailLink } from '../lib/config'

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.437-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 8.5 5.5 8.5-5.5" />
    </svg>
  )
}

const channels = [
  {
    key: 'WhatsApp',
    sub: 'Respuesta rápida, en tu bolsillo',
    value: CONTACT.whatsappPretty,
    copy: CONTACT.whatsappPretty,
    href: waLink('Hola CALFERS, quiero cotizar un proyecto.'),
    action: 'Abrir chat',
    Icon: WhatsappIcon,
    fill: 'from-peach-400 to-peach-500',
  },
  {
    key: 'Email',
    sub: 'Escríbenos cuando quieras',
    value: CONTACT.email,
    copy: CONTACT.email,
    href: mailLink('Contacto desde calfers.com/servicios'),
    action: 'Enviar correo',
    Icon: MailIcon,
    fill: 'from-lavender-400 to-lavender-500',
  },
]

function Panel({ ch }) {
  const [copied, setCopied] = useState(false)
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(ch.copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* sin portapapeles */
    }
  }
  return (
    <div className={`animate-tabin rounded-[2rem] bg-gradient-to-br ${ch.fill} p-8 shadow-soft sm:p-10`}>
      <div className="flex items-center gap-3 text-white/85">
        <ch.Icon className="h-6 w-6" />
        <span className="font-display text-lg font-semibold text-white">{ch.key}</span>
      </div>
      <p className="mt-1 text-sm text-white/75">{ch.sub}</p>

      <p className="mt-7 break-all font-mono text-3xl font-bold text-white sm:text-4xl">
        {ch.value}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={ch.href}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-espresso transition-transform hover:scale-105 active:scale-95"
        >
          {ch.action} ↗
        </a>
        <button
          type="button"
          onClick={doCopy}
          className="rounded-full border border-white/60 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
        >
          {copied ? '¡Copiado! ✓' : 'Copiar'}
        </button>
      </div>
    </div>
  )
}

export default function Contact() {
  const [active, setActive] = useState(0)

  return (
    <section id="contacto" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-peach-500">
            (Hablemos)
          </span>
          <h2 className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-espresso sm:text-7xl">
            Estamos a un
            <br />
            <span className="font-serif italic text-gradient">mensaje</span> de distancia
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-espresso/70">
            Elige por dónde prefieres escribirnos. ¿Prefieres algo guiado? Arma tu
            cotización en un par de clics.
          </p>

          <Link
            to="/cotizar"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-espresso px-8 py-4 text-base font-semibold text-cream-50 transition-transform hover:scale-105 active:scale-95"
          >
            Cotiza en 2 minutos
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-50 text-espresso transition-transform group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </motion.div>

        {/* Contacto en tabs animadas */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Pestañas */}
          <div className="flex gap-2">
            {channels.map((ch, i) => (
              <button
                key={ch.key}
                type="button"
                onClick={() => setActive(i)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  i === active
                    ? `bg-gradient-to-br ${ch.fill} text-white shadow-soft`
                    : 'bg-white/50 text-espresso/65 hover:bg-white/80 hover:text-espresso'
                }`}
              >
                <ch.Icon className="h-4 w-4" />
                {ch.key}
              </button>
            ))}
          </div>

          {/* Panel (re-monta al cambiar de pestaña: resetea copiado + re-anima) */}
          <div className="mt-4">
            <Panel key={active} ch={channels[active]} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
