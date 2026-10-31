import type { MetadataRoute } from "next";
import { siteUrl } from "@/util/i18n";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			// Crawlers must be able to read a preview page's noindex metadata.
			allow: "/",
			disallow: "/api/",
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
