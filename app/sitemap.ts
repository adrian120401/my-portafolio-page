import type { MetadataRoute } from "next";
import { allProjects } from "contentlayer/generated";
import { siteUrl, locales } from "@/util/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
	const routes = locales.flatMap((lang) =>
		["", "/projects", "/contact"].map((path) => ({
			url: `${siteUrl}/${lang}${path}`,
		})),
	);
	const projects = allProjects
		.filter((p) => p.published && p.presentation !== "hidden")
		.map((p) => ({ url: `${siteUrl}/${p.locale}/projects/${p.slug}` }));
	return [...routes, ...projects];
}
