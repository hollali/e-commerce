/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.sanity.io", "lh3.googleusercontent.com"],
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
    experimental: {
        esmExternals: "loose",
    },
};

export default nextConfig;
