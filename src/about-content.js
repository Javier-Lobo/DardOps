const CONTENT = Object.freeze({
  es: {
    kicker: "SOBRE EL PROYECTO",
    title: "Acerca de DardOps",
    intro: "DardOps pone cerebro digital, marcador automático y una lengua innecesariamente afilada a cualquier diana analógica. Tú lanzas; la aplicación cuenta, habla y conserva pruebas.",
    logoAlt: "Logo de DardOps",
    authorAlt: "Retrato de Javier Lobo",
    authorTitle: "Creado por Javier Lobo",
    authorCopy: "Construido como una herramienta pequeña y práctica para jugar sin hacer cuentas entre cerveza y cerveza. Lo bastante precisa para gestionar la partida y lo bastante borde para impedir que alguien se venga arriba.",
    authorNote: "Sin cuentas, sin nube y sin un árbitro discutiendo si aquello fue triple o una petición de auxilio.",
    identityTitle: "Qué hace que esto sea DardOps",
    identityCopy: "Interfaz LobOps, estado local, feedback AudioCSS y una diana SVG que convierte cada clic en una decisión oficialmente registrada. Todo funciona en el navegador y dentro de un contenedor endurecido.",
    back: "Volver",
    footer: "ACERCA DE DARDOPS",
    pillars: [
      { icon: "target", title: "Marcador sin excusas", copy: "Cinco juegos, turnos automáticos, cierres, busts, Cricket y deshacer. Las matemáticas ya no pueden cargar con la culpa." },
      { icon: "audio", title: "Voz y mala leche", copy: "Locución bilingüe, tres modos de voz y cientos de pullas que usan tu nombre. La personalización era esto, aparentemente." },
      { icon: "database", title: "Local por diseño", copy: "Partida y preferencias permanecen en localStorage. Sin cuentas, backend, analítica ni una nube tomando notas sobre tu puntería." }
    ],
    stackTitle: "Tecnologías y piezas de ejecución",
    technologies: [
      { name: "JavaScript", copy: "Estado e interfaz sin framework" },
      { name: "SVG", copy: "Diana interactiva y accesible" },
      { name: "Vite", copy: "Desarrollo y build de producción" },
      { name: "Vitest", copy: "Pruebas del motor y la interfaz" },
      { name: "AudioCSS", copy: "Feedback sonoro declarativo" },
      { name: "Web Speech API", copy: "Voz española e inglesa" },
      { name: "Docker", copy: "Ejecución reproducible y endurecida" },
      { name: "NGINX", copy: "Servidor estático no privilegiado" }
    ]
  },
  en: {
    kicker: "ABOUT THE PROJECT",
    title: "About DardOps",
    intro: "DardOps gives any analogue dartboard a digital brain, automatic scoring and an unnecessarily sharp tongue. You throw; the app counts, speaks and preserves the evidence.",
    logoAlt: "DardOps logo",
    authorAlt: "Portrait of Javier Lobo",
    authorTitle: "Built by Javier Lobo",
    authorCopy: "Built as a small, practical tool for playing without doing arithmetic between beers. Accurate enough to run the match and rude enough to stop anyone becoming too pleased with themselves.",
    authorNote: "No accounts, no cloud and no referee debating whether that was a triple or a cry for help.",
    identityTitle: "What makes it DardOps",
    identityCopy: "A LobOps interface, local state, AudioCSS feedback and an SVG board that turns every click into an officially recorded decision. Everything runs in the browser and inside a hardened container.",
    back: "Back",
    footer: "ABOUT DARDOPS",
    pillars: [
      { icon: "target", title: "Scoring without excuses", copy: "Five games, automatic turns, checkouts, busts, Cricket and undo. Mathematics can no longer take the blame." },
      { icon: "audio", title: "Voice and hostility", copy: "Bilingual speech, three voice modes and hundreds of insults using your name. Apparently, this is personalisation." },
      { icon: "database", title: "Local by design", copy: "The game and preferences stay in localStorage. No accounts, backend, analytics or cloud taking notes on your accuracy." }
    ],
    stackTitle: "Libraries and runtime pieces",
    technologies: [
      { name: "JavaScript", copy: "State and UI without a framework" },
      { name: "SVG", copy: "Interactive, accessible dartboard" },
      { name: "Vite", copy: "Development and production build" },
      { name: "Vitest", copy: "Game engine and UI tests" },
      { name: "AudioCSS", copy: "Declarative sound feedback" },
      { name: "Web Speech API", copy: "Spanish and English speech" },
      { name: "Docker", copy: "Reproducible, hardened runtime" },
      { name: "NGINX", copy: "Unprivileged static server" }
    ]
  }
});

export function getAboutContent(language) {
  return CONTENT[language] ?? CONTENT.es;
}
