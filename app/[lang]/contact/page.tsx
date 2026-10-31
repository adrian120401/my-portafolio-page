import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, isLocale, contact, resumeLinks } from "@/util/i18n";
import { pageMetadata } from "@/util/metadata";
import { pageStructuredData } from "@/util/structured-data";
import { JsonLd } from "@/app/components/json-ld";
import { CopyEmail } from "@/app/components/copy-email";
export function generateMetadata({
	params,
}: { params: { lang: string } }): Metadata {
	if (!isLocale(params.lang)) return {};
	const d = getDictionary(params.lang);
	return pageMetadata({
		locale: params.lang,
		title: d.meta.contact,
		description: d.meta.contactDescription,
		path: "/contact",
		imageTitle: d.contact.title,
	});
}
export default function ContactPage({ params }: { params: { lang: string } }) {
	if (!isLocale(params.lang)) notFound();
	const locale = params.lang;
	const d = getDictionary(locale);
	return (
		<main id="main" className="shell page-main contact-page">
			<JsonLd
				data={pageStructuredData(
					locale,
					d.meta.contact,
					d.meta.contactDescription,
					"/contact",
				)}
			/>
			<div className="page-heading">
				<h1>{d.contact.title}</h1>
				<p>{d.contact.intro}</p>
			</div>
			<a className="big-email" href={`mailto:${contact.email}`}>
				<span className="email-address">
					<span>{contact.email.split("@")[0]}</span>
					<span>@{contact.email.split("@")[1]}</span>
				</span>
				<ArrowUpRight size={32} aria-hidden="true" />
			</a>
			<CopyEmail locale={locale} />
			<div className="contact-options">
				<a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
					{d.contact.linkedin}
					<ArrowUpRight aria-hidden="true" />
				</a>
				<a href={contact.github} target="_blank" rel="noopener noreferrer">
					{d.contact.github}
					<ArrowUpRight aria-hidden="true" />
				</a>
			</div>
			<p className="muted">{d.contact.location}</p>
			<div className="resume-downloads">
				<h2>{d.contact.resume}</h2>
				<div className="actions">
					<a
						className="button primary"
						href={resumeLinks[locale]}
						target="_blank"
						rel="noopener noreferrer"
					>
						{d.nav.resume}
						<ArrowUpRight size={18} aria-hidden="true" />
					</a>
					<a
						className="text-link"
						href={resumeLinks[locale === "es" ? "en" : "es"]}
						target="_blank"
						rel="noopener noreferrer"
					>
						{locale === "es" ? d.footer.english : d.footer.spanish}
						<ArrowUpRight size={16} aria-hidden="true" />
					</a>
				</div>
			</div>
		</main>
	);
}
