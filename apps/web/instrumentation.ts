import * as Sentry from '@sentry/nextjs';

export async function register() {
  Sentry.init({
    dsn: 'https://0a89b896fac8e5545440c0bb0959c6d4@o4506671996534784.ingest.sentry.io/4506671997911040',

    enabled: process.env.NODE_ENV !== 'development',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
