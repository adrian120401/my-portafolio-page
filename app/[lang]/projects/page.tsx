import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/util/i18n";
import { languageAlternates } from "@/util/metadata";
import { projectsFor } from "@/util/projects";
import { ProjectGallery } from "@/app/components/project-gallery";
import { ProjectPreview } from "@/app/components/project-preview";
export function generateMetadata({
	params,
}: { params: { lang: string } }): Metadata {
	if (!isLocale(params.lang)) return {};
	const d = getDictionary(params.lang);
	return {
		title: d.meta.work,
		description: d.work.intro,
		alternates: languageAlternates(params.lang, "/projects"),
	};
}
export default function ProjectsPage({
	params,
	searchParams,
}: { params: { lang: string }; searchParams: { category?: string } }) {
	if (!isLocale(params.lang)) notFound();
	const locale = params.lang;
	const d = getDictionary(locale);
	const projects = projectsFor(locale);
	const visible = projects
		.filter((p) => p.presentation === "featured" || p.presentation === "listed")
		.map(({ body, _raw, _id, type, ...preview }) => preview);
	return (
		<main id="main" className="shell page-main">
			<div className="page-heading">
				<h1>{d.work.title}</h1>
				<p>{d.work.intro}</p>
			</div>
			<ProjectGallery
				projects={visible}
				locale={locale}
				initialCategory={searchParams.category}
			/>
			<details className="archive">
				<summary>{d.work.archiveToggle}</summary>
				<p>{d.work.archiveIntro}</p>
				<div className="project-grid">
					{projects
						.filter((p) => p.presentation === "archived")
						.map((project) => (
							<ProjectPreview key={project.slug} project={project} />
						))}
				</div>
			</details>
		</main>
	);
}
