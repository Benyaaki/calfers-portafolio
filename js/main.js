/* ==========================================================
   CALFERS — Portafolio · Motor de animaciones (vanilla JS)
   ========================================================== */
"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Estado compartido de scroll: la intro completa es una línea de tiempo (0 → 1) */
const scrollState = { introP: 0 };

/* Colores de los canvas según el tema (se leen de las variables CSS y se
   refrescan al cambiar de modo claro/oscuro). */
const themeColors = { neutral: "47, 81, 128", disc: "24, 35, 56" };
function refreshThemeColors() {
  const cs = getComputedStyle(document.documentElement);
  const n = cs.getPropertyValue("--canvas-neutral").trim();
  const d = cs.getPropertyValue("--canvas-disc").trim();
  if (n) themeColors.neutral = n;
  if (d) themeColors.disc = d;
}
refreshThemeColors();
document.addEventListener("themechange", refreshThemeColors);

/* ============ I18N (español / inglés) ============ */
const LANG_KEY = "calfer-lang";
let currentLang = (() => {
  try { return localStorage.getItem(LANG_KEY) || "es"; } catch (e) { return "es"; }
})();

const I18N = {
  es: {
    title: "CALFERS — Ingeniería en Informática · Benjamin Osses Bravo",
    desc: "CALFERS · Benjamin Osses Bravo, desarrollador Full Stack e ingeniería en informática. Sistemas con IA, visión computacional, plataformas web y experiencias digitales.",
    "nav.systems": "Sistemas", "nav.caps": "Capacidades", "nav.profile": "Perfil",
    "nav.contact": "Contacto", "nav.cta": "Trabajemos juntos",
    "warp.jump": "NAVEGANDO A",
    "hero.tag": "DESARROLLADOR FULL STACK · ING. EN INFORMÁTICA",
    "hero.sub": "Sistemas inteligentes, visión computacional y experiencias web que operan donde otros no llegan.",
    "hero.btn1": "Explorar sistemas", "hero.btn2": "Contacto directo",
    "hero.scroll": "SCROLL PARA SUMERGIRTE",
    "hero.depth": "PROFUNDIDAD", "hero.integrity": "INTEGRIDAD",
    "dive.l1": "SECUENCIA 01 // DESCENSO", "dive.h1": "Iniciando<br />inmersión", "dive.p1": "Estás entrando al núcleo de CALFERS.",
    "dive.l2": "SECUENCIA 02 // CAPAS", "dive.h2": "Inteligencia<br />en cada nivel", "dive.p2": "IA, visión computacional y datos en tiempo real.",
    "dive.l3": "SECUENCIA 03 // LLEGADA", "dive.h3": "Sistemas<br />vivos", "dive.p3": "Operando 24/7 donde otros no llegan.",
    "mq.text": "INTELIGENCIA ARTIFICIAL ✦ VISIÓN COMPUTACIONAL ✦ SISTEMAS DE GESTIÓN ✦ EXPERIENCIAS WEB ✦ TELEMETRÍA ✦ AUTOMATIZACIÓN ✦ ",
    "sec.sysIndex": "01 / MISIONES", "sec.sysTitle": "Sistemas<br /><em>desplegados</em>",
    "sec.sysLead": "Cada proyecto es una misión: un problema real, un entorno hostil y una solución que tiene que funcionar todos los días.",
    "kw.1": "MINERÍA", "kw.2": "CLÍNICA", "kw.3": "ESCUELA", "kw.4": "DENTAL", "kw.5": "FUEGO", "kw.6": "IA",
    "p1.name": "Detección de fatiga<br />y distracción con IA",
    "p1.desc": "Sistema de visión computacional que monitorea en tiempo real a operadores de camiones y maquinaria pesada en faenas mineras. Detecta somnolencia, microsueños, malos hábitos y desconcentración mediante cámaras e inteligencia artificial, emitiendo alertas antes de que ocurra el accidente.",
    "p1.t3": "Tiempo real", "p1.t4": "Minería",
    "p1.m1": "/7 monitoreo", "p1.m2": "% precisión objetivo", "p1.m3": "latencia de alerta",
    "p2.name": "Sistema de gestión<br />veterinaria · Calfers",
    "p2.desc": "Plataforma web integral para clínicas veterinarias: punto de venta (POS), control de inventario multi-sucursal, fichas clínicas y gestión de pacientes, registro de servicios, caja diaria y reportes con estadísticas. Centraliza toda la operación que antes vivía dispersa en planillas.",
    "p2.m1": "módulos integrados", "p2.m2": "% operación digital", "p2.m3": "+ inventario + caja",
    "p3.name": "Calendario escolar<br />Redland School",
    "p3.desc": "Plataforma de gestión centralizada de actividades académicas y evaluaciones, con acceso segmentado para administración, docentes y estudiantes en tiempo real. Reemplazó correos y documentos aislados por un único sistema con trazabilidad. Implementado en una institución educativa real.",
    "p3.t4": "Multi-rol",
    "p3.m1": "tipos de usuario", "p3.m2": "semanas por vista", "p3.m3": "fuente de verdad",
    "p4.name": "Dentistation<br />plataforma educativa",
    "p4.desc": "Plataforma que conecta estudiantes de odontología con pacientes que necesitan tratamientos a precios justos, bajo supervisión académica. Incluye paneles por tipo de usuario, planes de suscripción y gestión de contenido educativo en salud dental.",
    "p4.t3": "Suscripciones",
    "p4.m1": "+ tratamientos", "p4.m2": "planes de acceso", "p4.m3": "perfiles conectados",
    "p5.name": "Parrillas del Gancho<br />e-commerce",
    "p5.desc": "Digitalización de un negocio tradicional de parrillas: catálogo de productos, fichas detalladas, panel administrativo y diseño orientado a conversión. Una vitrina online optimizada en rendimiento que lleva el oficio del fuego a internet.",
    "p5.t3": "Catálogo", "p5.t4": "Conversión",
    "p5.m1": "+ parrillas fabricadas", "p5.m2": "+ clientes", "p5.m3": "+ pedidos entregados",
    "p6.name": "Asistente de IA<br />proyecto personal",
    "p6.desc": "Asistente inteligente para automatizar tareas mediante reconocimiento de voz y procesamiento de lenguaje natural, con integración local de herramientas de IA. Un laboratorio para explorar aplicaciones prácticas de modelos de lenguaje en la asistencia personal.",
    "p6.t2": "Voz", "p6.t4": "Automatización",
    "p6.m1": "+ voz local", "p6.m2": "% experimental", "p6.m3": "investigación propia",
    "sec.capsIndex": "02 / ARSENAL", "sec.capsTitle": "Capacidades<br /><em>técnicas</em>",
    "orbit.hint": "Sistema CALFERS · toca un planeta para saber más",
    "solar.hint": "Arrastra para girar · toca un planeta · baja para sumergirte hacia el núcleo",
    "solar.tag": "TECNOLOGÍA", "solar.proj": "PROYECTOS",
    "cap1.h": "Inteligencia Artificial",
    "cap1.p": "Modelos de visión computacional, detección en tiempo real y análisis de comportamiento aplicados a entornos industriales críticos.",
    "cap2.h": "Frontend &amp; Experiencia",
    "cap2.p": "Interfaces modernas con React y Tailwind CSS: responsivas, accesibles y rápidas, con micro-interacciones que se sienten vivas.",
    "cap3.h": "Backend &amp; Sistemas",
    "cap3.p": "APIs REST con FastAPI, bases de datos NoSQL en MongoDB y lógica de negocio para plataformas de gestión completas y escalables.",
    "cap4.h": "Despliegue &amp; Operación",
    "cap4.p": "Sistemas que no se apagan: monitoreo, telemetría y soluciones operando 24/7 en terreno.",
    "sec.profIndex": "03 / PERFIL",
    "prof.status": "ACTIVO",
    "prof.kRole": "ROL", "prof.vRole": "Desarrollador Full Stack",
    "prof.kEdu": "CARRERA", "prof.vEdu": "Ing. en Informática · cursando",
    "prof.kLoc": "BASE", "prof.vLoc": "Rancagua / Santiago, Chile",
    "prof.kStatus": "ESTADO", "prof.vStatus": "Disponible para proyectos",
    "prof.p1": "Soy <strong>desarrollador Full Stack</strong> y estudiante de Ingeniería en Informática. He construido y puesto en producción sistemas de gestión reales para los rubros educativo, veterinario y hotelero, trabajando de forma autónoma desde la planificación hasta el despliegue.",
    "prof.p2": "Mi stack principal es React, FastAPI y MongoDB. Despliego en distintos servicios cloud y servidores —Hostinger, VPS, Netlify, Render, Vercel y otros— adaptándome a lo que cada proyecto necesita. Me enfoco en soluciones funcionales, escalables y mantenibles.",
    "prof.s1": "sistemas en producción", "prof.s2": "certificaciones", "prof.s3": "rubros · industrias",
    "con.index": "04 / TRANSMISIÓN",
    "con.titlePre": "Construyamos algo", "con.titleEm": "juntos", "con.titlePost": "",
    "con.lead": "Hablemos. CALFERS se especializa en los proyectos que otros consideran demasiado complejos.",
    "con.btn": "Abrir canal de comunicación",
    "con.cEmail": "Enviar correo", "con.cWa": "Enviar mensaje", "con.cLi": "Ver perfil",
  },
  en: {
    title: "CALFERS — Computer Engineering · Benjamin Osses Bravo",
    desc: "CALFERS · Benjamin Osses Bravo, Full Stack developer & computer engineering. AI systems, computer vision, web platforms and digital experiences.",
    "nav.systems": "Systems", "nav.caps": "Capabilities", "nav.profile": "Profile",
    "nav.contact": "Contact", "nav.cta": "Let's work together",
    "warp.jump": "NAVIGATING TO",
    "hero.tag": "FULL STACK DEVELOPER · COMPUTER ENGINEERING",
    "hero.sub": "Intelligent systems, computer vision and web experiences that operate where others can't reach.",
    "hero.btn1": "Explore systems", "hero.btn2": "Direct contact",
    "hero.scroll": "SCROLL TO DIVE IN",
    "hero.depth": "DEPTH", "hero.integrity": "INTEGRITY",
    "dive.l1": "SEQUENCE 01 // DESCENT", "dive.h1": "Initiating<br />immersion", "dive.p1": "You are entering the CALFERS core.",
    "dive.l2": "SEQUENCE 02 // LAYERS", "dive.h2": "Intelligence<br />at every layer", "dive.p2": "AI, computer vision and real-time data.",
    "dive.l3": "SEQUENCE 03 // ARRIVAL", "dive.h3": "Living<br />systems", "dive.p3": "Operating 24/7 where others can't reach.",
    "mq.text": "ARTIFICIAL INTELLIGENCE ✦ COMPUTER VISION ✦ MANAGEMENT SYSTEMS ✦ WEB EXPERIENCES ✦ TELEMETRY ✦ AUTOMATION ✦ ",
    "sec.sysIndex": "01 / MISSIONS", "sec.sysTitle": "Systems<br /><em>deployed</em>",
    "sec.sysLead": "Each project is a mission: a real problem, a hostile environment, and a solution that has to work every single day.",
    "kw.1": "MINING", "kw.2": "CLINIC", "kw.3": "SCHOOL", "kw.4": "DENTAL", "kw.5": "FIRE", "kw.6": "AI",
    "p1.name": "Fatigue &amp; distraction<br />detection with AI",
    "p1.desc": "Computer vision system that monitors truck and heavy-machinery operators in mining sites in real time. It detects drowsiness, microsleeps, bad habits and distraction through cameras and artificial intelligence, raising alerts before an accident happens.",
    "p1.t3": "Real-time", "p1.t4": "Mining",
    "p1.m1": "/7 monitoring", "p1.m2": "% target accuracy", "p1.m3": "alert latency",
    "p2.name": "Veterinary management<br />system · Calfers",
    "p2.desc": "All-in-one web platform for veterinary clinics: point of sale (POS), multi-branch inventory control, clinical records and patient management, service logging, daily cash register and reports with statistics. It centralizes operations that used to live scattered across spreadsheets.",
    "p2.m1": "integrated modules", "p2.m2": "% digital operation", "p2.m3": "+ inventory + register",
    "p3.name": "School calendar<br />Redland School",
    "p3.desc": "Centralized management platform for academic activities and assessments, with role-based access for administration, teachers and students in real time. It replaced scattered emails and documents with a single traceable system. Deployed in a real educational institution.",
    "p3.t4": "Multi-role",
    "p3.m1": "user types", "p3.m2": "weeks per view", "p3.m3": "source of truth",
    "p4.name": "Dentistation<br />educational platform",
    "p4.desc": "Platform that connects dentistry students with patients who need treatments at fair prices, under academic supervision. It includes role-based dashboards, subscription plans and management of dental health educational content.",
    "p4.t3": "Subscriptions",
    "p4.m1": "+ treatments", "p4.m2": "access plans", "p4.m3": "connected profiles",
    "p5.name": "Parrillas del Gancho<br />e-commerce",
    "p5.desc": "Digitalization of a traditional grill business: product catalog, detailed listings, admin panel and conversion-oriented design. A performance-optimized online storefront that brings the craft of fire to the internet.",
    "p5.t3": "Catalog", "p5.t4": "Conversion",
    "p5.m1": "+ grills built", "p5.m2": "+ clients", "p5.m3": "+ orders delivered",
    "p6.name": "AI assistant<br />personal project",
    "p6.desc": "Intelligent assistant to automate tasks through speech recognition and natural language processing, with local integration of AI tools. A lab to explore practical applications of language models in personal assistance.",
    "p6.t2": "Voice", "p6.t4": "Automation",
    "p6.m1": "+ local voice", "p6.m2": "% experimental", "p6.m3": "own research",
    "sec.capsIndex": "02 / ARSENAL", "sec.capsTitle": "Technical<br /><em>capabilities</em>",
    "orbit.hint": "CALFERS system · tap a planet to learn more",
    "solar.hint": "Drag to rotate · tap a planet · scroll to dive toward the core",
    "solar.tag": "TECHNOLOGY", "solar.proj": "PROJECTS",
    "cap1.h": "Artificial Intelligence",
    "cap1.p": "Computer vision models, real-time detection and behavior analysis applied to critical industrial environments.",
    "cap2.h": "Frontend &amp; Experience",
    "cap2.p": "Modern interfaces with React and Tailwind CSS: responsive, accessible and fast, with micro-interactions that feel alive.",
    "cap3.h": "Backend &amp; Systems",
    "cap3.p": "REST APIs with FastAPI, NoSQL databases on MongoDB and business logic for complete, scalable management platforms.",
    "cap4.h": "Deployment &amp; Operation",
    "cap4.p": "Systems that never shut down: monitoring, telemetry and solutions running 24/7 in the field.",
    "sec.profIndex": "03 / PROFILE",
    "prof.status": "ACTIVE",
    "prof.kRole": "ROLE", "prof.vRole": "Full Stack Developer",
    "prof.kEdu": "DEGREE", "prof.vEdu": "Computer Engineering · in progress",
    "prof.kLoc": "BASE", "prof.vLoc": "Rancagua / Santiago, Chile",
    "prof.kStatus": "STATUS", "prof.vStatus": "Available for projects",
    "prof.p1": "I'm a <strong>Full Stack developer</strong> and Computer Engineering student. I've built and shipped real management systems to production for the education, veterinary and hospitality sectors, working autonomously from planning to deployment.",
    "prof.p2": "My core stack is React, FastAPI and MongoDB. I deploy across different cloud services and servers —Hostinger, VPS, Netlify, Render, Vercel and others— adapting to each project's needs. I focus on functional, scalable and maintainable solutions.",
    "prof.s1": "systems in production", "prof.s2": "certifications", "prof.s3": "industries · sectors",
    "con.index": "04 / TRANSMISSION",
    "con.titlePre": "Let's build something", "con.titleEm": "together", "con.titlePost": "",
    "con.lead": "Let's talk. CALFERS specializes in the projects others consider too complex.",
    "con.btn": "Open communication channel",
    "con.cEmail": "Send email", "con.cWa": "Send message", "con.cLi": "View profile",
  },
};

function t(key) {
  const L = I18N[currentLang] || {};
  if (key in L) return L[key];          // respeta cadenas vacías ("")
  if (key in I18N.es) return I18N.es[key];
  return key;
}

(function i18nController() {
  const toggle = document.getElementById("langToggle");

  function apply() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n"));
    });
    const meta = document.querySelector("[data-i18n-meta='desc']");
    if (meta) meta.setAttribute("content", t("desc"));
    document.title = t("title");
    if (toggle) {
      toggle.querySelectorAll(".nav__lang-opt").forEach((o) =>
        o.classList.toggle("is-active", o.dataset.lang === currentLang)
      );
    }
    // avisar a otros módulos (warp, etc.) que el idioma cambió
    document.dispatchEvent(new CustomEvent("langchange", { detail: currentLang }));
  }

  function setLang(lang) {
    if (lang !== "es" && lang !== "en") return;
    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    apply();
  }

  if (toggle) {
    toggle.addEventListener("click", (e) => {
      const opt = e.target.closest(".nav__lang-opt");
      if (opt) setLang(opt.dataset.lang);
      else setLang(currentLang === "es" ? "en" : "es");
    });
  }

  apply();
  // exponer para otros módulos
  window.__setLang = setLang;
})();

/* ============ TEMA (claro / oscuro) ============ */
(function themeController() {
  const KEY = "calfer-theme";
  const toggle = document.getElementById("themeToggle");
  let theme = (() => {
    try { return localStorage.getItem(KEY) === "dark" ? "dark" : "light"; } catch (e) { return "light"; }
  })();

  function apply() {
    document.documentElement.setAttribute("data-theme", theme);
    // avisar a los canvas para que relean sus colores neutros
    document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  function setTheme(t) {
    theme = t === "dark" ? "dark" : "light";
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    apply();
  }

  if (toggle) {
    toggle.addEventListener("click", () => setTheme(theme === "dark" ? "light" : "dark"));
  }

  apply();
  window.__setTheme = setTheme;
})();

/* ============ PRELOADER (boot sequence) ============ */
(function preloader() {
  const pre = document.getElementById("preloader");
  const log = document.getElementById("bootLog");
  const bar = document.getElementById("bootBar");
  const pct = document.getElementById("bootPct");
  if (!pre) return;

  const lines = currentLang === "en" ? [
    "> initializing CALFERS core .......... <span class='ok'>OK</span>",
    "> loading AI vision modules ......... <span class='ok'>OK</span>",
    "> calibrating graphic interface ..... <span class='ok'>OK</span>",
    "> establishing data link ............ <span class='ok'>OK</span>",
  ] : [
    "> inicializando núcleo CALFERS ......... <span class='ok'>OK</span>",
    "> cargando módulos de visión IA ....... <span class='ok'>OK</span>",
    "> calibrando interfaz gráfica ......... <span class='ok'>OK</span>",
    "> estableciendo enlace de datos ....... <span class='ok'>OK</span>",
  ];

  if (prefersReducedMotion) {
    pre.classList.add("is-done");
    return;
  }

  let progress = 0;
  let lineIdx = 0;

  const lineTimer = setInterval(() => {
    if (lineIdx < lines.length) {
      log.innerHTML += lines[lineIdx] + "<br>";
      lineIdx++;
    }
  }, 380);

  const progTimer = setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 9 + 3);
    bar.style.width = progress + "%";
    pct.textContent = Math.floor(progress);
    if (progress >= 100) {
      clearInterval(progTimer);
      clearInterval(lineTimer);
      log.innerHTML = lines.map((l) => l + "<br>").join("");
      setTimeout(() => pre.classList.add("is-done"), 450);
    }
  }, 120);

  // seguridad: nunca dejar el preloader pegado
  setTimeout(() => pre.classList.add("is-done"), 6000);
})();

/* ============ CURSOR PERSONALIZADO ============ */
(function cursor() {
  const dot = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring || !window.matchMedia("(pointer: fine)").matches) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  (function follow() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(follow);
  })();

  document.querySelectorAll("a, button, .project, .cap").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });
})();

/* ============ NAV ============ */
(function nav() {
  const header = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 60);
  }, { passive: true });

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    menu.classList.toggle("is-open");
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("is-open");
      menu.classList.remove("is-open");
    })
  );
})();

/* ============ WARP: salto inmersivo entre secciones ============
   Al pulsar un enlace del menú, se abre un portal desde el punto del
   clic, se cruza un túnel de datos y se emerge en la sección destino
   (el salto al scroll es instantáneo: la navegación deja de ser lineal). */
(function warpNav() {
  const warp = document.getElementById("warp");
  const canvas = document.getElementById("warpCanvas");
  const targetEl = document.getElementById("warpTarget");
  if (!warp || !canvas) return;

  const LABELS = {
    es: { inicio: "Inicio", sistemas: "Sistemas", capacidades: "Capacidades", perfil: "Perfil", contacto: "Contacto" },
    en: { inicio: "Home", sistemas: "Systems", capacidades: "Capabilities", perfil: "Profile", contacto: "Contact" },
  };

  let busy = false;
  let anim = null;

  function runTunnel(duration) {
    const { ctx, w, h } = fitCanvas(canvas);
    const start = performance.now();
    const streaks = Array.from({ length: 90 }, () => ({
      ang: Math.random() * Math.PI * 2,
      r: Math.random() * 0.25,
      speed: 0.6 + Math.random() * 1.4,
      hot: Math.random() < 0.4,
      len: 0.04 + Math.random() * 0.12,
    }));
    let rings = [];
    let lastRing = 0;
    cancelAnimationFrame(anim);
    (function frame(now) {
      const t = now - start;
      const cx = w / 2, cy = h / 2;
      const maxR = Math.hypot(w, h) / 2;
      ctx.clearRect(0, 0, w, h);

      // núcleo brillante
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.6);
      g.addColorStop(0, "rgba(242, 179, 45, 0.5)");
      g.addColorStop(0.3, "rgba(238, 118, 35, 0.18)");
      g.addColorStop(1, "rgba(238, 118, 35, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // anillos hexagonales que se expanden (HUD, no estrellas)
      if (now - lastRing > 130) { rings.push({ r: 0 }); lastRing = now; }
      rings = rings.filter((rg) => rg.r < maxR * 1.2);
      for (const rg of rings) {
        rg.r += maxR * 0.018;
        const a = Math.max(0, 1 - rg.r / (maxR * 1.2));
        ctx.strokeStyle = `rgba(238, 118, 35, ${a * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let k = 0; k <= 6; k++) {
          const ang = (k / 6) * Math.PI * 2 + rg.r * 0.004;
          const x = cx + Math.cos(ang) * rg.r;
          const y = cy + Math.sin(ang) * rg.r;
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // estelas de datos que salen disparadas (warp)
      const accel = 1 + (t / duration) * 4;
      for (const s of streaks) {
        s.r += s.speed * 0.013 * accel;
        if (s.r > 1.25) { s.r = Math.random() * 0.1; }
        const r1 = s.r * maxR;
        const r2 = Math.max(0, s.r - s.len) * maxR;
        const x1 = cx + Math.cos(s.ang) * r1;
        const y1 = cy + Math.sin(s.ang) * r1;
        const x2 = cx + Math.cos(s.ang) * r2;
        const y2 = cy + Math.sin(s.ang) * r2;
        ctx.strokeStyle = s.hot
          ? `rgba(238, 118, 35, ${Math.min(1, s.r) * 0.9})`
          : `rgba(242, 239, 233, ${Math.min(1, s.r) * 0.7})`;
        ctx.lineWidth = s.hot ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      if (t < duration) anim = requestAnimationFrame(frame);
    })(start);
  }

  function jumpTo(id, ev) {
    if (busy) return;
    const el = document.getElementById(id);
    if (!el) return;
    busy = true;

    // origen del portal = punto del clic
    const x = ev ? (ev.clientX / window.innerWidth) * 100 : 50;
    const y = ev ? (ev.clientY / window.innerHeight) * 100 : 50;
    warp.style.setProperty("--wx", x + "%");
    warp.style.setProperty("--wy", y + "%");
    targetEl.textContent = (LABELS[currentLang] && LABELS[currentLang][id]) || id;

    runTunnel(1100);

    warp.classList.add("is-active");
    // forzar reflow para que la transición de apertura se dispare
    void warp.offsetWidth;
    warp.classList.add("is-opening");

    // a mitad de la cobertura: saltar instantáneamente al destino
    setTimeout(() => {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      // el logo / #inicio lleva al tope absoluto de la página
      const top = id === "inicio" ? 0 : el.getBoundingClientRect().top + window.pageYOffset - 6;
      window.scrollTo(0, Math.max(0, top));
      document.documentElement.style.scrollBehavior = prev;
    }, 520);

    // cerrar el portal contrayéndose (dirección distinta = no lineal)
    setTimeout(() => {
      warp.classList.remove("is-opening");
      warp.classList.add("is-closing");
    }, 760);

    // limpiar
    setTimeout(() => {
      warp.classList.remove("is-active", "is-closing");
      warp.style.transition = "none";
      void warp.offsetWidth;
      warp.style.transition = "";
      cancelAnimationFrame(anim);
      busy = false;
    }, 1400);
  }

  if (prefersReducedMotion) return;

  const links = document.querySelectorAll(
    '.nav__links a[href^="#"], .mobile-menu a[href^="#"], .nav__logo[href^="#"]'
  );
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      jumpTo(id, e);
    });
  });
})();

/* ============ DIRECTOR DE SCROLL ============
   La intro (hero + descenso) es UNA línea de tiempo continua:
   0.00–0.22  el título se acerca y lo atraviesas
   0.22–0.95  desciendes por el corredor de datos (mensajes al paso)
   0.95–1.00  llegas al núcleo y emerges hacia los proyectos       */
(function scrollDirector() {
  if (prefersReducedMotion) return;
  const wrap = document.querySelector(".hero-wrap");
  const heroContent = document.querySelector(".hero__content");
  const heroScrollHint = document.querySelector(".hero__scroll");
  const heroHuds = document.querySelectorAll(".hero__hud");
  const msgs = Array.from(document.querySelectorAll(".dive__msg"));
  const diveHuds = document.querySelectorAll(".dive__hud");
  const depthEl = document.getElementById("diveDepth");
  if (!wrap || !heroContent) return;

  function progressOf(el) {
    const r = el.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -r.top / total));
  }

  (function frame() {
    const p = progressOf(wrap);
    scrollState.introP = p;

    // título: crece y lo atraviesas en el primer tramo
    const hp = Math.min(1, p / 0.22);
    heroContent.style.transform = `translateY(${hp * -8}vh) scale(${1 + hp * 2.4})`;
    heroContent.style.opacity = Math.max(0, 1 - hp * 1.35).toFixed(3);
    heroHuds.forEach((hud) => (hud.style.opacity = Math.max(0, 1 - hp * 1.8).toFixed(3)));
    if (heroScrollHint) heroScrollHint.style.opacity = Math.max(0, 1 - hp * 3).toFixed(3);

    // HUD de inmersión: aparece cuando ya estás dentro
    const hudO = p < 0.18 ? 0 : p < 0.26 ? (p - 0.18) / 0.08 : p > 0.96 ? Math.max(0, (1 - p) / 0.04) : 1;
    diveHuds.forEach((hud) => (hud.style.opacity = hudO.toFixed(3)));
    if (depthEl) {
      const depth = Math.min(1, Math.max(0, (p - 0.2) / 0.78)) * 1847;
      depthEl.textContent = String(Math.floor(depth)).padStart(4, "0");
    }

    // mensajes que vuelan hacia ti durante el descenso
    for (const m of msgs) {
      const from = parseFloat(m.dataset.diveFrom);
      const to = parseFloat(m.dataset.diveTo);
      let opacity = 0;
      let local = p > to ? 1 : 0;
      if (p >= from && p <= to) {
        local = (p - from) / (to - from);
        opacity = local < 0.22 ? local / 0.22 : local > 0.78 ? (1 - local) / 0.22 : 1;
      }
      m.style.opacity = opacity.toFixed(3);
      m.style.transform = `translate(-50%, -50%) scale(${0.8 + local * 0.55})`;
    }

    requestAnimationFrame(frame);
  })();
})();

/* ============ TEATRO INMERSIVO DE PROYECTOS ============
   Cada escena se fija mientras scrolleas: (1) te SUMERGES en la palabra
   clave (crece, te envuelve y la atraviesas con desenfoque); (2) el gráfico
   del proyecto ERUPCIONA a pantalla completa —sale de la tarjeta y se vuelve
   el ambiente— y luego se asienta; (3) el panel de info se desliza; (4) todo
   se consume con zoom hacia la siguiente escena. */
(function sceneChoreo() {
  if (prefersReducedMotion) return;
  const scenes = Array.from(document.querySelectorAll("[data-scene]"));
  if (!scenes.length) return;

  const mq = window.matchMedia("(min-width: 881px)");
  let active = mq.matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ramp = (x, a, b) => clamp((x - a) / (b - a), 0, 1); // 0→1 entre a y b

  // cachear elementos de cada escena (capas flotantes incluidas)
  const data = scenes.map((s) => ({
    scene: s,
    word: s.querySelector("[data-word]"),
    viz: s.querySelector("[data-vizwrap]"),
    layers: Array.from(s.querySelectorAll("[data-layer]")),
  }));

  function reset() {
    data.forEach((d) => {
      [d.word, d.viz, ...d.layers].forEach((el) => {
        if (el) { el.style.transform = ""; el.style.opacity = ""; el.style.filter = ""; }
      });
    });
  }
  if (mq.addEventListener) {
    mq.addEventListener("change", (e) => { active = e.matches; if (!active) reset(); });
  }

  (function frame() {
    if (active) {
      const vh = window.innerHeight;
      for (const d of data) {
        const r = d.scene.getBoundingClientRect();
        const denom = r.height - vh;
        const p = denom > 0 ? clamp(-r.top / denom, 0, 1) : 0;

        // (1) palabra: te sumerges en ella y la atraviesas
        if (d.word) {
          const ws = 0.5 + p * 7;
          const wo = ramp(p, 0, 0.05) * (1 - ramp(p, 0.28, 0.42));
          const wb = ramp(p, 0.16, 0.42) * 16;
          d.word.style.transform = `scale(${ws.toFixed(3)})`;
          d.word.style.opacity = wo.toFixed(3);
          d.word.style.filter = wb > 0.2 ? `blur(${wb.toFixed(1)}px)` : "none";
        }

        // (2) gráfico a pantalla completa: aparece y se desvanece con fundido largo (sin cortes)
        if (d.viz) {
          const appear = ramp(p, 0.18, 0.42);
          const leave = ramp(p, 0.70, 0.98);
          const vo = appear * (1 - leave);
          const settle = 1.5 - 0.5 * ramp(p, 0.18, 0.55); // 1.5 → 1.0
          const vs = settle + 0.20 * leave;               // + leve zoom al salir
          d.viz.style.opacity = vo.toFixed(3);
          d.viz.style.transform = `scale(${vs.toFixed(3)})`;
        }

        // (3) capas de info: entran escalonadas desde distintos puntos
        const out = ramp(p, 0.82, 0.95);
        d.layers.forEach((el, i) => {
          const a = 0.44 + i * 0.04;
          const inp = ramp(p, a, a + 0.16);
          const o = inp * (1 - out);
          const ty = (1 - inp) * 34 - out * 28;
          el.style.opacity = o.toFixed(3);
          el.style.transform = `translateY(${ty.toFixed(1)}px)`;
        });
      }
    }
    requestAnimationFrame(frame);
  })();
})();

/* ============ RELOJ HUD ============ */
(function hudClock() {
  const el = document.getElementById("hudClock");
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent =
      "T+" +
      [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
  };
  tick();
  setInterval(tick, 1000);
})();

/* ============ SCRAMBLE DE TEXTO ============ */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
function scramble(el, finalText, duration = 1200) {
  if (prefersReducedMotion) {
    el.textContent = finalText;
    return;
  }
  const start = performance.now();
  (function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const settled = Math.floor(t * finalText.length);
    let out = "";
    for (let i = 0; i < finalText.length; i++) {
      out += i < settled ? finalText[i] : CHARS[(Math.random() * CHARS.length) | 0];
    }
    el.textContent = out;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = finalText;
  })(start);
}

window.addEventListener("load", () => {
  document.querySelectorAll("[data-scramble]").forEach((el) => {
    const txt = el.textContent.trim();
    setTimeout(() => scramble(el, txt, 1400), 600);
  });
});

document.querySelectorAll("[data-scramble-hover]").forEach((el) => {
  el.addEventListener("mouseenter", () => scramble(el, el.textContent.trim(), 700));
});

/* ============ REVEAL ON SCROLL + CONTADORES ============ */
(function observers() {
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal, .cap").forEach((el) => revealObs.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const dur = 1500;
    const start = performance.now();
    (function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target);
      if (t < 1) requestAnimationFrame(frame);
    })(start);
  }

  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-counter]").forEach((el) => counterObs.observe(el));
})();

/* ============ MAGNETIC ELEMENTS ============ */
(function magnetic() {
  if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "translate(0,0)";
      setTimeout(() => (el.style.transition = ""), 400);
    });
  });
})();

/* ============ TILT 3D EN TARJETAS ============ */
(function tilt() {
  if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "perspective(1100px) rotateY(0) rotateX(0)";
      setTimeout(() => (el.style.transition = ""), 500);
    });
  });
})();

/* ==========================================================
   CANVAS: utilidades
   ========================================================== */
function fitCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const r = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, r.width * dpr);
  canvas.height = Math.max(1, r.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: r.width, h: r.height };
}

/* Pausa los canvas fuera de pantalla */
function runWhenVisible(canvas, loop) {
  let running = false;
  let rafId = null;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      running = e.isIntersecting;
      if (running && rafId === null) {
        const step = (t) => {
          if (!running) { rafId = null; return; }
          loop(t);
          rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
      }
    });
  });
  obs.observe(canvas);
}

/* ============ ESCENA INTRO: CORREDOR DE DATOS ============
   Un solo plano continuo, sin cortes: un corredor tecnológico
   (piso de grilla, compuertas de interfaz, pulsos de datos) que
   avanza solo —como un video— y se acelera con el scroll hasta
   llegar al núcleo. Nada de estrellas: esto es un circuito.     */
(function introScene() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas || prefersReducedMotion) return;

  let { ctx, w, h } = fitCanvas(canvas);
  window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));

  const FOV = 460;
  const NEAR = 60, FAR = 2300;
  const SPACING = 420;            // separación entre compuertas (más espaciadas = menos saturado)
  const GATES = 14;
  const LOOP = SPACING * GATES;   // el corredor es un bucle infinito
  const TRAVEL = 9500;            // distancia recorrida con el scroll
  const GROUND = 235;             // altura del piso (coord. de mundo)
  const CEIL = -320;              // techo tenue
  const LANE_W = 195;             // ancho de carril del piso
  const GATE_W = 600, GATE_H = 400;

  const mouse = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  });

  // pulsos de luz que recorren los carriles del piso (tráfico de datos)
  const pulses = Array.from({ length: 14 }, () => ({
    x: (Math.floor(Math.random() * 7) - 3) * LANE_W,
    z: Math.random() * LOOP,
    speed: 4 + Math.random() * 9,
    hot: Math.random() < 0.45,
  }));

  // fragmentos de datos flotando a media altura
  const streams = Array.from({ length: 30 }, () => ({
    x: (Math.random() - 0.5) * 2400,
    y: CEIL * 0.7 + Math.random() * (GROUND * 0.7 - CEIL * 0.7),
    z: Math.random() * LOOP,
  }));

  function fadeOf(rel) {
    const near = Math.min(1, Math.max(0, (rel - NEAR) / 200));
    const far = Math.min(1, Math.max(0, (FAR - rel) / 700));
    return near * far;
  }

  let time = 0;
  runWhenVisible(canvas, () => {
    time += 1;
    const p = scrollState.introP;
    // la cámara siempre avanza un poco (video vivo) y el scroll la lanza
    const camZ = p * TRAVEL + time * 1.4;
    ctx.clearRect(0, 0, w, h);

    // punto de fuga con parallax de mouse y leve balanceo de vuelo
    const cx = w / 2 + mouse.x * 46 + Math.sin(p * 8) * w * 0.012;
    const cy = h / 2 + mouse.y * 30 + Math.cos(p * 6) * h * 0.01;

    // en reposo el corredor es sutil; gana intensidad al sumergirte
    const boost = 0.28 + 0.72 * Math.min(1, p * 3.5);

    // —— piso: líneas longitudinales que convergen al punto de fuga
    const sNear = FOV / 150, sFar = FOV / FAR;
    for (let k = -3; k <= 3; k++) {
      const X = k * LANE_W;
      ctx.strokeStyle = `rgba(${themeColors.neutral}, ${0.11 * boost})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + X * sNear, cy + GROUND * sNear);
      ctx.lineTo(cx + X * sFar, cy + GROUND * sFar);
      ctx.stroke();
      // techo espejado, más tenue
      ctx.strokeStyle = `rgba(${themeColors.neutral}, ${0.05 * boost})`;
      ctx.beginPath();
      ctx.moveTo(cx + X * sNear, cy + CEIL * sNear);
      ctx.lineTo(cx + X * sFar, cy + CEIL * sFar);
      ctx.stroke();
    }

    // —— piso: líneas transversales que fluyen hacia ti (sensación de avance)
    const STEP = 170;
    const firstZ = Math.ceil((camZ + NEAR) / STEP) * STEP;
    for (let z = firstZ; z < camZ + FAR; z += STEP) {
      const rel = z - camZ;
      const s = FOV / rel;
      const a = fadeOf(rel) * 0.15 * boost;
      const y = cy + GROUND * s;
      ctx.strokeStyle = `rgba(${themeColors.neutral}, ${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 3 * LANE_W * s, y);
      ctx.lineTo(cx + 3 * LANE_W * s, y);
      ctx.stroke();
    }

    // —— compuertas de interfaz (bucle infinito, nunca se acaban)
    for (let i = 0; i < GATES; i++) {
      const rel = (((i * SPACING - camZ) % LOOP) + LOOP) % LOOP;
      if (rel < NEAR || rel > FAR) continue;
      const s = FOV / rel;
      const a = fadeOf(rel) * boost;
      if (a <= 0.01) continue;
      const gw = GATE_W * s, gh = GATE_H * s;
      const kind = i % 3;
      const color =
        kind === 0 ? `rgba(238, 118, 35, ${a * 0.85})` :
        kind === 1 ? `rgba(${themeColors.neutral}, ${a * 0.3})` :
                     `rgba(242, 179, 45, ${a * 0.6})`;

      // marco completo, muy tenue
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, (m) => parseFloat(m) * 0.35 + ")");
      ctx.lineWidth = Math.min(2, Math.max(0.5, s * 1.1));
      ctx.strokeRect(cx - gw, cy - gh, gw * 2, gh * 2);

      // esquinas en L (lenguaje de interfaz/HUD)
      const L = Math.min(gw, gh) * 0.3;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.min(3.5, Math.max(0.8, s * 2.2));
      ctx.beginPath();
      // sup-izq
      ctx.moveTo(cx - gw + L, cy - gh); ctx.lineTo(cx - gw, cy - gh); ctx.lineTo(cx - gw, cy - gh + L);
      // sup-der
      ctx.moveTo(cx + gw - L, cy - gh); ctx.lineTo(cx + gw, cy - gh); ctx.lineTo(cx + gw, cy - gh + L);
      // inf-izq
      ctx.moveTo(cx - gw + L, cy + gh); ctx.lineTo(cx - gw, cy + gh); ctx.lineTo(cx - gw, cy + gh - L);
      // inf-der
      ctx.moveTo(cx + gw - L, cy + gh); ctx.lineTo(cx + gw, cy + gh); ctx.lineTo(cx + gw, cy + gh - L);
      ctx.stroke();

      // balizas rojas en compuertas naranjas
      if (kind === 0) {
        ctx.fillStyle = `rgba(216, 57, 51, ${a * 0.9})`;
        const b = Math.max(2, s * 4);
        ctx.fillRect(cx - b / 2, cy - gh - b / 2, b, b);
        ctx.fillRect(cx - b / 2, cy + gh - b / 2, b, b);
      }
    }

    // —— pulsos de datos corriendo por los carriles del piso
    for (const d of pulses) {
      d.z = (d.z + d.speed) % LOOP;
      const rel = (((d.z - camZ) % LOOP) + LOOP) % LOOP;
      if (rel < NEAR || rel > FAR * 0.8) continue;
      const s = FOV / rel;
      const x = cx + d.x * s;
      const y = cy + GROUND * s;
      const r = Math.min(5, 1 + s * 1.6);
      const a = fadeOf(rel) * boost;
      ctx.fillStyle = d.hot
        ? `rgba(238, 118, 35, ${a * 0.95})`
        : `rgba(242, 179, 45, ${a * 0.8})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      // estela del pulso sobre el carril
      ctx.strokeStyle = d.hot
        ? `rgba(238, 118, 35, ${a * 0.4})`
        : `rgba(242, 179, 45, ${a * 0.3})`;
      ctx.lineWidth = Math.max(1, r * 0.5);
      const s2 = FOV / Math.min(FAR, rel + 130);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(cx + d.x * s2, cy + GROUND * s2);
      ctx.stroke();
    }

    // —— fragmentos de datos pasando junto a la cámara
    for (const d of streams) {
      const rel = (((d.z - camZ) % LOOP) + LOOP) % LOOP;
      if (rel < NEAR || rel > 1700) continue;
      const s1 = FOV / rel;
      const s2 = FOV / Math.max(rel - 50, 30);
      const a = fadeOf(rel) * 0.3 * boost;
      ctx.strokeStyle = `rgba(${themeColors.neutral}, ${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + d.x * s1, cy + d.y * s1);
      ctx.lineTo(cx + d.x * s2, cy + d.y * s2);
      ctx.stroke();
    }

    // —— núcleo: al final del descenso la luz te recibe
    if (p > 0.78) {
      const k = Math.min(1, (p - 0.78) / 0.22);
      const R = Math.max(20, k * Math.max(w, h) * 0.75);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, `rgba(242, 179, 45, ${0.85 * k})`);
      grad.addColorStop(0.4, `rgba(238, 118, 35, ${0.45 * k})`);
      grad.addColorStop(1, "rgba(238, 118, 35, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
    }
  });
})();

/* ============ VISUALES DE PROYECTO ============ */
(function projectVisuals() {
  if (prefersReducedMotion) return;

  /* --- RADAR (minería / IA) --- */
  function radar(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));
    const blips = Array.from({ length: 7 }, () => ({
      ang: Math.random() * Math.PI * 2,
      dist: 0.2 + Math.random() * 0.7,
      alert: Math.random() < 0.35,
    }));
    let sweep = 0;
    runWhenVisible(canvas, () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.42;

      ctx.strokeStyle = `rgba(${themeColors.neutral}, 0.18)`;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
      ctx.stroke();

      // barrido
      sweep += 0.02;
      const grad = ctx.createConicGradient ? ctx.createConicGradient(sweep, cx, cy) : null;
      if (grad) {
        grad.addColorStop(0, "rgba(238, 118, 35, 0.5)");
        grad.addColorStop(0.12, "rgba(238, 118, 35, 0)");
        grad.addColorStop(1, "rgba(238, 118, 35, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = "rgba(238, 118, 35, 0.8)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R);
        ctx.stroke();
      }

      for (const b of blips) {
        const bx = cx + Math.cos(b.ang) * R * b.dist;
        const by = cy + Math.sin(b.ang) * R * b.dist;
        const diff = ((sweep - b.ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const glow = Math.max(0, 1 - diff / 1.4);
        ctx.fillStyle = b.alert
          ? `rgba(216, 57, 51, ${0.35 + glow * 0.65})`
          : `rgba(242, 179, 45, ${0.3 + glow * 0.6})`;
        ctx.beginPath();
        ctx.arc(bx, by, 3 + glow * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  /* --- MONITOR DE SIGNOS VITALES (veterinaria): ECG + SpO₂ + BPM --- */
  function pulse(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));
    let t = 0;
    let bpm = 78;
    const period = 220;
    function ecg(x) {
      const p = ((x % period) + period) % period;
      if (p < 18) return -Math.sin((p / 18) * Math.PI) * 8;
      if (p < 30) return Math.sin(((p - 18) / 12) * Math.PI) * 56;
      if (p < 44) return -Math.sin(((p - 30) / 14) * Math.PI) * 22;
      if (p < 90) return Math.sin(((p - 44) / 46) * Math.PI) * 10;
      return 0;
    }
    function pleth(x) { // onda de pulso suave (oxímetro) con muesca dícrota
      const u = (((x % period) + period) % period) / period;
      return -(Math.exp(-Math.pow((u - 0.2) / 0.12, 2)) + Math.exp(-Math.pow((u - 0.46) / 0.18, 2)) * 0.45) * 40;
    }
    runWhenVisible(canvas, () => {
      ctx.clearRect(0, 0, w, h);
      const lane1 = h * 0.34, lane2 = h * 0.72;

      // cuadrícula de monitor
      ctx.strokeStyle = `rgba(${themeColors.neutral}, 0.06)`;
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 26) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
      for (let gy = 0; gy < h; gy += 26) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

      t += 2.4;

      // traza ECG (amarilla)
      ctx.lineWidth = 2; ctx.strokeStyle = "#f2b32d";
      ctx.shadowColor = "rgba(242, 179, 45, 0.7)"; ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) { const y = lane1 + ecg(x + t); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke();
      // traza SpO₂ (naranja)
      ctx.strokeStyle = "#ee7623"; ctx.shadowColor = "rgba(238, 118, 35, 0.6)";
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) { const y = lane2 + pleth(x + t * 0.85); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // puntos líderes
      const hx = w * 0.82;
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(hx, lane1 + ecg(hx + t), 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffd9a0"; ctx.beginPath(); ctx.arc(hx, lane2 + pleth(hx + t * 0.85), 3, 0, Math.PI * 2); ctx.fill();

      // etiquetas de traza (a la izquierda, fuera del texto del proyecto)
      ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
      ctx.font = `${Math.max(9, h * 0.04)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = "rgba(242, 179, 45, 0.8)"; ctx.fillText("ECG", 12, lane1 - h * 0.18);
      ctx.fillStyle = "rgba(238, 118, 35, 0.8)"; ctx.fillText("SpO₂", 12, lane2 - h * 0.16);

      // indicador REC parpadeante
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillStyle = Math.floor(t / 55) % 2 === 0 ? "rgba(216,57,51,0.95)" : "rgba(216,57,51,0.25)";
      ctx.beginPath(); ctx.arc(16, 16, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(${themeColors.neutral}, 0.6)`;
      ctx.font = `${Math.max(8, h * 0.038)}px "JetBrains Mono", monospace`;
      ctx.fillText("REC", 26, 16);
    });
  }

  /* --- OLAS / dunas (hotelería) --- */
  function wave(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));
    let t = 0;
    const layers = [
      { amp: 18, speed: 0.012, yOff: 0.45, color: "rgba(216, 57, 51, 0.55)" },
      { amp: 26, speed: 0.017, yOff: 0.58, color: "rgba(238, 118, 35, 0.55)" },
      { amp: 34, speed: 0.023, yOff: 0.72, color: "rgba(242, 179, 45, 0.55)" },
    ];
    runWhenVisible(canvas, () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;

      // sol-circuito
      const sx = w * 0.72, sy = h * 0.3, sr = Math.min(w, h) * 0.13;
      ctx.strokeStyle = "rgba(242, 179, 45, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * 0.004;
        ctx.beginPath();
        ctx.moveTo(sx + Math.cos(a) * (sr + 6), sy + Math.sin(a) * (sr + 6));
        ctx.lineTo(sx + Math.cos(a) * (sr + 16), sy + Math.sin(a) * (sr + 16));
        ctx.stroke();
      }

      for (const L of layers) {
        ctx.fillStyle = L.color;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 4) {
          const y =
            h * L.yOff +
            Math.sin(x * 0.012 + t * L.speed * 4) * L.amp +
            Math.sin(x * 0.027 + t * L.speed * 7) * (L.amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  /* --- GRID / calendario (Redland School) --- */
  function grid(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));
    const COLS = 7, ROWS = 5;
    // cada celda se " enciende" en orden, como agenda que se va llenando
    const cells = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        cells.push({ r, c, on: Math.random() < 0.4, hot: Math.random() < 0.18 });
    let t = 0;
    runWhenVisible(canvas, () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      const pad = Math.min(w, h) * 0.1;
      const gw = (w - pad * 2) / COLS;
      const gh = (h - pad * 2) / ROWS;
      const cell = Math.min(gw, gh);
      const ox = (w - cell * COLS) / 2;
      const oy = (h - cell * ROWS) / 2;
      // barra superior (encabezado de días)
      ctx.fillStyle = "rgba(238, 118, 35, 0.85)";
      ctx.fillRect(ox, oy - cell * 0.5, cell * COLS, cell * 0.32);
      for (const cl of cells) {
        // parpadeo periódico de celdas para sensación de actividad
        if (Math.random() < 0.004) cl.on = !cl.on;
        const x = ox + cl.c * cell;
        const y = oy + cl.r * cell;
        const m = cell * 0.08;
        ctx.strokeStyle = `rgba(${themeColors.neutral}, 0.12)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + m, y + m, cell - m * 2, cell - m * 2);
        if (cl.on) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.05 + cl.r + cl.c);
          ctx.fillStyle = cl.hot
            ? `rgba(216, 57, 51, ${0.35 + pulse * 0.4})`
            : `rgba(242, 179, 45, ${0.3 + pulse * 0.35})`;
          ctx.fillRect(x + m * 2, y + cell * 0.5, cell - m * 4, cell * 0.16);
        }
      }
    });
  }

  /* --- NODES / red de conexiones (Dentistation) --- */
  function nodes(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));
    const N = 11;
    const pts = Array.from({ length: N }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0014,
      vy: (Math.random() - 0.5) * 0.0014,
      hub: i < 2, // dos hubs (estudiante / paciente)
    }));
    runWhenVisible(canvas, () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0.06 || p.x > 0.94) p.vx *= -1;
        if (p.y < 0.06 || p.y > 0.94) p.vy *= -1;
      }
      // conexiones de cada nodo al hub más cercano
      for (const p of pts) {
        if (p.hub) continue;
        let best = pts[0], bd = Infinity;
        for (const hb of pts) {
          if (!hb.hub) continue;
          const d = (hb.x - p.x) ** 2 + (hb.y - p.y) ** 2;
          if (d < bd) { bd = d; best = hb; }
        }
        ctx.strokeStyle = "rgba(238, 118, 35, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x * w, p.y * h);
        ctx.lineTo(best.x * w, best.y * h);
        ctx.stroke();
      }
      // nodos
      for (const p of pts) {
        const x = p.x * w, y = p.y * h;
        if (p.hub) {
          ctx.fillStyle = "rgba(242, 179, 45, 0.95)";
          ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "rgba(242, 179, 45, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${themeColors.neutral}, 0.8)`;
          ctx.beginPath(); ctx.arc(x, y, 3.2, 0, Math.PI * 2); ctx.fill();
        }
      }
    });
  }

  /* --- PARRILLAS DEL GANCHO: remolino de brasas ascendente --- */
  function embers(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));

    let parts = [];
    function spawn(init) {
      const m = {
        x: 0.5 + (Math.random() - 0.5) * 0.5,   // arrancan agrupadas al centro-base
        y: 1.02 + Math.random() * 0.1,
        vy: 0.0016 + Math.random() * 0.0022,
        ph: Math.random() * Math.PI * 2,
        amp: 0.04 + Math.random() * 0.1,         // amplitud del giro
        freq: 0.6 + Math.random() * 1.2,
        r: Math.random() * 2.4 + 0.7,
        life: 0,
        max: 220 + Math.random() * 180,
      };
      if (init) { m.y = Math.random(); m.life = Math.random() * m.max; }
      return m;
    }
    parts = Array.from({ length: 120 }, () => spawn(true));
    let rings = [];
    let ringT = 0;
    let t = 0;

    runWhenVisible(canvas, () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // núcleo de calor en la base
      const core = ctx.createRadialGradient(w / 2, h, 6, w / 2, h, h * 0.85);
      core.addColorStop(0, `rgba(238, 118, 35, ${0.30 + 0.06 * Math.sin(t * 3)})`);
      core.addColorStop(0.35, "rgba(216, 57, 51, 0.14)");
      core.addColorStop(1, "rgba(216, 57, 51, 0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      // anillos de calor que se expanden desde la base
      ringT++;
      if (ringT > 80) { ringT = 0; rings.push({ r: 0 }); }
      rings = rings.filter((rg) => rg.r < Math.max(w, h));
      for (const rg of rings) {
        rg.r += Math.max(w, h) * 0.004;
        const a = Math.max(0, 1 - rg.r / Math.max(w, h)) * 0.18;
        ctx.strokeStyle = `rgba(238, 118, 35, ${a})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(w / 2, h, rg.r, Math.PI, Math.PI * 2); ctx.stroke();
      }

      // brasas que ascienden girando (remolino)
      for (const p of parts) {
        p.life++;
        p.y -= p.vy;
        if (p.life > p.max || p.y < -0.05) Object.assign(p, spawn(false));
        const rise = 1 - p.y;                       // 0 base → 1 arriba
        const swirl = Math.sin(t * p.freq + p.ph) * p.amp * rise;
        const px = (p.x + swirl) * w;
        const py = p.y * h;
        const k = 1 - p.life / p.max;
        // de blanco-cálido a naranja a rojo a medida que sube y se enfría
        const col = rise < 0.3 ? "230, 120, 40" : rise < 0.6 ? "238, 118, 35" : rise < 0.82 ? "216, 57, 51" : "168, 38, 50";
        const rad = p.r * (0.5 + k * 0.7);
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad * 3);
        g.addColorStop(0, `rgba(${col}, ${k * 0.95})`);
        g.addColorStop(1, `rgba(${col}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, rad * 3, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  /* --- DENTISTATION: red de emparejamiento estudiantes ↔ plataforma ↔ pacientes --- */
  /* --- DENTISTATION: red neuronal que dispara y propaga señales --- */
  function dental(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    let nodes = [], edges = [], signals = [];
    function build() {
      ({ ctx, w, h } = fitCanvas(canvas));
      const COUNT = Math.max(16, Math.min(28, Math.floor((w * h) / 14000)));
      nodes = Array.from({ length: COUNT }, () => ({
        x: 0.08 + Math.random() * 0.84,
        y: 0.1 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        act: 0,
        hub: Math.random() < 0.22,
      }));
      // sinapsis: cada neurona se enlaza a sus 2-3 vecinas más cercanas
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const near = nodes
          .map((n, j) => ({ j, d: (n.x - nodes[i].x) ** 2 + (n.y - nodes[i].y) ** 2 }))
          .filter((o) => o.j !== i).sort((a, b) => a.d - b.d);
        const k = nodes[i].hub ? 3 : 2;
        for (let m = 0; m < k && m < near.length; m++) {
          const j = near[m].j;
          if (!edges.some((e) => (e.a === i && e.b === j) || (e.a === j && e.b === i))) edges.push({ a: i, b: j });
        }
      }
      signals = [];
    }
    build();
    window.addEventListener("resize", build);

    let fireT = 0;
    runWhenVisible(canvas, () => {
      ctx.clearRect(0, 0, w, h);

      // deriva suave + decaimiento de activación
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy; n.act *= 0.94;
        if (n.x < 0.06 || n.x > 0.94) n.vx *= -1;
        if (n.y < 0.08 || n.y > 0.92) n.vy *= -1;
      }

      // sinapsis (brillan cuando sus neuronas están activas)
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        const act = Math.max(a.act, b.act);
        ctx.strokeStyle = `rgba(238, 118, 35, ${0.05 + act * 0.5})`;
        ctx.lineWidth = 0.6 + act * 1.6;
        ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke();
      }

      // disparo periódico desde una neurona al azar
      fireT++;
      if (fireT > 24) {
        fireT = 0;
        const i = (Math.random() * nodes.length) | 0;
        nodes[i].act = 1;
        edges.filter((e) => e.a === i || e.b === i).forEach((e) => {
          if (Math.random() < 0.7) signals.push({ a: i, b: e.a === i ? e.b : e.a, p: 0, sp: 0.02 + Math.random() * 0.022 });
        });
      }

      // avanzar señales y propagar al llegar (con tope para no saturar)
      for (const s of signals) {
        s.p += s.sp;
        if (s.p >= 1 && !s.done) {
          s.done = true;
          nodes[s.b].act = 1;
          if (signals.length < 30 && Math.random() < 0.5) {
            const nb = edges.filter((e) => e.a === s.b || e.b === s.b);
            if (nb.length) {
              const e = nb[(Math.random() * nb.length) | 0];
              signals.push({ a: s.b, b: e.a === s.b ? e.b : e.a, p: 0, sp: 0.02 + Math.random() * 0.022 });
            }
          }
        }
      }
      signals = signals.filter((s) => !s.done);

      // señales viajando por los axones
      for (const s of signals) {
        const a = nodes[s.a], b = nodes[s.b];
        const x = (a.x + (b.x - a.x) * s.p) * w, y = (a.y + (b.y - a.y) * s.p) * h;
        ctx.fillStyle = "rgba(242, 179, 45, 0.95)";
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(242, 179, 45, 0.22)";
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      }

      // neuronas (con halo si están activas)
      for (const n of nodes) {
        const x = n.x * w, y = n.y * h;
        const r = (n.hub ? 4 : 2.4) + n.act * 2.5;
        if (n.act > 0.05) {
          ctx.fillStyle = `rgba(238, 118, 35, ${n.act * 0.25})`;
          ctx.beginPath(); ctx.arc(x, y, r + 7, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = n.act > 0.3
          ? "rgba(242, 179, 45, 0.95)"
          : n.hub ? `rgba(${themeColors.neutral}, 0.82)` : `rgba(${themeColors.neutral}, 0.5)`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  /* --- VOICE / onda de voz (IA Asistente) --- */
  function voice(canvas) {
    let { ctx, w, h } = fitCanvas(canvas);
    window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));
    const BARS = 48;
    const phase = Array.from({ length: BARS }, () => Math.random() * Math.PI * 2);
    let t = 0;
    runWhenVisible(canvas, () => {
      t += 0.06;
      ctx.clearRect(0, 0, w, h);
      const midY = h / 2;
      const bw = w / BARS;
      // anillo central tenue (núcleo del asistente)
      ctx.strokeStyle = "rgba(242, 179, 45, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(w / 2, midY, Math.min(w, h) * 0.34, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < BARS; i++) {
        // envolvente: más alto al centro, como una voz hablando
        const env = Math.sin((i / BARS) * Math.PI);
        const amp = (0.2 + 0.8 * Math.abs(Math.sin(t * 1.4 + phase[i]))) * env;
        const bh = amp * h * 0.42;
        const x = i * bw + bw / 2;
        const hot = i % 6 === 0;
        ctx.strokeStyle = hot
          ? `rgba(238, 118, 35, ${0.5 + amp * 0.5})`
          : `rgba(242, 179, 45, ${0.35 + amp * 0.45})`;
        ctx.lineWidth = Math.max(1.5, bw * 0.4);
        ctx.beginPath();
        ctx.moveTo(x, midY - bh);
        ctx.lineTo(x, midY + bh);
        ctx.stroke();
      }
    });
  }

  const builders = { radar, pulse, wave, grid, nodes, dental, embers, voice };
  document.querySelectorAll("[data-viz]").forEach((c) => {
    const fn = builders[c.dataset.viz];
    if (fn) fn(c);
  });
})();

/* ============ SISTEMA SOLAR CALFERS (canvas 3D · scroll-dive) ============
   Proyección de perspectiva real: esferas sombreadas por el sol, profundidad
   con orden de pintado, órbitas elípticas, dive con scroll hacia el núcleo,
   arrastre para girar y clic en un planeta para ver su ficha y proyectos. */
(function solarSystem() {
  if (prefersReducedMotion) return;
  const section = document.getElementById("solar");
  const canvas = document.getElementById("solarCanvas");
  if (!section || !canvas) return;
  const panel = document.getElementById("solarPanel");
  const pName = document.getElementById("solarPanelName");
  const pDesc = document.getElementById("solarPanelDesc");
  const pProj = document.getElementById("solarPanelProj");
  const pX = document.getElementById("solarPanelX");
  const hint = section.querySelector(".solar__hint");

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeIO = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

  // ficha: definición + proyectos donde se usó
  const INFO = {
    CALFERS: { es: { d: "El núcleo: la marca bajo la que diseño y construyo cada sistema, de la idea al despliegue.", p: "Todos los proyectos" }, en: { d: "The core: the brand under which I design and build every system, from idea to deployment.", p: "All projects" } },
    React: { es: { d: "Librería para construir interfaces rápidas y reactivas; la base de mi frontend.", p: "Veterinaria Calfers · Redland · Dentistation · Parrillas" }, en: { d: "Library for fast, reactive interfaces; the base of my frontend.", p: "Calfers Vet · Redland · Dentistation · Parrillas" } },
    FastAPI: { es: { d: "Framework de Python para APIs veloces y robustas; mi base de backend.", p: "Veterinaria Calfers" }, en: { d: "Python framework for fast, robust APIs; my backend foundation.", p: "Calfers Vet" } },
    Python: { es: { d: "Lenguaje principal de mi backend y mis exploraciones con IA.", p: "Veterinaria · Asistente IA · Detección de fatiga" }, en: { d: "Main language of my backend and AI explorations.", p: "Vet · AI Assistant · Fatigue detection" } },
    JavaScript: { es: { d: "El lenguaje de la web; en todo el frontend y la lógica de cliente.", p: "Todos los proyectos web" }, en: { d: "The language of the web; across all frontend and client logic.", p: "All web projects" } },
    MongoDB: { es: { d: "Base de datos NoSQL flexible; mi opción para datos escalables.", p: "Veterinaria Calfers" }, en: { d: "Flexible NoSQL database; my pick for scalable data.", p: "Calfers Vet" } },
    PostgreSQL: { es: { d: "Base de datos relacional para datos estructurados y consultas complejas.", p: "Sistemas con datos relacionales" }, en: { d: "Relational database for structured data and complex queries.", p: "Systems with relational data" } },
    Tailwind: { es: { d: "Framework CSS utilitario para diseñar rápido y consistente.", p: "Veterinaria Calfers · sitios web" }, en: { d: "Utility-first CSS framework to design fast and consistently.", p: "Calfers Vet · websites" } },
    Git: { es: { d: "Control de versiones; gestiono el código y el flujo con Git/GitHub.", p: "Todos los proyectos" }, en: { d: "Version control; I manage code and workflow with Git/GitHub.", p: "All projects" } },
    "REST APIs": { es: { d: "Diseño e implemento APIs REST para conectar frontend y backend.", p: "Veterinaria · Redland School" }, en: { d: "I design and implement REST APIs to connect frontend and backend.", p: "Vet · Redland School" } },
    JWT: { es: { d: "Autenticación con tokens para proteger sesiones y rutas.", p: "Sistemas de gestión" }, en: { d: "Token-based auth to protect sessions and routes.", p: "Management systems" } },
    Render: { es: { d: "Plataforma cloud donde despliego backends y servicios.", p: "Despliegue · Redland School" }, en: { d: "Cloud platform where I deploy backends and services.", p: "Deploy · Redland School" } },
    Vercel: { es: { d: "Hosting optimizado para frontend con despliegue continuo.", p: "Despliegue de frontends" }, en: { d: "Frontend-optimized hosting with continuous deployment.", p: "Frontend deploys" } },
    Hostinger: { es: { d: "Hosting y VPS donde publico sitios y sistemas en producción.", p: "Sitios en producción" }, en: { d: "Hosting and VPS where I publish sites and systems in production.", p: "Production sites" } },
  };

  const TIER = { 1: { rf: 0.16, pr: 0.025, speed: 0.34 }, 2: { rf: 0.27, pr: 0.021, speed: 0.20 }, 3: { rf: 0.38, pr: 0.017, speed: 0.12 } };
  const COL = {
    React: ["#bff0ff", "#39bce3", "#0c4256"], FastAPI: ["#b6f2d8", "#1fae7e", "#0a4632"], Python: ["#ffe7a6", "#f2b32d", "#7a5410"],
    JavaScript: ["#ffec9e", "#e6c01f", "#6e5a0e"], MongoDB: ["#c4f0b6", "#54b948", "#1d5417"], PostgreSQL: ["#c3d6ff", "#4f7fd6", "#1b3360"],
    Tailwind: ["#b6e8ff", "#38bdf8", "#0c4a6e"], Git: ["#ffcaa8", "#f0682f", "#7a2e10"], "REST APIs": ["#e3ccff", "#9a6ad6", "#3d2660"],
    JWT: ["#ffd0e6", "#e56aa0", "#5e2440"], Render: ["#cdd9ff", "#6b8cff", "#27376e"], Vercel: ["#eceef4", "#c2c6d2", "#5a5d68"], Hostinger: ["#cdbcff", "#8a6bff", "#33246e"],
  };
  // logos de tecnologías (simple-icons, teñidos en ámbar = paleta sobria de la página)
  const SLUG = { React: "react", FastAPI: "fastapi", Python: "python", JavaScript: "javascript", MongoDB: "mongodb", PostgreSQL: "postgresql", Tailwind: "tailwindcss", Git: "git", JWT: "jsonwebtokens", Render: "render", Vercel: "vercel", Hostinger: "hostinger" };
  const imgs = {};
  Object.keys(SLUG).forEach((nm) => { const im = new Image(); im.onload = () => { imgs[nm] = im; }; im.src = `https://cdn.simpleicons.org/${SLUG[nm]}/f2b32d`; });
  const defs = [
    { n: "React", t: 1 }, { n: "FastAPI", t: 1 }, { n: "Python", t: 1 },
    { n: "JavaScript", t: 2 }, { n: "MongoDB", t: 2 }, { n: "PostgreSQL", t: 2 }, { n: "Tailwind", t: 2 },
    { n: "Git", t: 3 }, { n: "REST APIs", t: 3 }, { n: "JWT", t: 3 }, { n: "Render", t: 3 }, { n: "Vercel", t: 3 }, { n: "Hostinger", t: 3 },
  ];
  const groups = { 1: [], 2: [], 3: [] };
  defs.forEach((d) => groups[d.t].push(d));
  const planets = [];
  Object.keys(groups).forEach((tr) => {
    const a = groups[tr], n = a.length;
    a.forEach((d, i) => planets.push({ name: d.n, tier: +tr, ang: (i / n) * Math.PI * 2 }));
  });

  let { ctx, w, h } = fitCanvas(canvas);
  window.addEventListener("resize", () => ({ ctx, w, h } = fitCanvas(canvas)));

  let spin = 0.4, tilt = 1.0, autoSpin = true;
  let dragging = false, lastX = 0, lastY = 0, moved = 0;
  let t = 0, dive = 0, selected = null, sunT = 0;
  let proj = [], sunR = 0;
  // foco/zoom hacia el cuerpo seleccionado (viaje de cámara)
  const look = { x: 0, y: 0, z: 0 }, focusTarget = { x: 0, y: 0, z: 0 };
  let focusing = false, focusP = 0;

  canvas.addEventListener("pointerdown", (e) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    if (!focusing) { spin += dx * 0.006; tilt = clamp(tilt + dy * 0.004, 0.25, 1.45); }
  });
  window.addEventListener("pointerup", (e) => { if (dragging && moved < 6) pick(e); dragging = false; });

  function pick(e) {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    let best = null, bd = 1e9;
    for (const o of proj) { const d = Math.hypot(o.sx - mx, o.sy - my); if (d < o.sr + 18 && d < bd) { bd = d; best = o; } }
    if (best) selectBody(best.name); else closePanel();
  }
  function selectBody(name) {
    selected = name; focusing = true; autoSpin = false;
    if (name === "CALFERS") { focusTarget.x = focusTarget.y = focusTarget.z = 0; }
    else {
      const p = planets.find((pp) => pp.name === name);
      const R = Math.min(w, h) * TIER[p.tier].rf, th = p.ang + t * TIER[p.tier].speed;
      focusTarget.x = Math.cos(th) * R; focusTarget.y = 0; focusTarget.z = Math.sin(th) * R;
    }
    openPanel(name);
  }
  function openPanel(name) {
    const d = INFO[name]; if (!d || !panel) return;
    const L = d[currentLang] || d.es;
    if (pName) pName.textContent = name;
    if (pDesc) pDesc.textContent = L.d;
    if (pProj) pProj.textContent = L.p;
    panel.hidden = false;
  }
  function closePanel() { if (panel) panel.hidden = true; selected = null; focusing = false; autoSpin = true; }
  if (pX) pX.addEventListener("click", (e) => { e.stopPropagation(); closePanel(); });

  function project(wx, wy, wz, U, D, f, cx, cy) {
    wx -= look.x; wy -= look.y; wz -= look.z;
    const cs = Math.cos(spin), ss = Math.sin(spin), ct = Math.cos(tilt), st = Math.sin(tilt);
    const x = wx * cs + wz * ss, z = -wx * ss + wz * cs, y = wy;
    const y2 = y * ct - z * st, z2 = y * st + z * ct;
    const depth = D - z2;
    if (depth <= U * 0.05) return null;
    const scale = f / depth;
    return { sx: cx + x * scale, sy: cy - y2 * scale, scale, z2 };
  }

  runWhenVisible(canvas, () => {
    const rect = section.getBoundingClientRect();
    const denom = rect.height - window.innerHeight;
    dive = denom > 0 ? clamp(-rect.top / denom, 0, 1) : 0;
    sunT += 0.03; // la estrella titila siempre (aunque esté enfocado)
    // viaje de zoom al seleccionado (easing suave del foco)
    focusP += ((focusing ? 1 : 0) - focusP) * 0.08;
    const fe = easeIO(clamp(focusP, 0, 1));
    if (focusP < 0.02) { if (autoSpin && !dragging) spin += 0.0015; t += 0.006; }

    const U = Math.min(w, h), cx = w / 2, cy = h * 0.5;
    const f = U * 1.05;
    const scrollD = U * (0.96 - 0.66 * easeIO(dive));   // scroll: lejos → cerca del núcleo
    const D = scrollD * (1 - fe) + U * 0.30 * fe;        // foco: acercarse al cuerpo
    look.x = focusTarget.x * fe; look.y = focusTarget.y * fe; look.z = focusTarget.z * fe;

    ctx.clearRect(0, 0, w, h);

    // órbitas (se desvanecen al sumergirte o enfocar)
    const ringA = (1 - dive) * (1 - fe) * 0.5;
    if (ringA > 0.02) {
      for (const tr of [1, 2, 3]) {
        const R = U * TIER[tr].rf;
        ctx.strokeStyle = `rgba(242, 179, 45, ${ringA * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= 72; a++) {
          const th = (a / 72) * Math.PI * 2;
          const pr = project(Math.cos(th) * R, 0, Math.sin(th) * R, U, D, f, cx, cy);
          if (!pr) { started = false; continue; }
          if (!started) { ctx.moveTo(pr.sx, pr.sy); started = true; } else ctx.lineTo(pr.sx, pr.sy);
        }
        ctx.stroke();
      }
    }

    // recopilar cuerpos y ordenar por profundidad (painter's algorithm)
    proj = [];
    const bodies = [];
    for (const p of planets) {
      const R = U * TIER[p.tier].rf, th = p.ang + t * TIER[p.tier].speed;
      const pr = project(Math.cos(th) * R, 0, Math.sin(th) * R, U, D, f, cx, cy);
      if (!pr) continue;
      bodies.push({ kind: "planet", name: p.name, sx: pr.sx, sy: pr.sy, sr: U * TIER[p.tier].pr * pr.scale, z2: pr.z2, col: COL[p.name] });
    }
    const sp = project(0, 0, 0, U, D, f, cx, cy);
    if (sp) { sunR = U * 0.058 * sp.scale; bodies.push({ kind: "sun", name: "CALFERS", sx: sp.sx, sy: sp.sy, sr: sunR, z2: sp.z2 }); }
    bodies.sort((a, b) => a.z2 - b.z2);

    for (const b of bodies) {
      if (b.kind === "sun") {
        const R = b.sr;
        // resplandor exterior pulsante
        const pulse = 0.85 + Math.sin(sunT * 1.6) * 0.15;
        const g = ctx.createRadialGradient(b.sx, b.sy, 0, b.sx, b.sy, R * 3.8 * pulse);
        g.addColorStop(0, "rgba(255, 200, 120, 0.5)");
        g.addColorStop(0.3, "rgba(238, 118, 35, 0.26)");
        g.addColorStop(1, "rgba(238, 118, 35, 0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.sx, b.sy, R * 3.8 * pulse, 0, Math.PI * 2); ctx.fill();
        // halo interior suave (sin rayos) para un look limpio
        const halo = ctx.createRadialGradient(b.sx, b.sy, R * 0.9, b.sx, b.sy, R * 1.5);
        halo.addColorStop(0, "rgba(255, 200, 120, 0.35)");
        halo.addColorStop(1, "rgba(255, 200, 120, 0)");
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(b.sx, b.sy, R * 1.5, 0, Math.PI * 2); ctx.fill();
        // núcleo estelar: blanco-caliente → ámbar → naranja → rojo
        const core = ctx.createRadialGradient(b.sx - R * 0.28, b.sy - R * 0.3, R * 0.05, b.sx, b.sy, R);
        core.addColorStop(0, "#fffbf0"); core.addColorStop(0.35, "#ffd27a"); core.addColorStop(0.7, "#ee7623"); core.addColorStop(1, "#b8431a");
        ctx.fillStyle = core; ctx.beginPath(); ctx.arc(b.sx, b.sy, R, 0, Math.PI * 2); ctx.fill();
        // monograma CALFERS en el centro
        ctx.fillStyle = "rgba(40, 18, 6, 0.92)";
        ctx.font = `700 ${Math.max(8, R * 0.34)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("CALFERS", b.sx, b.sy);
        proj.push({ name: "CALFERS", sx: b.sx, sy: b.sy, sr: R });
      } else {
        const r = b.sr;
        // disco para que el logo ámbar destaque sobre el fondo (navy en claro, claro en oscuro)
        ctx.fillStyle = `rgba(${themeColors.disc}, 0.9)`;
        ctx.beginPath(); ctx.arc(b.sx, b.sy, r * 1.32, 0, Math.PI * 2); ctx.fill();
        if (selected === b.name) {
          ctx.strokeStyle = "rgba(242, 179, 45, 0.9)"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(b.sx, b.sy, r * 1.5, 0, Math.PI * 2); ctx.stroke();
        }
        const im = imgs[b.name];
        if (im) {
          const s = r * 1.85;
          ctx.drawImage(im, b.sx - s / 2, b.sy - s / 2, s, s);
        } else {
          // sin logo (ej. REST APIs): símbolo en ámbar
          ctx.fillStyle = "rgba(242, 179, 45, 0.95)";
          ctx.font = `700 ${Math.max(8, r * 0.95)}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(b.name === "REST APIs" ? "{ }" : b.name[0], b.sx, b.sy);
        }
        if (b.sr > 5 && dive < 0.72 && focusP < 0.5) {
          ctx.fillStyle = `rgba(${themeColors.neutral}, ${clamp(0.4 + b.sr / 30, 0, 0.95)})`;
          ctx.font = `${Math.max(9, b.sr * 0.7)}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center"; ctx.textBaseline = "top";
          ctx.fillText(b.name, b.sx, b.sy + r * 1.35 + 4);
        }
        proj.push({ name: b.name, sx: b.sx, sy: b.sy, sr: r });
      }
    }

    if (hint) hint.style.opacity = clamp(1 - Math.max(dive, fe) * 1.6, 0, 1).toFixed(2);
  });
})();

/* ============ FONDOS: lluvia de datos (caps, perfil y contacto) ============ */
(function dataField() {
  if (prefersReducedMotion) return;
  ["capsCanvas", "contactCanvas", "profileCanvas"].forEach((id) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    let { ctx, w, h } = fitCanvas(canvas);
    let dots = [];
    function build() {
      ({ ctx, w, h } = fitCanvas(canvas));
      dots = Array.from({ length: Math.floor((w * h) / 22000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 1.4 + 0.4,
        v: Math.random() * 0.25 + 0.06,
        a: Math.random() * Math.PI * 2,
      }));
    }
    build();
    window.addEventListener("resize", build);
    runWhenVisible(canvas, () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.v;
        d.a += 0.03;
        if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
        const tw = 0.35 + Math.abs(Math.sin(d.a)) * 0.5;
        ctx.fillStyle = Math.random() < 0.002
          ? "rgba(238, 118, 35, 0.9)"
          : `rgba(${themeColors.neutral}, ${tw * 0.4})`;
        ctx.fillRect(d.x, d.y, d.s, d.s);
      }
    });
  });
})();
