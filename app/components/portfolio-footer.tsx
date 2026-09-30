"use client";

import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { getDictionary, resumeLinks, contact, type Locale } from "@/util/i18n";

export function PortfolioFooter({ locale }: { locale: Locale }) {
	const pathname = usePathname();
	const { footer } = getDictionary(locale);
	const suffix = (pathname || `/${locale}`).replace(/^\/(en|es)(?=\/|$)/, "");
	return (
		<footer className="site-footer">
			<div className="shell">
				<div className="footer-top">
					<a
						href={`/${locale}`}
						className="wordmark"
						aria-label="Adrián de los Reyes"
					>
						ADR<span>.</span>
					</a>
					<div className="footer-socials">
						<a href={`mailto:${contact.email}`}>Email</a>
						<a
							href={contact.linkedin}
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn
						</a>
						<a href={contact.github} target="_blank" rel="noopener noreferrer">
							GitHub
						</a>
					</div>
					<a className="text-link" href="#top">
						{footer.top}
						<ArrowUp size={16} aria-hidden="true" />
					</a>
				</div>
				<div className="footer-bottom">
					<p>
						© {new Date().getFullYear()} {footer.rights}
					</p>
					<div className="footer-resumes">
						<a href={resumeLinks.en} target="_blank" rel="noopener noreferrer">
							{footer.english}
						</a>
						<a href={resumeLinks.es} target="_blank" rel="noopener noreferrer">
							{footer.spanish}
						</a>
					</div>
					<div
						className="language-switch"
						role="group"
						aria-label={footer.language}
					>
						{(["es", "en"] as const).map((language) => (
							// rome-ignore lint/a11y/useValidAnchor: Navigates to a real localized URL; click only persists the preference.
							<a
								key={language}
								href={`/${language}${suffix}`}
								hrefLang={language}
								lang={language}
								aria-current={locale === language ? "true" : undefined}
								onClick={(event) => {
									event.currentTarget.href = `/${language}${suffix}${window.location.search}${window.location.hash}`;
									document.cookie = `portfolio-language=${language}; Path=/; Max-Age=31536000; SameSite=Lax${
										window.location.protocol === "https:" ? "; Secure" : ""
									}`;
								}}
							>
								{language === "es" ? "Español" : "English"}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
