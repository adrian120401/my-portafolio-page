"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Layers, Box, Database, Monitor, Smartphone } from "lucide-react";
import { SystemDiagram } from "@/app/components/system-diagram";
import { getDictionary, type Locale } from "@/util/i18n";

const Scene = dynamic(() => import("@/app/components/system-scene"), {
	ssr: false,
});
const icons = [Database, Monitor, Smartphone];

export function SystemExplorer({ locale }: { locale: Locale }) {
	const { hero } = getDictionary(locale);
	const [active, setActive] = useState(0);
	const [expanded, setExpanded] = useState(true);
	const [enabled, setEnabled] = useState(false);
	const [ready, setReady] = useState(false);
	const [failed, setFailed] = useState(false);
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const desktop = window.matchMedia("(min-width: 768px)");
		const timer = setTimeout(() => {
			setReduced(motion.matches);
			if (desktop.matches && !motion.matches) setEnabled(true);
		}, 500);
		function onMotion() {
			setReduced(motion.matches);
			if (motion.matches) {
				setEnabled(false);
				setReady(false);
			}
		}
		motion.addEventListener("change", onMotion);
		return () => {
			clearTimeout(timer);
			motion.removeEventListener("change", onMotion);
		};
	}, []);
	const onReady = useCallback(() => setReady(true), []);
	const onError = useCallback(() => {
		setFailed(true);
		setEnabled(false);
		setReady(false);
	}, []);
	return (
		<div className="system-explorer">
			<div className={`system-viewport ${ready && enabled ? "is-ready" : ""}`}>
				<SystemDiagram locale={locale} expanded={expanded} active={active} />
				{enabled && !failed && (
					<Scene
						active={active}
						expanded={expanded}
						onReady={onReady}
						onError={onError}
					/>
				)}
				<div className="system-annotation annotation-mobile">
					<Smartphone size={16} aria-hidden="true" />
					<span>
						Mobile<small>React Native / Expo</small>
					</span>
				</div>
				<div className="system-annotation annotation-web">
					<Monitor size={16} aria-hidden="true" />
					<span>
						Web<small>React / TypeScript</small>
					</span>
				</div>
				<div className="system-annotation annotation-backend">
					<Database size={16} aria-hidden="true" />
					<span>
						Backend<small>Java / NestJS</small>
					</span>
				</div>
			</div>
			<div className="scene-toolbar">
				<span>{hero.scene}</span>
				<button
					type="button"
					aria-pressed={!expanded}
					onClick={() => setExpanded((value) => !value)}
				>
					<Layers size={14} aria-hidden="true" />
					{expanded ? hero.assemble : hero.unfold}
				</button>
			</div>
			<div className="layer-controls" role="group" aria-label={hero.scene}>
				{hero.layers.map((layer, i) => {
					const Icon = icons[i];
					return (
						<button
							key={layer}
							type="button"
							aria-pressed={active === i}
							aria-controls="layer-description"
							onClick={() => setActive(i)}
						>
							<Icon size={17} aria-hidden="true" />
							{layer}
							<span className="layer-dot" />
						</button>
					);
				})}
			</div>
			<p
				className="layer-description"
				id="layer-description"
				aria-live="polite"
			>
				{hero.layerDescriptions[active]}
			</p>
			{!enabled && !failed && !reduced && (
				<button
					className="enable-scene text-link"
					type="button"
					onClick={() => setEnabled(true)}
				>
					<Box size={16} aria-hidden="true" />
					{hero.enable}
				</button>
			)}
			<span className="sr-only" role="status">
				{failed ? hero.fallback : enabled && !ready ? hero.loading : ""}
			</span>
		</div>
	);
}
