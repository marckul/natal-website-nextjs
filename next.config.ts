import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    // Contentful serves published assets from images.ctfassets.net.
    remotePatterns: [new URL('https://images.ctfassets.net/**')],
  },
  sassOptions: {
    // Bootstrap 5 still uses deprecated Sass syntax (@import, global built-ins,
    // if()). Not fixable from our side — silence warnings from dependencies only.
    quietDeps: true,
  },
};

export default nextConfig;
