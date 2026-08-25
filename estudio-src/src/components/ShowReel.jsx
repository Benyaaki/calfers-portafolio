import CardFanCarousel from './CardFanCarousel'
import { useLanguage } from '../lib/i18n'

// Categorías de lo que construimos (no proyectos con nombre propio).
const cards = [
  { tag: 'A medida', title: 'Sistemas de gestión', desc: 'Plataformas internas, paneles y ERPs que se ajustan a cómo trabaja tu negocio.', bg: 'bg-gradient-to-br from-espresso to-cappuccino-500' },
  { tag: 'Tiendas online', title: 'E-commerce', desc: 'Catálogo, medios de pago y despacho para vender 24/7 sin intermediarios.', bg: 'bg-gradient-to-br from-lavender-500 to-lavender-600' },
  { tag: 'Presencia', title: 'Páginas web & landings', desc: 'Sitios rápidos, modernos y con carácter que convierten visitas en clientes.', bg: 'bg-gradient-to-br from-peach-400 to-peach-500' },
  { tag: 'Inteligencia', title: 'IA & agentes', desc: 'Asistentes y agentes que automatizan conversaciones, respuestas y tareas.', bg: 'bg-gradient-to-br from-lavender-400 to-peach-400' },
  { tag: 'IA aplicada', title: 'Visión computacional', desc: 'Detección y análisis en tiempo real, incluso en entornos industriales críticos.', bg: 'bg-gradient-to-br from-cappuccino-400 to-espresso' },
  { tag: 'Integraciones', title: 'Automatización', desc: 'Conecta tus herramientas y elimina el trabajo manual repetitivo.', bg: 'bg-gradient-to-br from-espresso to-lavender-600' },
  { tag: 'Multiplataforma', title: 'Apps móviles', desc: 'Aplicaciones para Android e iOS conectadas a tu sistema en tiempo real.', bg: 'bg-gradient-to-br from-lavender-500 to-peach-400' },
  { tag: 'Datos & BI', title: 'Dashboards & reportes', desc: 'Paneles con métricas en vivo para decidir con datos, no con corazonadas.', bg: 'bg-gradient-to-br from-cappuccino-500 to-lavender-500' },
  { tag: 'Conexión', title: 'Integraciones & APIs', desc: 'Conectamos pagos, despacho, ERPs y cualquier servicio con una API.', bg: 'bg-gradient-to-br from-espresso to-peach-500' },
  { tag: 'Acompañamiento', title: 'Mantención & soporte', desc: 'No desaparecemos al lanzar: monitoreo, mejoras y soporte continuo.', bg: 'bg-gradient-to-br from-lavender-600 to-cappuccino-500' },
]

export default function ShowReel() {
  const { c } = useLanguage()
  const translatedCards = cards.map((card, i) => ({ ...card, tag: c.reel.cards[i][0], title: c.reel.cards[i][1], desc: c.reel.cards[i][2] }))
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mb-10 px-6 text-center sm:mb-14">
        <h2 className="mx-auto max-w-xl font-display text-4xl font-medium leading-[0.95] tracking-tight text-espresso sm:text-6xl">
          {c.reel.titleA} <span className="font-serif italic">{c.reel.titleB}</span>
        </h2>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <CardFanCarousel cards={translatedCards} />
      </div>
    </section>
  )
}
