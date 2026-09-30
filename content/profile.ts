import type { Locale } from "@/util/i18n";

type Localized<T> = Record<Locale, T>;
export const experience = [
	{
		company: "Ahí Va",
		url: "https://www.ahiva.app/",
		start: "2026-06",
		end: null,
		role: { en: "Technical Lead", es: "Líder técnico" },
		summary: {
			en: "Evolving a delivery and local commerce platform after its acquisition of Moka.",
			es: "Evolución de una plataforma de delivery y comercio local tras la adquisición de Moka.",
		},
		points: {
			en: [
				"Leading the migration from Ionic and Capacitor to React Native and Expo for Android and iOS.",
				"Redesigning backend services with NestJS and PostgreSQL.",
				"Defining architecture and priorities for the technical roadmap, cloud infrastructure and CI/CD.",
			],
			es: [
				"Lidero la migración de Ionic y Capacitor a React Native y Expo para Android e iOS.",
				"Rediseño servicios backend con NestJS y PostgreSQL.",
				"Defino arquitectura y prioridades del roadmap técnico, infraestructura cloud y CI/CD.",
			],
		},
		stack: ["React Native", "Expo", "NestJS", "PostgreSQL"],
		case: "moka-ahiva",
	},
	{
		company: "Moka",
		url: null,
		start: "2025-04",
		end: "2026-05",
		role: {
			en: "Founder & Full Stack Developer",
			es: "Fundador y desarrollador Full Stack",
		},
		summary: {
			en: "Built and operated a marketplace from its first idea through acquisition by Ahí Va.",
			es: "Construí y operé un marketplace desde la primera idea hasta su adquisición por Ahí Va.",
		},
		points: {
			en: [
				"Built the mobile applications, administration panel, backend and cloud infrastructure from scratch.",
				"Reached more than 1,500 verified users and 30 active merchants.",
				"Owned product strategy and the technical roadmap, and led the acquisition process.",
			],
			es: [
				"Construí desde cero las aplicaciones móviles, el panel administrativo, el backend y la infraestructura cloud.",
				"Alcancé más de 1.500 usuarios verificados y 30 comercios activos.",
				"Gestioné la estrategia de producto y el roadmap técnico, y lideré el proceso de adquisición.",
			],
		},
		stack: ["Mobile", "Backend", "Cloud", "Product"],
		case: "moka-ahiva",
	},
	{
		company: "Sofka",
		url: null,
		start: "2024-12",
		end: "2025-03",
		role: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
		summary: {
			en: "Banking solutions built with reactive architectures.",
			es: "Soluciones bancarias con arquitecturas reactivas.",
		},
		points: {
			en: [
				"Implemented banking features with Java, Spring Boot and Spring WebFlux.",
				"Applied DDD and Event Sourcing for transaction traceability and domain consistency.",
				"Optimized backend transaction processing flows.",
			],
			es: [
				"Implementé funcionalidades bancarias con Java, Spring Boot y Spring WebFlux.",
				"Apliqué DDD y Event Sourcing para la trazabilidad transaccional y la consistencia del dominio.",
				"Optimicé flujos de procesamiento de transacciones en el backend.",
			],
		},
		stack: ["Java", "Spring WebFlux", "DDD", "Event Sourcing"],
		case: null,
	},
	{
		company: "Baufest",
		url: null,
		start: "2022-08",
		end: "2023-07",
		role: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
		summary: {
			en: "Enterprise financial systems, process automation and SAP integrations.",
			es: "Sistemas financieros empresariales, automatización de procesos e integraciones SAP.",
		},
		points: {
			en: [
				"Built and maintained Java, Angular and React applications for enterprise financial processes.",
				"Automated Jira and database workflows with Python.",
				"Extended SAP integrations and existing C# applications.",
			],
			es: [
				"Desarrollé y mantuve aplicaciones con Java, Angular y React para procesos financieros empresariales.",
				"Automaticé flujos de Jira y bases de datos con Python.",
				"Amplié integraciones SAP y aplicaciones existentes en C#.",
			],
		},
		stack: ["Java", "React", "Angular", "Python", "C#"],
		case: null,
	},
];

export const skillGroups: {
	title: Localized<string>;
	technologies: string[];
}[] = [
	{
		title: { en: "Mobile", es: "Mobile" },
		technologies: ["React Native", "Expo", "Ionic", "Capacitor"],
	},
	{
		title: { en: "Backend & architecture", es: "Backend y arquitectura" },
		technologies: [
			"Java",
			"Spring Boot",
			"WebFlux",
			"NestJS",
			"Node.js",
			"DDD",
			"Event Sourcing",
		],
	},
	{
		title: { en: "Web", es: "Web" },
		technologies: ["React", "Angular", "Next.js", "TypeScript"],
	},
	{
		title: { en: "Data & infrastructure", es: "Datos e infraestructura" },
		technologies: [
			"PostgreSQL",
			"MySQL",
			"MongoDB",
			"AWS",
			"Google Cloud",
			"Docker",
			"GitHub Actions",
		],
	},
];

export const education: {
	organization: string;
	title: Localized<string>;
	date: string;
}[] = [
	{
		organization: "Globant University",
		title: {
			en: "Java Backend Development Bootcamp",
			es: "Bootcamp en Desarrollo Backend Java",
		},
		date: "2024–2025",
	},
	{
		organization: "Polo Tecnológico",
		title: {
			en: "Technical High School in Computer Science",
			es: "Bachillerato Tecnológico en Informática",
		},
		date: "2022",
	},
	{
		organization: "IBM",
		title: { en: "Applied AI", es: "Applied AI" },
		date: "2025",
	},
	{
		organization: "Google",
		title: {
			en: "Cybersecurity Professional Certificate",
			es: "Certificado Profesional de Ciberseguridad",
		},
		date: "2024",
	},
	{
		organization: "IBM",
		title: {
			en: "Back-End Development Specialization",
			es: "Especialización en Desarrollo Back-End",
		},
		date: "2024",
	},
	{
		organization: "Microsoft",
		title: {
			en: "Microsoft Learn Student Ambassadors · Beta",
			es: "Microsoft Learn Student Ambassadors · Beta",
		},
		date: "",
	},
];

export function formatExperienceDate(value: string, locale: Locale) {
	const [year, month] = value.split("-").map(Number);
	return new Intl.DateTimeFormat(locale, {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(Date.UTC(year, month - 1, 1)));
}
