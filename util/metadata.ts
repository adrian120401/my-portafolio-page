import { siteUrl, type Locale } from "@/util/i18n";
export function languageAlternates(locale: Locale, path = "") {
	return {
		canonical: `${siteUrl}/${locale}${path}`,
		languages: {
			en: `${siteUrl}/en${path}`,
			es: `${siteUrl}/es${path}`,
			"x-default": `${siteUrl}${path}`,
		},
	};
}
