import { NextResponse, type NextRequest } from "next/server";
import { isLocale, type Locale } from "@/util/i18n";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	if (isLocale(pathname.split("/")[1])) return NextResponse.next();
	const saved = request.cookies.get("portfolio-language")?.value;
	let locale: Locale = "en";
	if (saved && isLocale(saved)) locale = saved;
	else {
		const languages = (request.headers.get("accept-language") || "")
			.split(",")
			.map((entry) => {
				const [language, weight] = entry.trim().split(";");
				return {
					language: language.toLowerCase().split("-")[0],
					quality: weight ? Number(weight.replace("q=", "")) : 1,
				};
			})
			.filter((entry) => entry.quality > 0 && Number.isFinite(entry.quality))
			.sort((a, b) => b.quality - a.quality);
		const match = languages.find((entry) => isLocale(entry.language));
		if (match && isLocale(match.language)) locale = match.language;
	}
	const destination = request.nextUrl.clone();
	destination.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
	return NextResponse.redirect(destination);
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
