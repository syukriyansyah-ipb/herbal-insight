/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination:`${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: '/management/:path*',
        destination: '/management/:path*',
      },
      {
        source: '/contributor/:path*',
        destination: '/contributor/:path*',
      },
      {
        source: '/plant-part/:path*',
        destination: 'https://herbalinsight.tod.my.id/api/plant-part/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
