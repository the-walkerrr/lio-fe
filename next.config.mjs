/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/portfolio/view/:portfolioId",
        destination: "/portfolio/view/:portfolioId/about",
      },
    ];
  },
};

export default nextConfig;
