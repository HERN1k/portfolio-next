import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	turbopack: {
		resolveExtensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	output: "export",
	images: {
        	unoptimized: true,
    	}
};

export default nextConfig;