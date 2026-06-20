# CALFER — Portafolio

Portafolio one-page de **Benjamin Osses Bravo** bajo la marca **CALFER**, con estética
inspirada en Starfield (paleta hueso/tinta + franja roja-naranja-ámbar) aplicada a tecnología.

## Estructura

- `index.html` — página completa (hero, sistemas, capacidades, perfil, contacto)
- `css/styles.css` — estilos y animaciones CSS
- `js/main.js` — motor de animaciones en vanilla JS (sin dependencias)

## Características

- Preloader con secuencia de arranque tipo terminal
- **Intro inmersiva continua (un solo plano secuencia)**: detrás del título ya se mueve un corredor de datos 3D (piso de grilla con pulsos de luz tipo circuito, compuertas de interfaz con esquinas HUD); al scrollear atraviesas el título y desciendes por el mismo corredor —el scroll controla la cámara como si frotaras un video— con mensajes que vuelan hacia ti, medidor de profundidad y un núcleo de luz que funde con el marquee naranjo de salida. Sin cortes entre escenas y sin estética espacial: es un circuito, no un cielo estrellado
- Cursor personalizado con anillo magnético
- Efecto *scramble* en el título principal
- **6 proyectos reales** (datos del PDF del usuario), cada uno con su propia visualización canvas: radar (IA minería), electrocardiograma (veterinaria CalFer), calendario/grid (Redland School), red de nodos (Dentistation), brasas (Parrillas del Gancho), onda de voz (Asistente IA)
- **Tarjetas de proyecto con profundidad 3D**: gradiente, sombras en capas, bisel, scanlines y esquinas de visor
- **Teatro inmersivo de proyectos** (`sceneChoreo()` en `js/main.js`): cada proyecto es una escena fijada (`.scene` con `position:sticky`). Al scrollear: (1) te SUMERGES en una palabra clave gigante (MINERÍA, CLÍNICA, ESCUELA, DENTAL, FUEGO, IA) que crece, te envuelve y la atraviesas con desenfoque; (2) el gráfico canvas ERUPCIONA a pantalla completa (sale de la tarjeta y se vuelve el ambiente) y se asienta; (3) un panel de vidrio con la info se desliza; (4) todo se consume con zoom hacia la siguiente escena. Importante: `.theater` necesita `overflow:visible` (sobrescribe `.section--dark`) para que el sticky funcione. En móvil/`prefers-reduced-motion` se desactiva (escenas estáticas)
- **Bilingüe ES / EN**: toggle en el nav; diccionario `I18N` en `js/main.js`, textos marcados con `data-i18n` en el HTML. Default español, persiste en `localStorage` (`calfer-lang`). Para texto nuevo: agregar `data-i18n="clave"` y la entrada en ambos idiomas
- **Transición warp entre secciones**: al pulsar un enlace del menú se abre un portal desde el punto del clic, se cruza un túnel de datos y se emerge en la sección destino (salto no lineal). Ver `warpNav()` en `js/main.js`
- Contacto con email, teléfono y LinkedIn reales

## Versionado de assets (cache busting)

`index.html` referencia `css/styles.css?vN` y `js/main.js?vN`. **Cada vez que edites el CSS o el JS, sube el número de versión** (`?v=5` → `?v=6`) en ambas etiquetas de `index.html`. Esto evita que los navegadores (y el túnel de Cloudflare) sirvan archivos cacheados antiguos — fue la causa de que algunas animaciones aparecieran en negro.
- Contadores animados, reveal on scroll, tilt 3D, botones magnéticos, marquee
- Reloj HUD en vivo y detalles tipo interfaz de nave
- Responsive (menú móvil) y respeta `prefers-reduced-motion`

## Cómo verla

Cualquier servidor estático sirve. Por ejemplo:

```
python -m http.server 8765
```

y abrir <http://localhost:8765>.

## Personalizar

- **Correo de contacto:** `benjamin0osses@gmail.com` (buscar el `mailto:` en `index.html` para cambiarlo).
- **Colores:** variables CSS al inicio de `css/styles.css` (`--red`, `--orange`, `--amber`, `--bone`, `--ink`).
- **Proyectos:** cada `<article class="project">` en `index.html`; el atributo `data-viz` (`radar` | `pulse` | `wave`) elige la animación del visual.
