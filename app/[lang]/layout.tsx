import "../../global.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { PortfolioNav } from "@/app/components/portfolio-nav";
import { PortfolioFooter } from "@/app/components/portfolio-footer";
import { PortfolioMotion } from "@/app/components/portfolio-motion";
import { getDictionary, isLocale, locales, siteUrl } from "@/util/i18n";

const manrope = localFont({
	src: "../../public/fonts/Manrope.ttf",
	variable: "--font-manrope",
	display: "swap",
	weight: "200 800",
});
const mono = localFont({
	src: "../../public/fonts/IBMPlexMono-Regular.ttf",
	variable: "--font-mono",
	display: "swap",
	weight: "400",
});
export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}
export function generateMetadata({
	params,
}: { params: { lang: string } }): Metadata {
	if (!isLocale(params.lang)) return {};
	const { meta } = getDictionary(params.lang);
	return {
		metadataBase: new URL(siteUrl),
		title: { default: meta.title, template: "%s | Adrián de los Reyes" },
		description: meta.description,
		authors: [{ name: "Adrián de los Reyes" }],
		creator: "Adrián de los Reyes",
		icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
		openGraph: {
			title: meta.title,
			description: meta.description,
			siteName: "Adrián de los Reyes",
			locale: params.lang === "es" ? "es_UY" : "en_US",
			type: "website",
			images: [
				{
					url: "/og-me.jpg",
					width: 1200,
					height: 630,
					alt: "Adrián de los Reyes",
				},
			],
		},
		twitter: { card: "summary_large_image", images: ["/og-me.jpg"] },
		verification: { google: "QQfzSez_Ke5ABriqhqd-LrL2b_8liIiAJS9TU2GCqNc" },
	};
}
export default function LocaleLayout({
	children,
	params,
}: { children: React.ReactNode; params: { lang: string } }) {
	if (!isLocale(params.lang)) notFound();
	return (
		<html lang={params.lang} className={`${manrope.variable} ${mono.variable}`}>
			<body>
				<PortfolioMotion />
				<PortfolioNav locale={params.lang} />
				{children}
				<PortfolioFooter locale={params.lang} />
				<Analytics />
			</body>
		</html>
	);
}
