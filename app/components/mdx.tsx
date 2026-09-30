"use client";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
const components = {
	a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<a
			href={href}
			{...props}
			{...(/^https?:/.test(href || "")
				? { target: "_blank", rel: "noopener noreferrer" }
				: {})}
		/>
	),
	img: ({ alt, src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
		if (!src) return null;
		// rome-ignore lint/a11y/useAltText: Every MDX image has descriptive alt text, forwarded by this typed renderer.
		return <img src={src} alt={alt} loading="lazy" {...props} />;
	},
};
export function Mdx({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	return <Component components={components} />;
}
