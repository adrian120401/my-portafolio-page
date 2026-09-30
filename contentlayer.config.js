import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	path: {
		type: "string",
		resolve: (doc) =>
			`/${doc.locale}/projects/${doc._raw.flattenedPath.split("/").pop()}`,
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").pop(),
	},
};

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/*/*.mdx",
	contentType: "mdx",

	fields: {
		locale: { type: "enum", options: ["en", "es"], required: true },
		category: {
			type: "enum",
			options: ["product", "client", "lab"],
			required: true,
		},
		presentation: {
			type: "enum",
			options: ["featured", "listed", "archived", "hidden"],
			required: true,
		},
		featuredOrder: { type: "number" },
		repositoryVisibility: {
			type: "enum",
			options: ["public", "private", "none"],
			default: "none",
		},
		role: { type: "string", required: true },
		summary: { type: "string", required: true },
		published: {
			type: "boolean",
		},
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		date: {
			type: "date",
		},
		url: {
			type: "string",
		},
		repository: {
			type: "string",
		},
		img: {
			type: "string",
		},
		video: { type: "string" },
		videoPoster: { type: "string" },
		socialPost: { type: "string" },
		work: {
			type: "boolean",
		},
		doc: {
			type: "string",
		},
		tags: {
			type: "list",
			of: {
				type: "string",
			},
		},
	},
	computedFields,
}));

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Page, Project],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
