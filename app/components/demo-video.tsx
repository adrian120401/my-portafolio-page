"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getDictionary, type Locale } from "@/util/i18n";

export function DemoVideo({
	src,
	poster,
	title,
	locale,
}: { src: string; poster: string; title: string; locale: Locale }) {
	const { lab } = getDictionary(locale);
	const [started, setStarted] = useState(false);
	const [failed, setFailed] = useState(false);
	const video = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (!started || !video.current) return;
		const element = video.current;
		element.focus();
		// Playback follows an explicit click. Native controls remain available
		// when the browser declines play(), or when visitors prefer to pause.
		element.play().catch(() => {});
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) element.pause();
		});
		observer.observe(element);
		const visibility = () => {
			if (document.hidden) element.pause();
		};
		document.addEventListener("visibilitychange", visibility);
		return () => {
			observer.disconnect();
			document.removeEventListener("visibilitychange", visibility);
		};
	}, [started]);
	return (
		<div className="demo-video">
			{started ? (
				// Silent screen demos without speech; adjacent project text explains each interaction.
				<video
					ref={video}
					src={src}
					poster={poster}
					controls
					playsInline
					muted
					preload="metadata"
					aria-label={`${lab.demo}: ${title}`}
					onError={() => setFailed(true)}
				>
					{lab.videoFallback}
				</video>
			) : (
				<button
					type="button"
					className="demo-play"
					onClick={() => setStarted(true)}
					aria-label={`${lab.play}: ${title}`}
				>
					<Image
						src={poster}
						alt=""
						width={800}
						height={500}
						sizes="(max-width: 767px) 100vw, 360px"
					/>
					<span className="demo-play-label">
						<Play size={16} aria-hidden="true" />
						{lab.play}
					</span>
				</button>
			)}
			{failed && (
				<p role="status" className="demo-error">
					{lab.videoFallback}
				</p>
			)}
		</div>
	);
}
