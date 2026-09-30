import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "contentlayer/generated";
import { ProjectVisual } from "@/app/components/project-visual";
import { getDictionary, type Locale } from "@/util/i18n";
import { projectHref } from "@/util/project-links";
import { DemoVideo } from "@/app/components/demo-video";

export function ProjectPreview({
	project,
	editorial = false,
}: {
	project: Omit<Project, "body" | "_raw" | "_id" | "type">;
	editorial?: boolean;
}) {
	const dictionary = getDictionary(project.locale as Locale);
	return (
		<article className={editorial ? "project-editorial" : "project-tile"}>
			{project.video && project.videoPoster ? (
				<DemoVideo
					src={project.video}
					poster={project.videoPoster}
					title={project.title}
					locale={project.locale as Locale}
				/>
			) : (
				<Link
					className="project-image-link"
					href={projectHref(project)}
					aria-label={`${dictionary.work.case}: ${project.title}`}
				>
					<ProjectVisual project={project} />
					<span className="image-action">
						<ArrowUpRight size={24} aria-hidden="true" />
					</span>
				</Link>
			)}
			<div className="project-preview-copy">
				<h3>
					<Link href={projectHref(project)}>{project.title}</Link>
				</h3>
				<p>{project.summary}</p>
				<div className="project-kind">
					<span>
						{project.category === "lab"
							? dictionary.lab.experimental
							: dictionary.work.real}
					</span>
					<span>
						{project.repositoryVisibility === "private"
							? dictionary.work.private
							: project.tags?.slice(0, 2).join(" / ")}
					</span>
				</div>
				{project.role !== dictionary.lab.experimental && (
					<p className="project-role">{project.role}</p>
				)}
				<Link className="text-link" href={projectHref(project)}>
					{dictionary.work.case}
					<ArrowRight size={17} aria-hidden="true" />
				</Link>
				{project.socialPost && (
					<a
						className="text-link demo-post"
						href={project.socialPost}
						target="_blank"
						rel="noopener noreferrer"
					>
						{dictionary.lab.post}
						<ArrowUpRight size={17} aria-hidden="true" />
					</a>
				)}
			</div>
		</article>
	);
}
