import type { Project } from "contentlayer/generated";
import { contact, getDictionary, siteUrl, type Locale } from "@/util/i18n";
import { siteName, socialImage } from "@/util/metadata";

export function siteStructuredData(locale: Locale) {
	const d = getDictionary(locale);
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": `${siteUrl}/#person`,
				name: siteName,
				url: siteUrl,
				image: `${siteUrl}/portrait.png`,
				jobTitle: d.hero.role,
				description: d.meta.description,
				sameAs: [contact.github, contact.linkedin],
				knowsLanguage: ["es", "en"],
				address: {
					"@type": "PostalAddress",
					addressLocality: "Flores",
					addressCountry: "UY",
				},
			},
			{
				"@type": "WebSite",
				"@id": `${siteUrl}/#website`,
				url: siteUrl,
				name: siteName,
				inLanguage: ["en", "es"],
				publisher: { "@id": `${siteUrl}/#person` },
			},
		],
	};
}

export function pageStructuredData(
	locale: Locale,
	name: string,
	description: string,
	path = "",
) {
	const url = `${siteUrl}/${locale}${path}`;
	return {
		"@context": "https://schema.org",
		"@type":
			path === "/contact"
				? "ContactPage"
				: path === "/projects"
				? "CollectionPage"
				: "ProfilePage",
		"@id": `${url}#webpage`,
		url,
		name,
		description,
		inLanguage: locale,
		isPartOf: { "@id": `${siteUrl}/#website` },
		...(path
			? { about: { "@id": `${siteUrl}/#person` } }
			: { mainEntity: { "@id": `${siteUrl}/#person` } }),
	};
}

export function projectStructuredData(
	project: Pick<Project, "locale" | "slug" | "title" | "description">,
) {
	const locale = project.locale as Locale;
	const d = getDictionary(locale);
	const url = `${siteUrl}/${locale}/projects/${project.slug}`;
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CreativeWork",
				"@id": `${url}#case-study`,
				url,
				name: project.title,
				description: project.description,
				inLanguage: locale,
				image: socialImage(locale, project.title, project.description),
				creator: { "@id": `${siteUrl}/#person` },
				isPartOf: { "@id": `${siteUrl}/#website` },
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: d.nav.home,
						item: `${siteUrl}/${locale}`,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: d.meta.work,
						item: `${siteUrl}/${locale}/projects`,
					},
					{ "@type": "ListItem", position: 3, name: project.title, item: url },
				],
			},
		],
	};
}
