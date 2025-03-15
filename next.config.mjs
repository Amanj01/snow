/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['api.snowiraq.com' , 'api.snowiraq.comundefined'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.snowiraq.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.snowiraq.comundefined',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.snowiraq.comhttps',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  }
};

export default nextConfig;
