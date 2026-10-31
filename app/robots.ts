import type { MetadataRoute } from "next";
import { siteUrl } from "@/util/i18n";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			...(process.env.VERCEL_ENV === "preview"
				? { disallow: "/" }
				: { allow: "/", disallow: "/api/" }),
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
