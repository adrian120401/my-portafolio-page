import type { Metadata } from "next";
import { siteUrl, type Locale } from "@/util/i18n";

export const siteName = "Adrián de los Reyes";

export function languageAlternates(locale: Locale, path = "") {
	return {
		canonical: `${siteUrl}/${locale}${path}`,
		languages: {
			en: `${siteUrl}/en${path}`,
			es: `${siteUrl}/es${path}`,
			"x-default": `${siteUrl}/en${path}`,
		},
	};
}

export function socialImage(
	locale: Locale,
	title: string,
	description: string,
) {
	const image = new URL("/social/og.png", siteUrl);
	image.search = new URLSearchParams({
		lang: locale,
		title,
		description,
		v: "1",
	}).toString();
	return image.href;
}

/** Nested Open Graph / Twitter objects are replaced, not merged, by Next.js. */
export function pageMetadata({
	locale,
	title,
	description,
	path = "",
	imageTitle = title,
	noIndex = false,
}: {
	locale: Locale;
	title: string;
	description: string;
	path?: string;
	imageTitle?: string;
	noIndex?: boolean;
}): Metadata {
	const fullTitle = path ? `${title} | ${siteName}` : title;
	const image = socialImage(locale, imageTitle, description);
	const index = !noIndex && process.env.VERCEL_ENV !== "preview";
	return {
		title: { absolute: fullTitle },
		description,
		alternates: languageAlternates(locale, path),
		robots: {
			index,
			follow: true,
			googleBot: {
				index,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
		openGraph: {
			type: "website",
			siteName,
			title: fullTitle,
			description,
			url: `${siteUrl}/${locale}${path}`,
			locale: locale === "es" ? "es_UY" : "en_US",
			alternateLocale: [locale === "es" ? "en_US" : "es_UY"],
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					type: "image/png",
					alt: `${imageTitle} — ${siteName}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			images: [{ url: image, alt: `${imageTitle} — ${siteName}` }],
		},
	};
}
