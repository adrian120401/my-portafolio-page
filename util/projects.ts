import { allProjects } from "contentlayer/generated";
import type { Locale } from "@/util/i18n";

export const projectAliases: Record<string, string> = {
	"crazygrow-admin": "crazygrow",
	"trekking-app": "la-mision",
	"la-mision-inscription": "la-mision",
};

export function projectsFor(locale: Locale) {
	return allProjects
		.filter((project) => project.published && project.locale === locale)
		.sort(
			(a, b) =>
				(a.featuredOrder ?? 100) - (b.featuredOrder ?? 100) ||
				a.title.localeCompare(b.title, locale),
		);
}

export function featuredProjects(locale: Locale) {
	return projectsFor(locale).filter(
		(project) => project.presentation === "featured",
	);
}
