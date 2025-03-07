import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images:{
		remotePatterns:[{
				protocol: "https",
				hostname: "storage.googleapis.com",
				port: "",
				pathname: "/uxpilot-auth.appspot.com/avatars/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
