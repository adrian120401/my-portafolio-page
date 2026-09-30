import Image from "next/image";
import type { Project } from "contentlayer/generated";
import { getDictionary, type Locale } from "@/util/i18n";

export function ProjectVisual({
	project,
	priority = false,
}: {
	project: Pick<Project, "title" | "locale" | "slug" | "category" | "img">;
	priority?: boolean;
}) {
	const locale = project.locale as Locale;
	const { work } = getDictionary(locale);
	if (project.img)
		return (
			<Image
				src={project.img}
				alt={`${work.projectImage} ${project.title}`}
				width={1440}
				height={1000}
				sizes="(max-width: 760px) 100vw, (max-width: 1100px) 65vw, 800px"
				className="project-screenshot"
				priority={priority}
			/>
		);
	const isResume = project.slug === "my-resume";
	const nodes = isResume
		? ["JSON", "HTML", "PDF"]
		: project.category === "lab" &&
		  ["signal", "powersigns", "game-hands"].includes(project.slug)
		? [
				"CAPTURE",
				"LANDMARKS",
				project.slug === "signal" ? "CLASSIFY" : "RENDER",
		  ]
		: ["DOMAIN", "SERVICES", "DATA"];
	return (
		<div className={`project-diagram diagram-${project.slug}`}>
			<svg
				viewBox="0 0 800 470"
				role="img"
				aria-label={`${work.diagramImage} ${project.title}`}
			>
				<title>{`${work.diagramImage} ${project.title}`}</title>
				<g fill="none" stroke="currentColor" strokeWidth="1.4">
					<rect x="85" y="126" width="172" height="188" rx="12" />
					<rect x="314" y="126" width="172" height="188" rx="12" />
					<rect x="543" y="126" width="172" height="188" rx="12" />
					<path d="M257 220h57m172 0h57" />
					<path d="m302 213 12 7-12 7m229-14 12 7-12 7" />
					{isResume ? (
						<>
							<path d="M140 170h60m-60 18h45m-45 18h55m-55 18h30" />
							<path d="m371 178-18 18 18 18m58-36 18 18-18 18m-20-44-18 52" />
							<path d="M596 161h52v77h-52zm10 18h31m-31 15h31m-31 15h20" />
						</>
					) : (
						<>
							<path d="M137 173h66v57h-66zM145 165v8m50-8v8m-50 57v8m50-8v8" />
							<circle cx="377" cy="175" r="5" />
							<circle cx="422" cy="184" r="5" />
							<circle cx="390" cy="205" r="5" />
							<circle cx="425" cy="226" r="5" />
							<path d="m377 175 45 9-32 21 35 21m-48-51 13 30" />
							<path d="M579 229h96m-96-49v49m16-17v17m15-32v32m16-46v46m17-24v24m17-62v62" />
						</>
					)}
				</g>
				<g
					fill="currentColor"
					fontFamily="monospace"
					fontSize="15"
					textAnchor="middle"
				>
					{nodes.map((node, index) => (
						<text key={node} x={171 + index * 229} y="285">
							{node}
						</text>
					))}
				</g>
				<text
					x="400"
					y="375"
					fill="#f2f1ea"
					fontSize="34"
					fontFamily="sans-serif"
					textAnchor="middle"
				>
					{project.title}
				</text>
			</svg>
		</div>
	);
}
