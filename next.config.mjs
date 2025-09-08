/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'undici' on the client side
            config.resolve.fallback = {
                ...config.resolve.fallback,
                undici: false,
            };
        }
        return config;
    },
    // Also try this experimental flag if the above doesn't work
    experimental: {
        esmExternals: 'loose'
    }
};

export default nextConfig;