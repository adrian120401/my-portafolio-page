export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
type Point = { x: number; y: number };
type Segment = { from: Point; to: Point; start: number; length: number };
const mix = (a: Point, b: Point, t: number): Point => ({
	x: a.x + (b.x - a.x) * t,
	y: a.y + (b.y - a.y) * t,
});
const distance = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

/** Rounded corners sampled once; speed follows cumulative distance. */
export function createCameraPath(stops: Point[], trim = 0.13) {
	const points = [stops[0]];
	for (let i = 1; i < stops.length - 1; i++) {
		const previous = stops[i - 1];
		const corner = stops[i];
		const next = stops[i + 1];
		const incoming = distance(previous, corner);
		const outgoing = distance(corner, next);
		const cut = Math.min(incoming, outgoing) * trim;
		const a = mix(corner, previous, cut / incoming);
		const b = mix(corner, next, cut / outgoing);
		for (const t of [0, 0.25, 0.5, 0.75, 1])
			points.push(mix(mix(a, corner, t), mix(corner, b, t), t));
	}
	points.push(stops[stops.length - 1]);
	let length = 0;
	const segments: Segment[] = points.slice(1).map((to, index) => {
		const from = points[index];
		const segment = { from, to, start: length, length: distance(from, to) };
		length += segment.length;
		return segment;
	});
	return {
		length,
		at(progress: number) {
			const traveled = clamp01(progress) * length;
			const segment =
				segments.find((part) => traveled <= part.start + part.length) ??
				segments[segments.length - 1];
			return mix(
				segment.from,
				segment.to,
				clamp01((traveled - segment.start) / segment.length),
			);
		},
	};
}

export const experiencePath = createCameraPath([
	{ x: 0, y: 0 },
	{ x: -900, y: 0 },
	{ x: -900, y: -850 },
	{ x: 0, y: -850 },
	{ x: 0, y: -1700 },
	{ x: -900, y: -1700 },
]);
const smooth = (value: number) => {
	const t = clamp01(value);
	return t * t * (3 - 2 * t);
};
export function journeyState(progress: number) {
	const p = clamp01(progress);
	return {
		camera: experiencePath.at(p / 0.9),
		heading: smooth((p - 0.84) / 0.15),
		opacity: 1 - smooth((p - 0.88) / 0.12) * 0.92,
		trace: clamp01(p / 0.9),
	};
}
export function smoothProgress(current: number, target: number, delta: number) {
	const next = current + (target - current) * (1 - Math.exp(-delta / 0.16));
	return Math.abs(target - next) < 0.00001 ? target : next;
}
