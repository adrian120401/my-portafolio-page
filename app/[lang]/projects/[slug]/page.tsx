import Link from "next/link";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getDictionary, isLocale } from "@/util/i18n";
import { languageAlternates } from "@/util/metadata";
import { projectAliases, projectsFor } from "@/util/projects";
import { ProjectVisual } from "@/app/components/project-visual";
import { ProjectPreview } from "@/app/components/project-preview";
import { Mdx } from "@/app/components/mdx";
import { DemoVideo } from "@/app/components/demo-video";
type Props = { params: { lang: string; slug: string } };
export function generateStaticParams() {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({ lang: p.locale, slug: p.slug }));
}
function getProject(params: Props["params"]) {
	return allProjects.find(
		(p) => p.published && p.locale === params.lang && p.slug === params.slug,
	);
}
export function generateMetadata({ params }: Props): Metadata {
	const p = getProject(params);
	if (!p || !isLocale(params.lang)) return {};
	return {
		title: p.title,
		description: p.description,
		alternates: languageAlternates(params.lang, `/projects/${p.slug}`),
		robots:
			p.presentation === "hidden" ? { index: false, follow: true } : undefined,
		openGraph: {
			title: p.title,
			description: p.description,
			images: p.img
				? [{ url: p.img, alt: p.title }]
				: [{ url: "/og-me.jpg", alt: p.title }],
		},
	};
}
export default function CasePage({ params }: Props) {
	if (!isLocale(params.lang)) notFound();
	if (projectAliases[params.slug])
		permanentRedirect(
			`/${params.lang}/projects/${projectAliases[params.slug]}`,
		);
	const project = getProject(params);
	if (!project) notFound();
	const locale = params.lang;
	const d = getDictionary(locale);
	const related = projectsFor(locale)
		.filter(
			(p) =>
				p.slug !== project.slug &&
				p.category === project.category &&
				["featured", "listed"].includes(p.presentation),
		)
		.slice(0, 3);
	return (
		<main id="main" className="shell page-main case-page">
			<Link className="text-link back-link" href={`/${locale}/projects`}>
				<ArrowLeft size={17} aria-hidden="true" />
				{d.work.back}
			</Link>
			<header className="case-heading">
				<h1>{project.title}</h1>
				<p>{project.description}</p>
				{project.presentation === "hidden" && (
					<p className="historical-note">{d.work.hiddenIntro}</p>
				)}
				<div className="case-meta">
					<div>
						<span>{d.work.role}</span>
						<p>{project.role}</p>
					</div>
					<div>
						<span>{d.work.stack}</span>
						<p>{project.tags?.join(" · ")}</p>
					</div>
				</div>
				<div className="actions">
					{project.socialPost && (
						<a
							className="button primary"
							href={project.socialPost}
							target="_blank"
							rel="noopener noreferrer"
						>
							{d.lab.post}
							<ArrowUpRight size={17} aria-hidden="true" />
						</a>
					)}
					{project.url && (
						<a
							className="button primary"
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{d.work.visit}
							<ArrowUpRight size={17} aria-hidden="true" />
						</a>
					)}
					{project.repositoryVisibility === "public" && project.repository && (
						<a
							className="button secondary"
							href={project.repository}
							target="_blank"
							rel="noopener noreferrer"
						>
							{d.work.public}
							<ArrowUpRight size={17} aria-hidden="true" />
						</a>
					)}
					{project.repositoryVisibility === "private" && (
						<span className="muted">{d.work.private}</span>
					)}
				</div>
			</header>
			<div className="case-visual">
				{project.video && project.videoPoster ? (
					<DemoVideo
						src={project.video}
						poster={project.videoPoster}
						title={project.title}
						locale={locale}
					/>
				) : (
					<ProjectVisual project={project} priority />
				)}
			</div>
			<article className="prose-case">
				<Mdx code={project.body.code} />
			</article>
			{related.length > 0 && (
				<section className="related">
					<h2>{d.work.related}</h2>
					<div className="project-grid">
						{related.map((p) => (
							<ProjectPreview key={p.slug} project={p} />
						))}
					</div>
				</section>
			)}
		</main>
	);
}
