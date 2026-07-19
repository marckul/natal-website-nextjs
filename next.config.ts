import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    // Bootstrap 5 still uses deprecated Sass syntax (@import, global built-ins,
    // if()). Not fixable from our side — silence warnings from dependencies only.
    quietDeps: true,
  },
};

export default nextConfig;
