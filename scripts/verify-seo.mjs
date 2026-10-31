import assert from "node:assert/strict";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { request } from "node:http";

const base = process.argv[2] || "http://127.0.0.1:3001";
const canonicalOrigin = "https://www.adriandelosreyes.me";
const decode = (value) =>
	value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const attribute = (tag, key) =>
	decode(tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1] || "");
const meta = (html, key) => {
	const tag = [...html.matchAll(/<meta\b[^>]*>/g)]
		.map((match) => match[0])
		.find(
			(value) =>
				attribute(value, "name") === key ||
				attribute(value, "property") === key,
		);
	return tag ? attribute(tag, "content") : "";
};
const link = (html, relation, language) => {
	const tag = [...html.matchAll(/<link\b[^>]*>/g)]
		.map((match) => match[0])
		.find(
			(value) =>
				attribute(value, "rel") === relation &&
				(!language || attribute(value, "hrefLang").toLowerCase() === language),
		);
	return tag ? attribute(tag, "href") : "";
};
async function get(path, options = {}) {
	const response = await fetch(new URL(path, base), {
		signal: AbortSignal.timeout(60000),
		...options,
	});
	assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
	return response;
}

const generated = ".contentlayer/generated/Project";
const projects = await Promise.all(
	(
		await readdir(generated)
	)
		.filter((file) => file.endsWith(".mdx.json"))
		.map(async (file) =>
			JSON.parse(await readFile(`${generated}/${file}`, "utf8")),
		),
);
const report = {
	pages: [],
	images: [],
	sitemap: 0,
	redirects: false,
	localeRedirects: false,
};
const images = new Set();
for (const locale of ["en", "es"]) {
	const localized = projects.filter(
		(project) => project.locale === locale && project.published,
	);
	const paths = [
		`/${locale}`,
		`/${locale}/contact`,
		`/${locale}/projects`,
		...localized.map((project) => `/${locale}/projects/${project.slug}`),
	];
	for (const path of paths) {
		const html = await (await get(path)).text();
		const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
		assert(
			title && meta(html, "description"),
			`${path}: missing title / description`,
		);
		assert.equal(link(html, "canonical"), canonicalOrigin + path, path);
		assert.equal(meta(html, "og:url"), canonicalOrigin + path, path);
		assert.equal(meta(html, "og:title"), title, path);
		assert.equal(meta(html, "twitter:title"), title, path);
		assert.equal(meta(html, "og:description"), meta(html, "description"), path);
		assert.equal(
			meta(html, "twitter:description"),
			meta(html, "description"),
			path,
		);
		assert.equal(meta(html, "twitter:card"), "summary_large_image", path);
		assert.equal(meta(html, "og:image:width"), "1200", path);
		assert.equal(meta(html, "og:image:height"), "630", path);
		assert.equal(meta(html, "og:image:type"), "image/png", path);
		assert.equal(meta(html, "twitter:image"), meta(html, "og:image"), path);
		assert(meta(html, "og:image:alt"), path);
		assert(
			meta(html, "og:image").startsWith(`${canonicalOrigin}/social/og.png?`),
			path,
		);
		const suffix = path.slice(3);
		for (const language of ["en", "es"])
			assert.equal(
				link(html, "alternate", language),
				`${canonicalOrigin}/${language}${suffix}`,
				path,
			);
		assert.equal(
			link(html, "alternate", "x-default"),
			`${canonicalOrigin}/en${suffix}`,
			path,
		);
		const json = [
			...html.matchAll(
				/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
			),
		].map((match) => JSON.parse(match[1]));
		const graph = json.flatMap((value) => value["@graph"] || [value]);
		assert(
			graph.some((value) => value["@type"] === "Person"),
			path,
		);
		assert(
			graph.some((value) => value["@type"] === "WebSite"),
			path,
		);
		if (suffix.startsWith("/projects/")) {
			assert(
				graph.some((value) => value["@type"] === "CreativeWork"),
				path,
			);
			assert(
				graph.some((value) => value["@type"] === "BreadcrumbList"),
				path,
			);
		}
		const hidden =
			localized.find((project) => path.endsWith(`/projects/${project.slug}`))
				?.presentation === "hidden";
		assert.equal(/noindex/.test(meta(html, "robots")), hidden, path);
		report.pages.push(path);
		if (
			!suffix ||
			suffix === "/contact" ||
			suffix.endsWith("/holographic-gestures")
		)
			images.add(meta(html, "og:image"));
	}
}
for (const image of images) {
	const url = new URL(image);
	const response = await get(url.pathname + url.search);
	assert(response.headers.get("content-type")?.startsWith("image/png"), image);
	const png = Buffer.from(await response.arrayBuffer());
	assert(png.length > 1000, `${image}: empty / invalid image`);
	assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", image);
	assert.equal(png.readUInt32BE(16), 1200, image);
	assert.equal(png.readUInt32BE(20), 630, image);
	const file = `.impeccable/build/seo-preview-${report.images.length}.png`;
	await writeFile(file, png);
	assert(response.headers.get("cache-control")?.includes("s-maxage"), image);
	assert.equal(
		response.headers.get("x-robots-tag"),
		null,
		"Social images must remain crawlable",
	);
	report.images.push(file);
}
const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert(robots.includes("Allow: /"));
const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(match) => match[1],
);
const expected = report.pages.filter(
	(path) =>
		!projects.some(
			(project) =>
				project.presentation === "hidden" &&
				path === `/${project.locale}/projects/${project.slug}`,
		),
);
assert.equal(new Set(urls).size, expected.length);
for (const path of expected)
	assert(urls.includes(canonicalOrigin + path), path);
report.sitemap = urls.length;
const filtered = await (await get("/en/projects?category=lab")).text();
assert.equal(link(filtered, "canonical"), `${canonicalOrigin}/en/projects`);
for (const locale of ["en", "es"]) {
	const response = await fetch(`${base}/`, {
		redirect: "manual",
		headers: { "accept-language": locale },
		signal: AbortSignal.timeout(15000),
	});
	assert.equal(response.status, 307);
	assert.equal(
		new URL(response.headers.get("location"), base).pathname,
		`/${locale}`,
	);
}
report.localeRedirects = true;
// Native HTTP permits the Host override; Node fetch normalizes that header.
const legacy = await new Promise((resolve, reject) => {
	const req = request(
		new URL("/en/projects/moka-ahiva?ref=seo", base),
		{
			headers: { Host: "adriandelosreyes.vercel.app" },
			timeout: 15000,
		},
		(response) => {
			response.resume();
			resolve({
				status: response.statusCode,
				location: response.headers.location,
			});
		},
	);
	req.on("error", reject);
	req.on("timeout", () => req.destroy(new Error("Legacy redirect timed out")));
	req.end();
});
assert.equal(legacy.status, 308);
assert.equal(
	legacy.location,
	`${canonicalOrigin}/en/projects/moka-ahiva?ref=seo`,
);
report.redirects = true;
await writeFile(
	".impeccable/build/seo-verification.json",
	JSON.stringify(report, null, 2),
);
console.log(
	`PASS: ${report.pages.length} localized pages, ${report.images.length} PNG previews, ${report.sitemap} sitemap entries, structured data, canonical / hreflang / Twitter / Open Graph, filters and redirects.`,
);
