export const locales = ["en", "es"] as const;
export type Locale = typeof locales[number];
export const siteUrl = "https://adriandelosreyes.vercel.app";

export function isLocale(value: string): value is Locale {
	return value === "en" || value === "es";
}

export const resumeLinks: Record<Locale, string> = {
	en: "https://drive.google.com/file/d/1-mhV4ynho_UlgwhSZrL9Jm_f31xZV-yN/view?usp=sharing",
	es: "https://drive.google.com/file/d/1UFPMzZn1p7y1FDA8W4-KubIlZcw9jJ-Z/view?usp=sharing",
};

export const contact = {
	email: "adriandelosreyes2013@gmail.com",
	linkedin: "https://www.linkedin.com/in/adriandelosreyess/",
	github: "https://github.com/adrian120401",
};

const en = {
	nav: {
		experience: "Experience",
		work: "Work",
		lab: "Lab",
		contact: "Contact",
		resume: "View resume",
		home: "Home",
		menu: "Open navigation",
		close: "Close navigation",
	},
	hero: {
		title: ["From the first idea", "to production."],
		name: "Adrián de los Reyes",
		role: "Full Stack & Mobile Developer",
		current: "Technical Lead at Ahí Va",
		intro:
			"I build mobile apps, backend services and the systems that connect them. From product decisions to architecture, code and delivery.",
		contact: "Get in touch",
		proof:
			"I founded Moka: more than 1,500 verified users and 30 active merchants. Acquired by Ahí Va in 2026.",
		proofLink: "The story behind Moka",
		location: "Flores, Uruguay · Working remotely",
		scene: "Explore the system",
		assemble: "Assemble",
		unfold: "Unfold",
		enable: "Explore in 3D",
		static: "Static view",
		loading: "Loading the interactive system",
		fallback: "The system is shown as a static diagram.",
		layers: ["Backend", "Web", "Mobile"],
		layerDescriptions: [
			"APIs, domain logic and data. Java, Spring and NestJS.",
			"Interfaces for people and operations. React and TypeScript.",
			"Products for Android and iOS. React Native and Expo.",
		],
		diagram:
			"An illustrative system connecting backend services, a web interface and a mobile application.",
	},
	experience: {
		title: "Built. Operated. Led.",
		intro: "My work connects product thinking with hands-on engineering.",
		present: "Present",
		details: "Responsibilities",
		remote: "Remote",
		freelance:
			"Alongside this work, I deliver client projects through Numisoft.",
		consulting: "Explore Numisoft",
	},
	work: {
		title: "Selected work",
		intro:
			"Real products, real clients. The part I built, the decisions I made and what shipped.",
		all: "Explore all work",
		case: "Read the case",
		role: "My role",
		real: "Production work",
		private: "Private code",
		public: "View code",
		visit: "Visit website",
		archived: "Earlier work",
		archiveIntro:
			"A selection of earlier client deliveries and technical challenges.",
		archiveToggle: "Explore earlier work",
		hidden: "Historical project",
		hiddenIntro:
			"This earlier project remains available for reference. It is no longer part of my selected work.",
		filter: "Filter projects",
		filters: ["All work", "Products", "Clients", "Lab"],
		noResults: "No projects in this category.",
		reset: "Show all work",
		back: "All projects",
		stack: "Technology",
		related: "Continue exploring",
		gallery: "Project gallery",
		count: "projects",
		projectImage: "Screenshot of",
		diagramImage: "Architecture diagram for",
		contents: "In this case",
		contribution: "Contribution",
		outcome: "Outcome",
	},
	lab: {
		title: "Room to experiment.",
		intro:
			"Computer vision, gesture-driven interaction and tools I build to explore an idea.",
		all: "Explore the lab",
		experimental: "Personal experiment",
		play: "Play demo",
		demo: "Recorded demo",
		post: "Watch the LinkedIn post",
		videoFallback: "Video unavailable. Watch the original demo on LinkedIn.",
		gestureTitle: "From gesture to interaction.",
		gestureIntro:
			"Three experiments, one starting point: a hand in motion. Explore the illustrative tracking model, then watch the real demos below.",
		gestureHint: "Move your pointer to rotate the hand",
		gestureStatic: "Interactive hand diagram",
		gestureEnable: "Explore the hand in 3D",
		gestureLoading: "Loading the 3D hand…",
		gestureFallback:
			"The hand diagram remains available. Explore the poses and recorded demos.",
		poses: ["Open hand", "Pinch", "Closed hand"],
		note: "These are experiments, separate from my production work.",
	},
	about: {
		title: "A builder at heart.",
		intro:
			"I’m a developer based in Flores, Uruguay. I enjoy taking a product from its first sketch to something people can actually use — and understanding every layer along the way.",
		second:
			"Building Moka taught me to connect engineering with product decisions. Today, at Ahí Va, I work on mobile migration, backend evolution and technical direction. My personal experiments give me another way to keep learning.",
		skills: "What I work with",
		education: "Education & credentials",
		languages: "Spanish, native · English, professional working proficiency",
		portrait: "Portrait of Adrián de los Reyes",
		cv: "More in my resume",
	},
	contact: {
		title: "Let’s build what’s next.",
		intro:
			"Have a role or a technical challenge in mind? I’d like to hear about it.",
		email: "Email me",
		linkedin: "Connect on LinkedIn",
		github: "Explore GitHub",
		copy: "Copy email",
		copied: "Email copied",
		copyError: "Select the email address to copy it.",
		location: "Based in Flores, Uruguay. Working remotely.",
		resume: "My experience, in one document.",
	},
	footer: {
		language: "Language",
		english: "English resume",
		spanish: "Spanish resume",
		top: "Back to top",
		note: "Built with care. Always evolving.",
		rights: "Adrián de los Reyes",
	},
	notFound: {
		title: "This page isn’t here.",
		description:
			"The link may have changed. You can explore my work or return to the homepage.",
		home: "Back to home",
	},
	meta: {
		title: "Adrián de los Reyes | Full Stack & Mobile Developer",
		description:
			"Full Stack & Mobile Developer and Technical Lead from Uruguay. Explore my work in mobile, backend, SaaS products and technical leadership.",
		work: "Projects",
		contact: "Contact",
		lab: "Laboratory",
	},
};

const es: typeof en = {
	nav: {
		experience: "Experiencia",
		work: "Proyectos",
		lab: "Laboratorio",
		contact: "Contacto",
		resume: "Ver CV",
		home: "Inicio",
		menu: "Abrir navegación",
		close: "Cerrar navegación",
	},
	hero: {
		title: ["De la primera idea", "a producción."],
		name: "Adrián de los Reyes",
		role: "Desarrollador Full Stack y Mobile",
		current: "Líder técnico en Ahí Va",
		intro:
			"Construyo aplicaciones móviles, servicios backend y los sistemas que los conectan. Desde las decisiones de producto hasta la arquitectura, el código y la entrega.",
		contact: "Contactame",
		proof:
			"Fundé Moka: más de 1.500 usuarios verificados y 30 comercios activos. Adquirida por Ahí Va en 2026.",
		proofLink: "La historia detrás de Moka",
		location: "Flores, Uruguay · Trabajo remoto",
		scene: "Explorá el sistema",
		assemble: "Ensamblar",
		unfold: "Desplegar",
		enable: "Explorar en 3D",
		static: "Vista estática",
		loading: "Cargando el sistema interactivo",
		fallback: "El sistema se muestra como un diagrama estático.",
		layers: ["Backend", "Web", "Mobile"],
		layerDescriptions: [
			"APIs, lógica de dominio y datos. Java, Spring y NestJS.",
			"Interfaces para personas y operaciones. React y TypeScript.",
			"Productos para Android e iOS. React Native y Expo.",
		],
		diagram:
			"Sistema ilustrativo que conecta servicios backend, una interfaz web y una aplicación móvil.",
	},
	experience: {
		title: "Construir. Operar. Liderar.",
		intro:
			"Mi trabajo conecta las decisiones de producto con la implementación técnica.",
		present: "Actualidad",
		details: "Responsabilidades",
		remote: "Remoto",
		freelance:
			"En paralelo, desarrollo proyectos para clientes a través de Numisoft.",
		consulting: "Conocé Numisoft",
	},
	work: {
		title: "Trabajo seleccionado",
		intro:
			"Productos y clientes reales. Mi aporte, las decisiones que tomé y lo que llegó a producción.",
		all: "Ver todos los proyectos",
		case: "Leer el caso",
		role: "Mi rol",
		real: "Trabajo en producción",
		private: "Código privado",
		public: "Ver código",
		visit: "Visitar web",
		archived: "Trabajos anteriores",
		archiveIntro:
			"Una selección de entregas anteriores para clientes y desafíos técnicos.",
		archiveToggle: "Explorar trabajos anteriores",
		hidden: "Proyecto histórico",
		hiddenIntro:
			"Este proyecto anterior sigue disponible como referencia. Ya no forma parte de mi trabajo seleccionado.",
		filter: "Filtrar proyectos",
		filters: ["Todos", "Productos", "Clientes", "Laboratorio"],
		noResults: "No hay proyectos en esta categoría.",
		reset: "Ver todos",
		back: "Todos los proyectos",
		stack: "Tecnologías",
		related: "Seguí explorando",
		gallery: "Galería del proyecto",
		count: "proyectos",
		projectImage: "Captura de",
		diagramImage: "Diagrama de arquitectura de",
		contents: "En este caso",
		contribution: "Mi aporte",
		outcome: "Resultado",
	},
	lab: {
		title: "Espacio para experimentar.",
		intro:
			"Visión por computadora, interacción por gestos y herramientas que construyo para explorar una idea.",
		all: "Explorar el laboratorio",
		experimental: "Experimento personal",
		play: "Reproducir demo",
		demo: "Demo grabada",
		post: "Ver el post en LinkedIn",
		videoFallback: "Video no disponible. Mira la demo original en LinkedIn.",
		gestureTitle: "Del gesto a la interacción.",
		gestureIntro:
			"Tres experimentos, un punto de partida: una mano en movimiento. Explora el modelo ilustrativo de tracking y mira las demos reales debajo.",
		gestureHint: "Mueve el cursor para rotar la mano",
		gestureStatic: "Diagrama interactivo de la mano",
		gestureEnable: "Explorar la mano en 3D",
		gestureLoading: "Cargando la mano 3D…",
		gestureFallback:
			"El diagrama sigue disponible. Explora las poses y las demos grabadas.",
		poses: ["Mano abierta", "Pinza", "Mano cerrada"],
		note: "Son experimentos, independientes de mi trabajo en producción.",
	},
	about: {
		title: "Me gusta construir.",
		intro:
			"Soy desarrollador y vivo en Flores, Uruguay. Disfruto llevar un producto desde el primer boceto hasta algo que las personas puedan usar, y entender cada capa en el camino.",
		second:
			"Construir Moka me enseñó a conectar ingeniería y decisiones de producto. Hoy, en Ahí Va, trabajo en migración móvil, evolución backend y dirección técnica. Mis experimentos personales son otra forma de seguir aprendiendo.",
		skills: "Con qué trabajo",
		education: "Formación y certificaciones",
		languages: "Español nativo · Inglés, competencia profesional de trabajo",
		portrait: "Retrato de Adrián de los Reyes",
		cv: "Más en mi CV",
	},
	contact: {
		title: "Construyamos lo que sigue.",
		intro:
			"¿Tenés una oportunidad o un desafío técnico en mente? Me gustaría conocerlo.",
		email: "Escribime",
		linkedin: "Conectemos en LinkedIn",
		github: "Explorá mi GitHub",
		copy: "Copiar email",
		copied: "Email copiado",
		copyError: "Seleccioná la dirección de email para copiarla.",
		location: "Vivo en Flores, Uruguay. Trabajo de forma remota.",
		resume: "Mi experiencia, en un documento.",
	},
	footer: {
		language: "Idioma",
		english: "CV en inglés",
		spanish: "CV en español",
		top: "Volver arriba",
		note: "Hecho con cuidado. Siempre en evolución.",
		rights: "Adrián de los Reyes",
	},
	notFound: {
		title: "Esta página no está acá.",
		description:
			"El enlace puede haber cambiado. Podés explorar mis proyectos o volver al inicio.",
		home: "Volver al inicio",
	},
	meta: {
		title: "Adrián de los Reyes | Desarrollador Full Stack y Mobile",
		description:
			"Desarrollador Full Stack y Mobile y líder técnico de Uruguay. Conocé mi trabajo en mobile, backend, productos SaaS y liderazgo técnico.",
		work: "Proyectos",
		contact: "Contacto",
		lab: "Laboratorio",
	},
};

export function getDictionary(locale: Locale) {
	return locale === "es" ? es : en;
}

export function localizedPath(locale: Locale, path = "") {
	return `/${locale}${path}`;
}
