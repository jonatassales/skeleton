const { withSentryConfig } = require('@sentry/nextjs')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const redirects = async () => {
  return [
    {
      source: '/propel-invite-request-page',
      destination: 'https://meetings.hubspot.com/propel/demo',
      permanent: false,
      basePath: false
    }
  ]
}
const webpack = (config, { webpack }) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      __SENTRY_DEBUG__: !isProd,
      __SENTRY_TRACING__: !isProd
    })
  )

  // return the modified config
  return config
}

let config = {
  trailingSlash: true,
  reactStrictMode: true,
  redirects,
  webpack
}

const sentryOptions = {
  hideSourceMaps: false,
  widenClientFileUpload: true,
  debug: true
}

const sentryWebpackPluginOptions = {
  silent: true
}

if (isDev) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  })
  config = withBundleAnalyzer(config)
}

module.exports = withSentryConfig(config, sentryWebpackPluginOptions, sentryOptions)
