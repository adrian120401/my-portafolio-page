"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDictionary, isLocale } from "@/util/i18n";
export default function NotFound() {
	const params = useParams() || {};
	const lang =
		typeof params.lang === "string" && isLocale(params.lang)
			? params.lang
			: "en";
	const d = getDictionary(lang).notFound;
	return (
		<main id="main" className="shell page-main empty-state">
			<h1>{d.title}</h1>
			<p>{d.description}</p>
			<Link className="button primary" href={`/${lang}`}>
				{d.home}
			</Link>
		</main>
	);
}
