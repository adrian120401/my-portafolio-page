import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, resumeLinks, contact } from "@/util/i18n";
import { languageAlternates } from "@/util/metadata";
import { featuredProjects, projectsFor } from "@/util/projects";
import { ProjectPreview } from "@/app/components/project-preview";
import { SystemExplorer } from "@/app/components/system-explorer";
import { GestureExplorer } from "@/app/components/gesture-explorer";
import {
	experience,
	education,
	skillGroups,
	formatExperienceDate,
} from "@/content/profile";

export function generateMetadata({
	params,
}: { params: { lang: string } }): Metadata {
	return isLocale(params.lang)
		? { alternates: languageAlternates(params.lang) }
		: {};
}
export default function Home({ params }: { params: { lang: string } }) {
	if (!isLocale(params.lang)) notFound();
	const locale = params.lang;
	const d = getDictionary(locale);
	const lab = projectsFor(locale)
		.filter((p) => p.category === "lab" && p.presentation === "listed")
		.sort((a, b) => Number(Boolean(b.video)) - Number(Boolean(a.video)));
	return (
		<main id="main">
			<section className="hero shell" aria-labelledby="hero-title">
				<div className="hero-copy">
					<h1 id="hero-title">{d.hero.title.join(" ")}</h1>
					<div className="hero-identity">
						<p className="hero-name">{d.hero.name}</p>
						<p className="hero-role">{d.hero.role}</p>
						<p className="hero-current">
							<span className="status-dot" />
							{d.hero.current}
						</p>
					</div>
					<p className="hero-intro">{d.hero.intro}</p>
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
						<Link className="button secondary" href={`/${locale}/contact`}>
							{d.hero.contact}
							<ArrowRight size={18} aria-hidden="true" />
						</Link>
					</div>
					<p className="location">{d.hero.location}</p>
				</div>
				<SystemExplorer locale={locale} />
			</section>
			<div className="proof-strip shell">
				<p>{d.hero.proof}</p>
				<Link className="text-link" href={`/${locale}/projects/moka-ahiva`}>
					{d.hero.proofLink}
					<ArrowRight size={18} aria-hidden="true" />
				</Link>
			</div>
			<section
				id="experience"
				className="section shell"
				aria-labelledby="experience-title"
			>
				<div className="section-heading">
					<h2 id="experience-title">{d.experience.title}</h2>
					<p>{d.experience.intro}</p>
				</div>
				<div className="experience-list">
					{experience.map((job) => (
						<article className="experience-row" key={job.company}>
							<div className="experience-date">
								<time dateTime={job.start}>
									{formatExperienceDate(job.start, locale)}
								</time>
								<span> — </span>
								{job.end ? (
									<time dateTime={job.end}>
										{formatExperienceDate(job.end, locale)}
									</time>
								) : (
									d.experience.present
								)}
							</div>
							<div className="experience-body">
								<div className="experience-title">
									<h3>{job.company}</h3>
									<p>{job.role[locale]}</p>
								</div>
								<p>{job.summary[locale]}</p>
								<details>
									<summary>{d.experience.details}</summary>
									<ul>
										{job.points[locale].map((point) => (
											<li key={point}>{point}</li>
										))}
									</ul>
								</details>
								<div className="experience-bottom">
									<p className="stack-line">{job.stack.join(" / ")}</p>
									{job.case && (
										<Link
											className="text-link"
											href={`/${locale}/projects/${job.case}`}
										>
											{d.work.case}
											<ArrowUpRight size={16} aria-hidden="true" />
										</Link>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
				<p className="freelance-note">
					{d.experience.freelance}{" "}
					<a
						className="text-link"
						href="https://numisoft.dev/"
						target="_blank"
						rel="noopener noreferrer"
					>
						{d.experience.consulting}
						<ArrowUpRight size={15} aria-hidden="true" />
					</a>
				</p>
			</section>
			<section
				id="work"
				className="section section-work shell"
				aria-labelledby="work-title"
			>
				<div className="section-heading">
					<h2 id="work-title">{d.work.title}</h2>
					<p>{d.work.intro}</p>
				</div>
				<div className="editorial-list">
					{featuredProjects(locale).map((project) => (
						<ProjectPreview key={project.slug} project={project} editorial />
					))}
				</div>
				<Link className="button secondary" href={`/${locale}/projects`}>
					{d.work.all}
					<ArrowRight size={18} aria-hidden="true" />
				</Link>
			</section>
			<section
				id="lab"
				className="section lab-section"
				aria-labelledby="lab-title"
			>
				<div className="shell">
					<div className="section-heading">
						<h2 id="lab-title">{d.lab.title}</h2>
						<p>{d.lab.intro}</p>
					</div>
					<GestureExplorer locale={locale} />
					<div className="lab-grid">
						{lab.map((project) => (
							<ProjectPreview key={project.slug} project={project} />
						))}
					</div>
					<p className="muted">{d.lab.note}</p>
					<Link className="text-link" href={`/${locale}/projects?category=lab`}>
						{d.lab.all}
						<ArrowRight size={17} aria-hidden="true" />
					</Link>
				</div>
			</section>
			<section
				className="section shell about-section"
				aria-labelledby="about-title"
			>
				<div className="about-intro">
					<div>
						<h2 id="about-title">{d.about.title}</h2>
						<p>{d.about.intro}</p>
						<p>{d.about.second}</p>
						<p className="muted">{d.about.languages}</p>
						<a
							className="text-link"
							href={resumeLinks[locale]}
							target="_blank"
							rel="noopener noreferrer"
						>
							{d.about.cv}
							<ArrowUpRight size={17} aria-hidden="true" />
						</a>
					</div>
					<Image
						src="/portrait.png"
						alt={d.about.portrait}
						width={450}
						height={500}
						sizes="(max-width: 760px) 80vw, 360px"
						className="portrait"
					/>
				</div>
				<div className="skills-education">
					<div>
						<h3>{d.about.skills}</h3>
						<dl className="skill-groups">
							{skillGroups.map((group) => (
								<div key={group.title.en}>
									<dt>{group.title[locale]}</dt>
									<dd>{group.technologies.join(" · ")}</dd>
								</div>
							))}
						</dl>
					</div>
					<div>
						<h3>{d.about.education}</h3>
						<ul className="education-list">
							{education.map((item) => (
								<li key={item.organization + item.title.en}>
									<p>{item.title[locale]}</p>
									<span>
										{item.organization}
										{item.date ? ` · ${item.date}` : ""}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
			<section id="contact" className="contact-strip shell">
				<h2>{d.contact.title}</h2>
				<div>
					<p>{d.contact.intro}</p>
					<a
						className="text-link contact-email"
						href={`mailto:${contact.email}`}
					>
						{contact.email}
						<ArrowUpRight size={24} aria-hidden="true" />
					</a>
					<Link className="text-link" href={`/${locale}/contact`}>
						{d.nav.contact}
						<ArrowRight size={17} aria-hidden="true" />
					</Link>
				</div>
			</section>
		</main>
	);
}
