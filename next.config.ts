import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  // URL policy: no trailing slash anywhere (/pagina/ -> 308 -> /pagina).
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
