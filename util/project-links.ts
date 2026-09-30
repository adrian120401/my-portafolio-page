import type { Project } from "contentlayer/generated";
export function projectHref(project: Pick<Project, "locale" | "slug">) {
	return `/${project.locale}/projects/${project.slug}`;
}
