import { ImageResponse } from "next/server";
import { getDictionary, isLocale, siteUrl } from "@/util/i18n";
import { siteName } from "@/util/metadata";

export const runtime = "edge";

// Next 13's image renderer requires static font faces, not variable fonts.
const regularFont = fetch(
	new URL("../../../public/fonts/Manrope-Social-Regular.ttf", import.meta.url),
).then((response) => response.arrayBuffer());
const boldFont = fetch(
	new URL("../../../public/fonts/Manrope-Social-Bold.ttf", import.meta.url),
).then((response) => response.arrayBuffer());

// Text only: callers cannot make the renderer fetch arbitrary external assets.
function text(value: string | null, fallback: string, limit: number) {
	return (value || fallback)
		.replace(/[\u0000-\u001f\u007f]/g, " ")
		.trim()
		.slice(0, limit);
}

export async function GET(request: Request) {
	const params = new URL(request.url).searchParams;
	const lang = params.get("lang");
	const locale = lang && isLocale(lang) ? lang : "en";
	const d = getDictionary(locale);
	const title = text(params.get("title"), d.hero.title.join(" "), 110);
	const description = text(params.get("description"), d.meta.description, 200);
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				background: "#0b1016",
				color: "#f2f1ea",
				padding: "48px 60px",
				fontFamily: "Manrope",
				fontWeight: 400,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottom: "1px solid #293541",
					paddingBottom: 24,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 38,
						fontWeight: 700,
						letterSpacing: "-2px",
					}}
				>
					ADR<span style={{ color: "#8bd3df" }}>.</span>
				</div>
				<div style={{ display: "flex", fontSize: 22, color: "#aeb9c6" }}>
					{new URL(siteUrl).host}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					flex: 1,
					padding: "20px 0",
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: title.length > 65 ? 54 : title.length > 42 ? 66 : 82,
						fontWeight: 700,
						lineHeight: 1.08,
						letterSpacing: "-3px",
						maxWidth: 1060,
					}}
				>
					{title}
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 25,
						lineHeight: 1.5,
						color: "#aeb9c6",
						marginTop: 24,
						maxWidth: 1020,
					}}
				>
					{description}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderTop: "1px solid #293541",
					paddingTop: 24,
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<div style={{ display: "flex", fontSize: 26 }}>{siteName}</div>
					<div style={{ display: "flex", fontSize: 21, color: "#8bd3df" }}>
						{d.hero.role}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						fontSize: 20,
						color: "#aeb9c6",
					}}
				>
					<div
						style={{
							width: 8,
							height: 8,
							borderRadius: "50%",
							background: "#e7a77d",
							display: "flex",
						}}
					/>
					Uruguay
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Manrope",
					data: await regularFont,
					style: "normal",
					weight: 400,
				},
				{ name: "Manrope", data: await boldFont, style: "normal", weight: 700 },
			],
			headers: {
				"Cache-Control":
					"public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
				"X-Content-Type-Options": "nosniff",
			},
		},
	);
}
