import {
	clamp01,
	journeyState,
	smoothProgress,
} from "@/util/experience-motion";

/** One on-demand loop translates a DOM canvas without handling scroll input. */
export function createExperienceJourney(
	section: HTMLElement,
	art: HTMLElement,
) {
	const windowElement = art.querySelector<HTMLElement>(".journey-window");
	const canvas = art.querySelector<HTMLElement>(".journey-canvas");
	const photos = Array.from(
		art.querySelectorAll<HTMLElement>(".journey-photo"),
	);
	if (!windowElement || !canvas) return () => {};
	const frameElement = windowElement;
	const canvasElement = canvas;
	let frame = 0;
	let disposed = false;
	let inView = false;
	let visible = false;
	let scale = 1;
	let target = 0;
	let progress = 0;
	let previousTime = 0;
	function readTarget() {
		target = clamp01(
			-section.getBoundingClientRect().top /
				Math.max(1, section.offsetHeight - window.innerHeight),
		);
	}
	function schedule() {
		if (!frame && visible && !disposed) frame = requestAnimationFrame(render);
	}
	function draw() {
		const state = journeyState(progress);
		canvasElement.style.transform = `translate3d(${state.camera.x * scale}px, ${
			state.camera.y * scale
		}px, 0) scale(${scale})`;
		art.style.setProperty("--journey-opacity", String(state.opacity));
		art.style.setProperty("--journey-trace", String(state.trace));
		art.dataset.chapter =
			state.camera.y > -425 ? "0" : state.camera.y > -1275 ? "1" : "2";
		section.style.setProperty("--experience-reveal", String(state.heading));
		photos.forEach((photo, index) => {
			const x = Math.max(-1, Math.min(1, (state.camera.x + 900) / 900));
			const ease =
				Math.sign(x) *
				(Math.abs(x) < 0.5 ? 2 * x ** 2 : 1 - (-2 * Math.abs(x) + 2) ** 2 / 2);
			photo.style.transform = `translate3d(${
				ease * (index ? -24 : 30)
			}px, 0, 0) rotate(${(index ? 3 : -3) + ease * 2}deg)`;
		});
	}
	function render(now: number) {
		frame = 0;
		if (!visible || disposed) return;
		const delta = previousTime
			? Math.min((now - previousTime) / 1000, 0.1)
			: 1 / 60;
		previousTime = now;
		progress = smoothProgress(progress, target, delta);
		draw();
		if (progress !== target) schedule();
	}
	function scroll() {
		readTarget();
		if (!visible) {
			// A fast anchor jump can bypass the artwork. Its content heading
			// must still be readable without running background animation.
			progress = target;
			section.style.setProperty(
				"--experience-reveal",
				String(journeyState(target).heading),
			);
			return;
		}
		schedule();
	}
	function resize() {
		scale = Math.min(
			frameElement.clientWidth / 1000,
			frameElement.clientHeight / 700,
		);
		readTarget();
		draw();
		schedule();
	}
	function visibility() {
		visible = inView && !document.hidden;
		previousTime = 0;
		if (visible) scroll();
		else {
			cancelAnimationFrame(frame);
			frame = 0;
			scroll();
		}
	}
	const viewport = new IntersectionObserver(([entry]) => {
		inView = entry.isIntersecting;
		visibility();
	});
	const size = new ResizeObserver(resize);
	size.observe(windowElement);
	viewport.observe(art);
	window.addEventListener("scroll", scroll, { passive: true });
	document.addEventListener("visibilitychange", visibility);
	readTarget();
	progress = target;
	resize();
	section.dataset.motion = "ready";
	return () => {
		disposed = true;
		cancelAnimationFrame(frame);
		viewport.disconnect();
		size.disconnect();
		window.removeEventListener("scroll", scroll);
		document.removeEventListener("visibilitychange", visibility);
		canvas.style.removeProperty("transform");
		photos.forEach((photo) => photo.style.removeProperty("transform"));
		art.style.removeProperty("--journey-opacity");
		art.style.removeProperty("--journey-trace");
	};
}
