export type Landmark = readonly [number, number, number];

// Illustrative geometry, not live camera data or a sign-language prediction.
export const openHand: readonly Landmark[] = [
	[0, -1.35, 0],
	[-0.45, -0.9, 0.08],
	[-0.9, -0.5, 0.14],
	[-1.25, -0.1, 0.2],
	[-1.5, 0.3, 0.24],
	[-0.6, -0.05, 0],
	[-0.7, 0.7, 0.04],
	[-0.73, 1.32, 0.1],
	[-0.72, 1.9, 0.16],
	[-0.05, 0.1, 0],
	[-0.03, 0.9, 0.03],
	[0, 1.62, 0.08],
	[0, 2.2, 0.15],
	[0.5, 0, 0],
	[0.59, 0.72, 0.04],
	[0.64, 1.34, 0.1],
	[0.68, 1.85, 0.2],
	[0.95, -0.2, 0.03],
	[1.13, 0.4, 0.08],
	[1.25, 0.87, 0.14],
	[1.35, 1.3, 0.23],
];
export const handConnections = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],
	[0, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[5, 9],
	[9, 10],
	[10, 11],
	[11, 12],
	[9, 13],
	[13, 14],
	[14, 15],
	[15, 16],
	[13, 17],
	[0, 17],
	[17, 18],
	[18, 19],
	[19, 20],
] as const;

export function handPose(pose: number): Landmark[] {
	return openHand.map((point, index) => {
		if (pose === 1 && index === 4) return [-0.95, 0.6, 0.5];
		if (pose === 1 && index === 7) return [-0.78, 0.8, 0.3];
		if (pose === 1 && index === 8) return [-0.95, 0.6, 0.5];
		if (pose === 2 && index >= 5 && (index - 5) % 4 !== 0) {
			const base = openHand[index - ((index - 5) % 4)];
			const joint = (index - 5) % 4;
			return [
				base[0],
				base[1] + (joint === 1 ? 0.48 : joint === 2 ? 0.3 : 0.05),
				joint * 0.28,
			];
		}
		if (pose === 2 && index >= 3 && index <= 4)
			return [-0.5, -0.15 + (index - 3) * 0.25, 0.55];
		return [...point];
	});
}
