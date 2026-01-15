import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.sanity.io",
      "lh3.googleusercontent.com"
    ],
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
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "hollali",
  project: "nextjs-e-commerce",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",

  // NEW: Replaces disableLogger - Automatically tree-shake Sentry logger statements
  treeshake: {
    removeDebugLogging: true,
  },

  // NEW: Replaces automaticVercelMonitors - Enables automatic instrumentation of Vercel Cron Monitors
  automaticVercelMonitors: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically annotates React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Disables the Sentry SDK from being bundled in the client bundle (optional)
  transpileClientSDK: true,
});