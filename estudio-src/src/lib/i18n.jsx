import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'calfers-commercial-lang'

const copy = {
  es: {
    nav: { services: 'Servicios', process: 'Proceso', portfolio: 'Portafolio', contact: 'Contacto', quote: 'Cotizar', quoteProject: 'Cotiza tu proyecto', open: 'Abrir menú', close: 'Cerrar menú' },
    hero: { first: 'Entender primero.', second: 'Construir', accent: 'mejor', body: 'diseñamos software a medida: webs, sistemas, e-commerce e IA. Pero nunca empezamos por ahí. Primero entendemos cómo trabaja tu equipo. El software viene después.', cta: 'Conversemos', scroll: 'Baja para explorar' },
    marquee: ['Software a medida', 'Páginas web', 'E-commerce', 'Inteligencia artificial', 'Apps de gestión', 'Automatización', 'Visión computacional'],
    statement: 'No empezamos escribiendo código. Empezamos escuchando. Entendemos el problema y, recién entonces, construimos la herramienta que lo resuelve.',
    services: { titleA: 'Cuatro formas de', titleB: 'construir', titleC: 'contigo', lead: 'Desde una landing hasta un sistema completo. Elige por dónde empezar; del resto nos encargamos nosotros.', items: [
      { title: 'Software a medida', word: 'a medida', desc: 'Sistemas de gestión, plataformas internas y apps que se ajustan a cómo trabaja tu negocio. Nada de plantillas.', tags: ['Plataformas', 'Dashboards', 'APIs'] },
      { title: 'Páginas web & landings', word: '& landings', desc: 'Sitios que se ven increíbles, cargan rápido y convierten visitas en clientes. Diseño con carácter, no genérico.', tags: ['Diseño', 'SEO', 'Responsive'] },
      { title: 'E-commerce', word: 'commerce', desc: 'Tiendas online completas con catálogo, pagos y despacho. Vende 24/7 sin depender de intermediarios.', tags: ['Pagos', 'Catálogo', 'Stock'] },
      { title: 'IA & automatización', word: 'automatización', desc: 'Chatbots, visión computacional e integraciones que automatizan lo repetitivo, para que tu equipo se enfoque en lo que de verdad importa.', tags: ['Visión', 'Asistentes IA', 'Integraciones'] },
    ]},
    process: { titleA: 'Un proceso', titleB: 'simple', titleC: 'sin cajas negras', steps: [
      ['Escuchamos', 'Nos cuentas tu idea. Preguntamos y entendemos tu negocio, tus procesos y a tu equipo antes de escribir una sola línea de código.'],
      ['Investigamos y diagramamos', 'Mapeamos el problema y diseñamos el proceso antes de proponer una solución. Recién ahí definimos alcance, tiempos y una cotización clara.'],
      ['Diseñamos y construimos', 'Desarrollamos por etapas y te mostramos avances reales. Ajustamos en el camino según tu feedback.'],
      ['Implementamos y acompañamos', 'Dejamos todo funcionando y no desaparecemos: seguimos cerca para mejorar y dar soporte. Tu sistema no queda solo.'],
    ]},
    reel: { titleA: 'Herramientas para', titleB: 'problemas reales', cards: [
      ['A medida','Sistemas de gestión','Plataformas internas, paneles y ERPs que se ajustan a cómo trabaja tu negocio.'], ['Tiendas online','E-commerce','Catálogo, medios de pago y despacho para vender 24/7 sin intermediarios.'], ['Presencia','Páginas web & landings','Sitios rápidos, modernos y con carácter que convierten visitas en clientes.'], ['Inteligencia','IA & agentes','Asistentes y agentes que automatizan conversaciones, respuestas y tareas.'], ['IA aplicada','Visión computacional','Detección y análisis en tiempo real, incluso en entornos industriales críticos.'], ['Integraciones','Automatización','Conecta tus herramientas y elimina el trabajo manual repetitivo.'], ['Multiplataforma','Apps móviles','Aplicaciones para Android e iOS conectadas a tu sistema en tiempo real.'], ['Datos & BI','Dashboards & reportes','Paneles con métricas en vivo para decidir con datos, no con corazonadas.'], ['Conexión','Integraciones & APIs','Conectamos pagos, despacho, ERPs y cualquier servicio con una API.'], ['Acompañamiento','Mantención & soporte','No desaparecemos al lanzar: monitoreo, mejoras y soporte continuo.'],
    ]},
    logo: { a: 'No entregamos software. Entregamos una forma más', b: 'simple de trabajar' },
    why: { a: 'No prometemos.', b: 'Preferimos mostrarte.', lead: 'Detrás de CALFERS hay sistemas reales operando hoy en distintos rubros, con la tecnología ajustada a la medida de cada uno.', stats: ['Sistemas operando en terreno, sin pausa', 'Nos desempeñamos en distintos rubros, adaptando la tecnología a cada uno', 'Trato directo con quien diseña y construye tu producto', 'De tu idea a una propuesta clara'] },
    contact: { a: 'Estamos a un', b: 'mensaje', c: 'de distancia', lead: 'Elige por dónde prefieres escribirnos. ¿Prefieres algo guiado? Arma tu cotización en un par de clics.', quote: 'Cotiza en 2 minutos', fast: 'Respuesta rápida, en tu bolsillo', anytime: 'Escríbenos cuando quieras', chat: 'Abrir chat', email: 'Enviar correo', copy: 'Copiar', copied: '¡Copiado! ✓', waText: 'Hola CALFERS, quiero cotizar un proyecto.', mailSubject: 'Contacto desde calfers.com' },
    footer: { a: '¿Tienes una idea?', b: 'Hagámosla real.', how: 'Cómo cotizamos', rights: 'Todos los derechos reservados', studio: 'Estudio de software · Chile' },
    quote: { heroA: 'Claro, rápido y', heroB: 'sin letra chica', lead: 'Cotizar con nosotros es una conversación, no un formulario eterno. Así funciona, y al final armas tu mensaje en un par de clics.', buildA: 'Arma tu', buildB: 'cotización', buildC: 'en 3 pasos', questions: ['1 · ¿Qué necesitas?', '2 · ¿Qué tamaño?', '3 · ¿Para cuándo?'], yourMessage: 'Tu mensaje', send: 'Enviar por WhatsApp', or: 'o', otherA: '¿Tienes otra idea o solo una', otherB: 'consulta', otherLead: 'No necesitas llenar los pasos. Cuéntanos lo que tengas en mente y conversamos, sin compromiso.', wa: 'Escribir por WhatsApp', email: 'Enviar un correo', back: '← Volver a la landing', directWa: 'Hola CALFERS, tengo una consulta.', mailSubject: 'Consulta desde calfers.com', steps: [['Paso 01','Nos escribes','Cuéntanos qué necesitas por WhatsApp o el formulario. Sin compromiso.'],['Paso 02','Conversamos','Una conversación corta para entender tu idea, contexto y objetivos.'],['Paso 03','Propuesta','Te enviamos alcance, tiempos y valor en un documento simple, en 24–72 h.'],['Paso 04','Arrancamos','Aprobada la propuesta, empezamos y ves avances desde la primera semana.']], types: ['Página web / landing','Software a medida','E-commerce','IA / automatización'], scopes: ['Algo pequeño y rápido','Un proyecto mediano','Un sistema completo'], times: ['Lo antes posible','En 1–2 meses','Tengo flexibilidad de fechas'] },
  },
  en: {
    nav: { services: 'Services', process: 'Process', portfolio: 'Portfolio', contact: 'Contact', quote: 'Get a quote', quoteProject: 'Quote your project', open: 'Open menu', close: 'Close menu' },
    hero: { first: 'Understand first.', second: 'Build', accent: 'better', body: 'we design custom software: websites, systems, e-commerce and AI. But we never start there. First, we understand how your team works. The software comes next.', cta: "Let's talk", scroll: 'Scroll to explore' },
    marquee: ['Custom software', 'Websites', 'E-commerce', 'Artificial intelligence', 'Management apps', 'Automation', 'Computer vision'],
    statement: "We don't start by writing code. We start by listening. We understand the problem and only then build the tool that solves it.",
    services: { titleA: 'Four ways to', titleB: 'build', titleC: 'with you', lead: 'From a landing page to a complete system. Choose where to start; we will take care of the rest.', items: [
      { title: 'Custom software', word: 'software', desc: 'Management systems, internal platforms and apps tailored to how your business works. No templates.', tags: ['Platforms', 'Dashboards', 'APIs'] },
      { title: 'Websites & landing pages', word: '& landing pages', desc: 'Sites that look incredible, load fast and turn visits into customers. Distinctive design, never generic.', tags: ['Design', 'SEO', 'Responsive'] },
      { title: 'E-commerce', word: 'commerce', desc: 'Complete online stores with catalogs, payments and shipping. Sell 24/7 without relying on middlemen.', tags: ['Payments', 'Catalog', 'Inventory'] },
      { title: 'AI & automation', word: 'automation', desc: 'Chatbots, computer vision and integrations that automate repetitive work so your team can focus on what truly matters.', tags: ['Vision', 'AI assistants', 'Integrations'] },
    ]},
    process: { titleA: 'A', titleB: 'simple', titleC: 'process, no black boxes', steps: [
      ['We listen', 'Tell us your idea. We ask questions and understand your business, processes and team before writing a single line of code.'], ['We research and map', 'We map the problem and design the process before proposing a solution. Only then do we define scope, timing and a clear quote.'], ['We design and build', 'We develop in stages and show you real progress. We adjust along the way based on your feedback.'], ['We launch and support', "We get everything running and don't disappear: we stay close to improve and support it. Your system is never left on its own."],
    ]},
    reel: { titleA: 'Tools for', titleB: 'real problems', cards: [
      ['Custom','Management systems','Internal platforms, dashboards and ERPs tailored to how your business works.'], ['Online stores','E-commerce','Catalog, payment methods and shipping to sell 24/7 without middlemen.'], ['Presence','Websites & landing pages','Fast, modern and distinctive sites that turn visits into customers.'], ['Intelligence','AI & agents','Assistants and agents that automate conversations, answers and tasks.'], ['Applied AI','Computer vision','Real-time detection and analysis, even in critical industrial environments.'], ['Integrations','Automation','Connect your tools and eliminate repetitive manual work.'], ['Cross-platform','Mobile apps','Android and iOS applications connected to your system in real time.'], ['Data & BI','Dashboards & reports','Live metrics to make decisions with data, not hunches.'], ['Connection','Integrations & APIs','We connect payments, shipping, ERPs and any service with an API.'], ['Ongoing support','Maintenance & support',"We don't disappear after launch: monitoring, improvements and continuous support."],
    ]},
    logo: { a: "We don't deliver software. We deliver a", b: 'simpler way to work' },
    why: { a: "We don't make promises.", b: "We'd rather show you.", lead: 'Behind CALFERS are real systems operating today across different industries, with technology tailored to each one.', stats: ['Systems operating in the field, nonstop', 'We work across industries, adapting technology to each one', 'Direct access to the person designing and building your product', 'From your idea to a clear proposal'] },
    contact: { a: "We're just one", b: 'message', c: 'away', lead: 'Choose how you would like to reach us. Prefer some guidance? Build your quote in a couple of clicks.', quote: 'Quote in 2 minutes', fast: 'A quick reply, right in your pocket', anytime: 'Write to us anytime', chat: 'Open chat', email: 'Send email', copy: 'Copy', copied: 'Copied! ✓', waText: 'Hi CALFERS, I would like to get a project quote.', mailSubject: 'Contact from calfers.com' },
    footer: { a: 'Have an idea?', b: "Let's make it real.", how: 'How we quote', rights: 'All rights reserved', studio: 'Software studio · Chile' },
    quote: { heroA: 'Clear, fast and', heroB: 'no fine print', lead: 'Getting a quote from us is a conversation, not an endless form. Here is how it works, and at the end you can build your message in a couple of clicks.', buildA: 'Build your', buildB: 'quote', buildC: 'in 3 steps', questions: ['1 · What do you need?', '2 · What size?', '3 · When do you need it?'], yourMessage: 'Your message', send: 'Send via WhatsApp', or: 'or', otherA: 'Have another idea or just a', otherB: 'question', otherLead: 'You do not need to complete the steps. Tell us what you have in mind and we will talk, with no commitment.', wa: 'Message us on WhatsApp', email: 'Send an email', back: '← Back to the landing page', directWa: 'Hi CALFERS, I have a question.', mailSubject: 'Inquiry from calfers.com', steps: [['Step 01','Write to us','Tell us what you need through WhatsApp or the form. No commitment.'],['Step 02','We talk','A short conversation to understand your idea, context and goals.'],['Step 03','Proposal','We send scope, timing and price in a simple document within 24–72 hours.'],['Step 04','We begin','Once approved, we start and you see progress from the first week.']], types: ['Website / landing page','Custom software','E-commerce','AI / automation'], scopes: ['Something small and fast','A medium-sized project','A complete system'], times: ['As soon as possible','In 1–2 months','My dates are flexible'] },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const query = new URLSearchParams(window.location.search).get('lang')
    if (query === 'es' || query === 'en') return query
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'es'
  })

  const setLang = (next) => {
    if (next !== 'es' && next !== 'en') return
    setLangState(next)
    localStorage.setItem(KEY, next)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState({}, '', url)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    const title = lang === 'en' ? 'CALFERS — Custom software and web development studio' : 'CALFERS — Estudio de desarrollo de software y web a medida'
    const description = lang === 'en' ? 'CALFERS is a custom software studio building web platforms, e-commerce, apps and artificial intelligence solutions.' : 'CALFERS es un estudio de desarrollo de software a medida: plataformas web, e-commerce, apps e inteligencia artificial.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, c: copy[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
