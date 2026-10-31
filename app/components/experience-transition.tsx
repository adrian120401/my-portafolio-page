"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { getDictionary, type Locale } from "@/util/i18n";
import { experience } from "@/content/profile";

/** Product thinking → real source → shipped interfaces, in one continuous scene. */
export function ExperienceTransition({
	children,
	locale,
}: { children: ReactNode; locale: Locale }) {
	const section = useRef<HTMLDivElement>(null);
	const artwork = useRef<HTMLDivElement>(null);
	const { journey } = getDictionary(locale);
	const job = experience[0];
	useEffect(() => {
		const element = section.current;
		const art = artwork.current;
		if (!element || !art) return;
		const preference = matchMedia("(prefers-reduced-motion: reduce)");
		let release: (() => void) | undefined;
		function start() {
			release?.();
			if (!element || !art) return;
			element.dataset.motion = "static";
			if (preference.matches) return;
			let cancelled = false;
			let dispose: (() => void) | undefined;
			element.dataset.motion = "pending";
			const near = new IntersectionObserver(
				(entries) => {
					if (!entries.some((entry) => entry.isIntersecting)) return;
					near.disconnect();
					const images = Array.from(art.querySelectorAll("img"));
					images.forEach((image) => {
						image.loading = "eager";
					});
					Promise.all([
						import("@/app/components/experience-journey"),
						document.fonts.ready,
						Promise.allSettled(images.map((image) => image.decode())),
					])
						.then(([{ createExperienceJourney }]) => {
							if (!cancelled) dispose = createExperienceJourney(element, art);
						})
						.catch(() => {
							if (!cancelled) element.dataset.motion = "static";
						});
				},
				{ rootMargin: "600px 0px" },
			);
			near.observe(element);
			release = () => {
				cancelled = true;
				near.disconnect();
				dispose?.();
				element.style.removeProperty("--experience-reveal");
			};
		}
		start();
		preference.addEventListener("change", start);
		return () => {
			release?.();
			preference.removeEventListener("change", start);
		};
	}, []);

	return (
		<div ref={section} className="experience-transition">
			<div className="experience-stage">
				<div ref={artwork} className="experience-art" aria-hidden="true">
					<div className="journey-rest shell">
						<p>
							{journey.stages.map((stage, index) => (
								<span key={stage}>
									{index > 0 && <b>→</b>}
									{stage}
								</span>
							))}
						</p>
					</div>
					<div className="journey-chapters shell">
						{journey.stages.map((stage, index) => (
							<span key={stage}>
								<i>0{index + 1}</i>
								{stage}
							</span>
						))}
					</div>
					<div className="journey-window">
						<div className="journey-canvas">
							<svg
								aria-hidden="true"
								className="journey-trace"
								viewBox="0 0 2200 2500"
								fill="none"
							>
								<title>{journey.stages.join(" → ")}</title>
								<path
									className="journey-trace-base"
									d="M100 625H1760Q1840 625 1840 705V1395Q1840 1475 1760 1475H180Q100 1475 100 1555V2245Q100 2325 180 2325H1840"
								/>
								<path
									className="journey-trace-active"
									pathLength="1"
									d="M100 625H1760Q1840 625 1840 705V1395Q1840 1475 1760 1475H180Q100 1475 100 1555V2245Q100 2325 180 2325H1840"
								/>
							</svg>
							<div className="journey-row journey-idea">
								<div className="journey-type">
									<span className="journey-index">01</span>
									<p>
										{journey.idea[0]}
										<br />
										<em>{journey.idea[1]}</em>
									</p>
								</div>
								<div className="journey-blueprint">
									<svg viewBox="0 0 760 530" fill="none" aria-hidden="true">
										<title>{journey.product}</title>
										<path d="M85 265H280M280 265V95H560M280 265H560M280 265V435H560" />
										<path className="blueprint-dash" d="M670 95H725V435H670" />
										<circle cx="85" cy="265" r="12" />
										<circle cx="280" cy="265" r="6" />
										{[95, 265, 435].map((y) => (
											<circle key={y} cx="560" cy={y} r="5" />
										))}
									</svg>
									<span className="blueprint-origin">{journey.product}</span>
									<span className="blueprint-node blueprint-mobile">
										Mobile<small>React Native / Expo</small>
									</span>
									<span className="blueprint-node blueprint-web">
										Web<small>React / TypeScript</small>
									</span>
									<span className="blueprint-node blueprint-api">
										Backend<small>Java / NestJS</small>
									</span>
								</div>
							</div>
							<div className="journey-row journey-code">
								<div className="journey-type">
									<span className="journey-index">02</span>
									<p>
										{journey.code[0]}
										<br />
										<em>{journey.code[1]}</em>
									</p>
								</div>
								<div className="journey-source">
									<p className="journey-filename">
										content/profile.ts <span>TypeScript</span>
									</p>
									<pre>
										<code>
											<span className="source-line">
												<b>export const</b> experience = [
											</span>
											<span className="source-line">{"  {"}</span>
											<span className="source-line">
												{"    company: "}
												<em>"{job.company}"</em>,
											</span>
											<span className="source-line">
												{"    role: { en: "}
												<em>"{job.role.en}"</em>,
											</span>
											<span className="source-line">
												{"            es: "}
												<em>"{job.role.es}"</em>
												{" },"}
											</span>
											<span className="source-line">{"    stack: ["}</span>
											{[job.stack.slice(0, 2), job.stack.slice(2)].map(
												(stack) => (
													<span className="source-line" key={stack.join()}>
														{"      "}
														<em>
															{stack.map((tech) => `"${tech}"`).join(", ")}
														</em>
														,
													</span>
												),
											)}
											<span className="source-line">{"    ],"}</span>
											<span className="source-line">
												{"  },"}
												<span className="source-comment"> // …</span>
											</span>
											<span className="source-line">];</span>
										</code>
									</pre>
								</div>
							</div>
							<div className="journey-row journey-product">
								<div className="journey-type">
									<span className="journey-index">03</span>
									<p>
										{journey.delivery[0]}
										<br />
										<em>{journey.delivery[1]}</em>
									</p>
								</div>
								<div className="journey-products">
									<figure className="journey-photo photo-front">
										<Image
											src="/projects/nacho-gonzalez-pf.jpg"
											alt=""
											width={1440}
											height={1000}
											sizes="(max-width: 767px) 65vw, 700px"
										/>
										<figcaption>Nacho González PF</figcaption>
									</figure>
									<figure className="journey-photo photo-back">
										<Image
											src="/projects/la-mision.jpg"
											alt=""
											width={1440}
											height={1000}
											sizes="(max-width: 767px) 65vw, 700px"
										/>
										<figcaption>La Misión Race</figcaption>
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="experience-heading">{children}</div>
			</div>
		</div>
	);
}
