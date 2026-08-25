import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Photography is JPEG; the only SVGs served through `next/image` are the
     * six partner wordmarks drawn by scripts/generate-logos.mjs. Next refuses
     * to optimise SVG without this flag because SVG can carry script — these
     * files are author-generated and no user upload reaches this path. The
     * CSP below neuters scripting in them regardless.
     *
     * If the partner logos are ever replaced with raster files, drop both
     * this flag and the CSP.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Enabled ahead of a real asset host being chosen.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
