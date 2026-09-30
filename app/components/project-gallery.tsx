"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Project } from "contentlayer/generated";
import { getDictionary, type Locale } from "@/util/i18n";
import { ProjectPreview } from "@/app/components/project-preview";

type PreviewProject = Omit<Project, "body" | "_raw" | "_id" | "type">;

export function ProjectGallery({
	projects,
	locale,
	initialCategory,
}: { projects: PreviewProject[]; locale: Locale; initialCategory?: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const { work } = getDictionary(locale);
	const categories = ["all", "product", "client", "lab"];
	const [requested, setRequested] = useState(initialCategory || "all");
	useEffect(() => {
		setRequested(initialCategory || "all");
	}, [initialCategory]);
	const selected = categories.includes(requested) ? requested : "all";
	const matches = projects.filter(
		(p) => selected === "all" || p.category === selected,
	);
	function filter(category: string) {
		setRequested(category);
		const query = new URLSearchParams(window.location.search);
		if (category === "all") query.delete("category");
		else query.set("category", category);
		router.replace(`${pathname}${query.size ? `?${query}` : ""}`, {
			scroll: false,
		});
	}
	return (
		<>
			<div className="project-filters" role="group" aria-label={work.filter}>
				{categories.map((category, i) => (
					<button
						key={category}
						type="button"
						aria-pressed={selected === category}
						onClick={() => filter(category)}
					>
						{work.filters[i]}
					</button>
				))}
				<span className="result-count" aria-live="polite">
					{matches.length} {work.count}
				</span>
			</div>
			{matches.length ? (
				<div className="project-grid">
					{matches.map((project) => (
						<ProjectPreview key={project.slug} project={project} />
					))}
				</div>
			) : (
				<div className="empty-state">
					<p>{work.noResults}</p>
					<button
						className="text-link"
						type="button"
						onClick={() => filter("all")}
					>
						{work.reset}
					</button>
				</div>
			)}
		</>
	);
}
