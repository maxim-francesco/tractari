import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
