"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rotate3D } from "lucide-react";
import { getDictionary, type Locale } from "@/util/i18n";
import { handConnections, handPose } from "@/util/hand-landmarks";

const GestureScene = dynamic(() => import("./gesture-scene"), { ssr: false });

export function GestureExplorer({ locale }: { locale: Locale }) {
	const { lab } = getDictionary(locale);
	const host = useRef<HTMLDivElement>(null);
	const [pose, setPose] = useState(0);
	const [enabled, setEnabled] = useState(false);
	const [ready, setReady] = useState(false);
	const [failed, setFailed] = useState(false);
	const [reduced, setReduced] = useState(false);
	const onReady = useCallback(() => setReady(true), []);
	const onError = useCallback(() => {
		setReady(false);
		setFailed(true);
	}, []);
	useEffect(() => {
		const media = matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => {
			setReduced(media.matches);
			if (media.matches) {
				setEnabled(false);
				setReady(false);
			}
		};
		sync();
		media.addEventListener("change", sync);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && innerWidth >= 768 && !media.matches)
					setEnabled(true);
			},
			{ rootMargin: "180px" },
		);
		if (host.current) observer.observe(host.current);
		return () => {
			observer.disconnect();
			media.removeEventListener("change", sync);
		};
	}, []);
	const points = handPose(pose).map(([x, y]) => [250 + x * 70, 202 - y * 63]);
	return (
		<div ref={host} className="gesture-explorer">
			<div className="gesture-copy">
				<h3>{lab.gestureTitle}</h3>
				<p>{lab.gestureIntro}</p>
				<div
					className="gesture-controls"
					role="group"
					aria-label={lab.gestureStatic}
				>
					{lab.poses.map((label, index) => (
						<button
							type="button"
							key={label}
							aria-pressed={pose === index}
							onClick={() => setPose(index)}
						>
							{label}
						</button>
					))}
				</div>
				<p className="gesture-hint">
					{ready ? lab.gestureHint : lab.gestureStatic}
				</p>
				{!enabled && !reduced && !failed && (
					<button
						type="button"
						className="text-link gesture-enable"
						onClick={() => setEnabled(true)}
					>
						<Rotate3D size={17} aria-hidden="true" />
						{lab.gestureEnable}
					</button>
				)}
				<p className="sr-only" role="status">
					{failed
						? lab.gestureFallback
						: enabled && !ready
						? lab.gestureLoading
						: ""}
				</p>
			</div>
			<div
				className={`gesture-viewport${ready ? " is-ready" : ""}`}
				aria-hidden="true"
			>
				<svg className="gesture-static" viewBox="0 0 500 330" fill="none">
					<title>{lab.gestureStatic}</title>
					<g stroke="currentColor" strokeWidth="1.5">
						{handConnections.map(([a, b]) => (
							<line
								key={`${a}-${b}`}
								x1={points[a][0]}
								y1={points[a][1]}
								x2={points[b][0]}
								y2={points[b][1]}
							/>
						))}
					</g>
					{points.map(([x, y], index) => (
						<circle
							// rome-ignore lint/suspicious/noArrayIndexKey: Fixed landmark IDs 0–20 preserve joint identity across poses; this list is never reordered.
							key={index}
							cx={x}
							cy={y}
							r={index % 4 === 0 && index > 0 ? 4 : 3}
							fill={index % 4 === 0 && index > 0 ? "#e7a77d" : "#8bd3df"}
						/>
					))}
				</svg>
				{enabled && !failed && (
					<GestureScene pose={pose} onReady={onReady} onError={onError} />
				)}
			</div>
		</div>
	);
}
