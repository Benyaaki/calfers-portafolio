import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import OrbitalCarousel from '../components/OrbitalCarousel'
import { waLink, mailLink } from '../lib/config'
import { useLanguage } from '../lib/i18n'

const pasos = [
  { tag: 'Paso 01', title: 'Nos escribes', desc: 'Cuéntanos qué necesitas por WhatsApp o el formulario. Sin compromiso.' },
  { tag: 'Paso 02', title: 'Conversamos', desc: 'Una conversación corta para entender tu idea, contexto y objetivos.' },
  { tag: 'Paso 03', title: 'Propuesta', desc: 'Te enviamos alcance, tiempos y valor en un documento simple, en 24–72 h.' },
  { tag: 'Paso 04', title: 'Arrancamos', desc: 'Aprobada la propuesta, empezamos y ves avances desde la primera semana.' },
]

function Choice({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(i)}
          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
            value === i
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
  const [tipo, setTipo] = useState(0)
  const [alcance, setAlcance] = useState(1)
  const [plazo, setPlazo] = useState(1)
  const { c, lang } = useLanguage()
  const q = c.quote
  const pasosTraducidos = pasos.map((step, i) => ({ ...step, tag: q.steps[i][0], title: q.steps[i][1], desc: q.steps[i][2] }))

  const mensaje = lang === 'en' ? `Hi CALFERS,

I would like to request a project quote:

▸ Type: ${q.types[tipo]}
▸ Scope: ${q.scopes[alcance]}
▸ Timeline: ${q.times[plazo]}

Can we discuss the details? Thank you!` : `Hola CALFERS,

Me gustaría cotizar un proyecto:

▸ Tipo: ${q.types[tipo]}
▸ Alcance: ${q.scopes[alcance]}
▸ Plazo: ${q.times[plazo]}

¿Podemos conversar los detalles? Quedo atento/a. ¡Gracias!`

  return (
    <PageShell>
      <section className="relative mx-auto max-w-7xl px-6 pt-36 sm:px-10">
        <h1 className="max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-tight text-espresso sm:text-8xl">
          {q.heroA} <span className="font-serif italic text-gradient">{q.heroB}</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-espresso/70">
          {q.lead}
        </p>
      </section>

      {/* Cómo se cotiza: carrusel orbital de pasos */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <OrbitalCarousel items={pasosTraducidos} />
      </section>

      {/* Armador interactivo */}
      <section className="mx-auto max-w-4xl px-6 pb-32 sm:px-10">
        <div className="glass-strong rounded-5xl p-8 shadow-soft sm:p-12">
          <h2 className="font-display text-3xl font-medium text-espresso sm:text-4xl">
            {q.buildA} <span className="font-serif italic">{q.buildB}</span> {q.buildC}
          </h2>
          <div className="mt-10 space-y-9">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-espresso/50">{q.questions[0]}</p>
              <Choice options={q.types} value={tipo} onChange={setTipo} />
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-espresso/50">{q.questions[1]}</p>
              <Choice options={q.scopes} value={alcance} onChange={setAlcance} />
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-espresso/50">{q.questions[2]}</p>
              <Choice options={q.times} value={plazo} onChange={setPlazo} />
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-espresso/15 bg-white/50 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-espresso/40">{q.yourMessage}</p>
            <p className="mt-2 whitespace-pre-line text-espresso/80">{mensaje}</p>
          </div>

          <a
            href={waLink(mensaje)}
            target="_blank"
            rel="noopener"
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-espresso px-8 py-4 text-base font-semibold text-cream-50 transition-transform hover:scale-[1.02] active:scale-95"
          >
            {q.send}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-50 text-espresso transition-transform group-hover:rotate-45">↗</span>
          </a>
        </div>

        {/* Separador */}
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-espresso/15" />
          <span className="font-mono text-xs uppercase tracking-widest text-espresso/40">{q.or}</span>
          <span className="h-px flex-1 bg-espresso/15" />
        </div>

        {/* Vía rápida: consulta directa, sin pasos */}
        <div className="mt-10 rounded-5xl border border-espresso/15 bg-white/40 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-medium text-espresso sm:text-3xl">
            {q.otherA} <span className="font-serif italic">{q.otherB}</span>?
          </h2>
          <p className="mt-3 max-w-xl text-espresso/70">
            {q.otherLead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink(q.directWa)}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream-50 transition-transform hover:scale-105 active:scale-95"
            >
              {q.wa}
              <span className="grid h-5 w-5 place-items-center rounded-full bg-cream-50 text-espresso transition-transform group-hover:rotate-45">↗</span>
            </a>
            <a
              href={mailLink(q.mailSubject)}
              className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-white/60"
            >
              {q.email}
              <span className="text-espresso/50">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="link-underline font-display text-lg font-medium text-espresso/70 hover:text-espresso">
            {q.back}
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
