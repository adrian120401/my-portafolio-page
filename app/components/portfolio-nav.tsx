import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, resumeLinks, type Locale } from "@/util/i18n";

export function PortfolioNav({ locale }: { locale: Locale }) {
	const { nav } = getDictionary(locale);
	return (
		<header className="site-header" id="top">
			<a className="skip-link" href="#main">
				{locale === "es" ? "Saltar al contenido" : "Skip to content"}
			</a>
			<div className="shell nav-inner">
				<Link
					className="wordmark"
					href={`/${locale}`}
					aria-label={`Adrián de los Reyes · ${nav.home}`}
				>
					ADR<span>.</span>
				</Link>
				<nav
					aria-label={
						locale === "es" ? "Navegación principal" : "Main navigation"
					}
				>
					<Link href={`/${locale}#experience`}>{nav.experience}</Link>
					<Link href={`/${locale}/projects`}>{nav.work}</Link>
					<Link href={`/${locale}/projects?category=lab`}>{nav.lab}</Link>
					<Link href={`/${locale}/contact`}>{nav.contact}</Link>
				</nav>
				<a
					href={resumeLinks[locale]}
					className="nav-resume"
					target="_blank"
					rel="noopener noreferrer"
				>
					{nav.resume}
					<ArrowUpRight size={15} aria-hidden="true" />
				</a>
			</div>
		</header>
	);
}
