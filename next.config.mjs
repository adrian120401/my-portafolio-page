import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [{ type: "host", value: "adriandelosreyes.vercel.app" }],
				destination: "https://www.adriandelosreyes.me/:path*",
				permanent: true,
			},
		];
	},
	experimental: {
		mdxRs: true,
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default withContentlayer(nextConfig);
