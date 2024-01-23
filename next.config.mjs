import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'res.cloudinary.com',
			port: '',
			pathname: '**',
		  },
		],
	  },
};

export default withContentlayer(nextConfig);
