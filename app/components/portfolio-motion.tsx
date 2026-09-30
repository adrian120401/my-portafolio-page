"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ease = "cubic-bezier(.16,1,.3,1)";
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function PortfolioMotion() {
	const pathname = usePathname();
	const rail = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const preference = matchMedia("(prefers-reduced-motion: reduce)");
		let release: (() => void) | undefined;
		function start() {
			release?.();
			if (preference.matches) return;
			const scope = document.querySelector("main");
			if (!scope) return;
			const animations = new Set<Animation>();
			const observed = new WeakSet<Element>();
			const stages = new Set<HTMLElement>();
			const allStages = new Set<HTMLElement>();
			const images = new Set<HTMLElement>();
			let frame = 0;
			function animate(element: Element, frames: Keyframe[], duration: number) {
				const animation = element.animate(frames, { duration, easing: ease });
				animations.add(animation);
				animation.onfinish = () => animations.delete(animation);
			}
			const entrances = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (!entry.isIntersecting) continue;
						entrances.unobserve(entry.target);
						if (entry.target.matches("h2")) {
							animate(
								entry.target,
								[
									{
										clipPath: "inset(0 0 60% 0)",
										transform: "translateY(14px)",
									},
									{ clipPath: "inset(0)", transform: "translateY(0)" },
								],
								650,
							);
						} else if (entry.target.matches(".project-image-link")) {
							animate(
								entry.target,
								[
									{ clipPath: "inset(0 22% 0 0 round 12px)" },
									{ clipPath: "inset(0 0 0 0 round 12px)" },
								],
								750,
							);
						} else if (entry.target.matches(".experience-row")) {
							const date = entry.target.querySelector(".experience-date");
							if (date)
								animate(
									date,
									[
										{ transform: "translateX(-14px)", color: "#8bd3df" },
										{ transform: "translateX(0)", color: "#aeb9c6" },
									],
									500,
								);
						}
					}
				},
				{ threshold: 0.12 },
			);
			const visibility = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) stages.add(entry.target as HTMLElement);
						else {
							stages.delete(entry.target as HTMLElement);
							entry.target.classList.remove("is-reading");
						}
					}
					schedule();
				},
				{ rootMargin: "100px" },
			);
			function collect() {
				for (const element of Array.from(
					scope?.querySelectorAll(
						".section-heading h2, .about-intro h2, .related h2, .resume-downloads h2, .project-image-link, .experience-row, .project-editorial",
					) ?? [],
				)) {
					if (observed.has(element)) continue;
					observed.add(element);
					entrances.observe(element);
					if (element.matches(".project-editorial, .experience-row")) {
						visibility.observe(element);
						allStages.add(element as HTMLElement);
					}
					if (element.matches(".project-image-link"))
						images.add(element as HTMLElement);
				}
			}
			function render() {
				frame = 0;
				const distance = document.documentElement.scrollHeight - innerHeight;
				if (rail.current)
					rail.current.style.transform = `scaleX(${
						distance > 0 ? clamp(scrollY / distance) : 0
					})`;
				for (const element of Array.from(stages)) {
					const rect = element.getBoundingClientRect();
					const phase = clamp((rect.top - innerHeight * 0.12) / innerHeight);
					if (element.matches(".project-editorial"))
						element.style.setProperty("--unfold", String(phase));
					else
						element.classList.toggle(
							"is-reading",
							rect.top < innerHeight * 0.65 && rect.bottom > innerHeight * 0.3,
						);
				}
			}
			function schedule() {
				if (!frame && !document.hidden) frame = requestAnimationFrame(render);
			}
			function pointer(event: PointerEvent) {
				if (event.pointerType !== "mouse") return;
				const image = (event.target as Element).closest<HTMLElement>(
					".project-image-link",
				);
				if (!image) return;
				const rect = image.getBoundingClientRect();
				image.style.setProperty(
					"--pointer-x",
					`${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`,
				);
				image.style.setProperty(
					"--pointer-y",
					`${((event.clientY - rect.top) / rect.height - 0.5) * -3}deg`,
				);
			}
			function leave(event: PointerEvent) {
				const image = (event.target as Element).closest<HTMLElement>(
					".project-image-link",
				);
				if (
					!image ||
					(event.relatedTarget instanceof Node &&
						image.contains(event.relatedTarget))
				)
					return;
				image.style.removeProperty("--pointer-x");
				image.style.removeProperty("--pointer-y");
			}
			const mutations = new MutationObserver(collect);
			mutations.observe(scope, { childList: true, subtree: true });
			collect();
			schedule();
			document.documentElement.classList.add("journey-motion");
			window.addEventListener("scroll", schedule, { passive: true });
			window.addEventListener("resize", schedule, { passive: true });
			document.addEventListener("visibilitychange", schedule);
			scope.addEventListener("pointermove", pointer);
			scope.addEventListener("pointerout", leave);
			release = () => {
				cancelAnimationFrame(frame);
				entrances.disconnect();
				visibility.disconnect();
				mutations.disconnect();
				animations.forEach((animation) => animation.cancel());
				window.removeEventListener("scroll", schedule);
				window.removeEventListener("resize", schedule);
				document.removeEventListener("visibilitychange", schedule);
				scope.removeEventListener("pointermove", pointer);
				scope.removeEventListener("pointerout", leave);
				document.documentElement.classList.remove("journey-motion");
				allStages.forEach((element) => {
					element.style.removeProperty("--unfold");
					element.classList.remove("is-reading");
				});
				images.forEach((element) => {
					element.style.removeProperty("--pointer-x");
					element.style.removeProperty("--pointer-y");
				});
				if (rail.current) rail.current.style.transform = "scaleX(0)";
			};
		}
		start();
		preference.addEventListener("change", start);
		return () => {
			release?.();
			preference.removeEventListener("change", start);
		};
	}, [pathname]);
	return (
		<div className="reading-rail" aria-hidden="true">
			<div ref={rail} />
		</div>
	);
}
