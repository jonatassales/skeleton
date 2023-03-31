import * as Sentry from '@sentry/nextjs'
// import { beforeSend } from '@/errors'

// if (process.env.NODE_ENV === 'production') {
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DNS,
  tracesSampleRate: 1.0
  // beforeSend
})
// }
