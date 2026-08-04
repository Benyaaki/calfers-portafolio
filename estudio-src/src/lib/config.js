// Datos de contacto del estudio CALFERS (página de servicios).
// Cambiar aquí una sola vez si algún dato varía.
export const CONTACT = {
  email: 'contacto@calfers.com',
  whatsapp: '56921884650', // formato internacional sin +, para wa.me
  whatsappPretty: '+56 9 2188 4650',
  linkedin: 'https://www.linkedin.com/in/benjamin-osses-bravo-163460388',
  // Vuelta al portafolio. En producción vive en calfers.com/portafolio; en dev
  // apunta al portafolio servido localmente (launch "calfer-portfolio", :8765)
  // para poder probar el salto.
  portfolioUrl: import.meta.env.DEV ? 'http://localhost:8765/' : '/portafolio/',
  // ID de Formspree para el formulario. Crear gratis en https://formspree.io
  // (apuntando a contacto@calfers.com) y pegar el código aquí, ej: 'xriwabcd'.
  // Mientras esté vacío, el formulario abre el correo con los datos ya cargados.
  formspreeId: '',
}

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}&su=${encodeURIComponent(subject)}`
