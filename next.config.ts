import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  experimental: {
    esmExternals: true,
  },

  transpilePackages: [],

  async rewrites() {
    return [
      // start proxy settings for local server only
      // {
      //   source: "/api/:path*",
      //   destination: "http://localhost:10001/:path*",
      // },
      // end proxy settings for local server only
      // { source: "/logout", destination: "/api/logout" },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
