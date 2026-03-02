import type { NextConfig } from "next";

const basePath = "/demo";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: "/demo-assets",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXTAUTH_URL: `http://localhost${basePath}/api/auth`,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source:
            "/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/a-4-a/c.js",
          destination:
            "https://api.vercel.com/bot-protection/v1/challenge",
          basePath: false as const,
        },
        {
          source:
            "/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/:path*",
          destination:
            "https://api.vercel.com/bot-protection/v1/proxy/:path*",
          basePath: false as const,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        //https://nextjs.org/docs/messages/next-image-unconfigured-host
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
