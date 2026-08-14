import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import OrbitalCarousel from '../components/OrbitalCarousel'
import { waLink, mailLink } from '../lib/config'

const pasos = [
  { tag: 'Paso 01', title: 'Nos escribes', desc: 'Cuéntanos qué necesitas por WhatsApp o el formulario. Sin compromiso.' },
  { tag: 'Paso 02', title: 'Conversamos', desc: 'Una conversación corta para entender tu idea, contexto y objetivos.' },
  { tag: 'Paso 03', title: 'Propuesta', desc: 'Te enviamos alcance, tiempos y valor en un documento simple, en 24–72 h.' },
  { tag: 'Paso 04', title: 'Arrancamos', desc: 'Aprobada la propuesta, empezamos y ves avances desde la primera semana.' },
]

const tipos = ['Página web / landing', 'Software a medida', 'E-commerce', 'IA / automatización']
const alcances = ['Algo pequeño y rápido', 'Un proyecto mediano', 'Un sistema completo']
const plazos = ['Lo antes posible', 'En 1–2 meses', 'Tengo flexibilidad de fechas']

function Choice({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
            value === o
              ? 'border-espresso bg-espresso text-cream-50'
              : 'border-espresso/20 bg-white/40 text-espresso/70 hover:border-espresso/40'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function Cotizar() {
  const [tipo, setTipo] = useState(tipos[0])
  const [alcance, setAlcance] = useState(alcances[1])
  const [plazo, setPlazo] = useState(plazos[1])

  const mensaje = `Hola CALFERS,

Me gustaría cotizar un proyecto:

▸ Tipo: ${tipo}
▸ Alcance: ${alcance}
▸ Plazo: ${plazo}

¿Podemos conversar los detalles? Quedo atento/a. ¡Gracias!`

  return (
    <PageShell>
      <section className="relative mx-auto max-w-7xl px-6 pt-36 sm:px-10">
        <h1 className="max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-tight text-espresso sm:text-8xl">
          Claro, rápido y <span className="font-serif italic text-gradient">sin letra chica</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-espresso/70">
          Cotizar con nosotros es una conversación, no un formulario eterno. Así funciona,
          y al final armas tu mensaje en un par de clics.
        </p>
      </section>

      {/* Cómo se cotiza: carrusel orbital de pasos */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <OrbitalCarousel items={pasos} />
      </section>

      {/* Armador interactivo */}
      <section className="mx-auto max-w-4xl px-6 pb-32 sm:px-10">
        <div className="glass-strong rounded-5xl p-8 shadow-soft sm:p-12">
          <h2 className="font-display text-3xl font-medium text-espresso sm:text-4xl">
            Arma tu <span className="font-serif italic">cotización</span> en 3 pasos
          </h2>
          <div className="mt-10 space-y-9">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-espresso/50">1 · ¿Qué necesitas?</p>
              <Choice options={tipos} value={tipo} onChange={setTipo} />
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-espresso/50">2 · ¿Qué tamaño?</p>
              <Choice options={alcances} value={alcance} onChange={setAlcance} />
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-espresso/50">3 · ¿Para cuándo?</p>
              <Choice options={plazos} value={plazo} onChange={setPlazo} />
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-espresso/15 bg-white/50 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-espresso/40">Tu mensaje</p>
            <p className="mt-2 whitespace-pre-line text-espresso/80">{mensaje}</p>
          </div>

          <a
            href={waLink(mensaje)}
            target="_blank"
            rel="noopener"
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-espresso px-8 py-4 text-base font-semibold text-cream-50 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Enviar por WhatsApp
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-50 text-espresso transition-transform group-hover:rotate-45">↗</span>
          </a>
        </div>

        {/* Separador */}
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-espresso/15" />
          <span className="font-mono text-xs uppercase tracking-widest text-espresso/40">o</span>
          <span className="h-px flex-1 bg-espresso/15" />
        </div>

        {/* Vía rápida: consulta directa, sin pasos */}
        <div className="mt-10 rounded-5xl border border-espresso/15 bg-white/40 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-medium text-espresso sm:text-3xl">
            ¿Tienes otra idea o solo una <span className="font-serif italic">consulta</span>?
          </h2>
          <p className="mt-3 max-w-xl text-espresso/70">
            No necesitas llenar los pasos. Cuéntanos lo que tengas en mente y conversamos,
            sin compromiso.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink('Hola CALFERS, tengo una consulta.')}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream-50 transition-transform hover:scale-105 active:scale-95"
            >
              Escribir por WhatsApp
              <span className="grid h-5 w-5 place-items-center rounded-full bg-cream-50 text-espresso transition-transform group-hover:rotate-45">↗</span>
            </a>
            <a
              href={mailLink('Consulta desde calfers.com')}
              className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-white/60"
            >
              Enviar un correo
              <span className="text-espresso/50">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="link-underline font-display text-lg font-medium text-espresso/70 hover:text-espresso">
            ← Volver a la landing
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
