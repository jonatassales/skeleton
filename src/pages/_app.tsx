import React from 'react'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import { SWRConfig } from 'swr'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider as ColorModeProvider } from 'next-themes'
import * as Sentry from '@sentry/nextjs'
import nookies from 'nookies'
import '@/theme/globals.css'

import { authConfig } from '@/auth'
import { defaults } from '@/shared/utils'
import { AccountStateSetupProvider, AuthEventsProvider } from '@/shared/providers'

Amplify.configure(authConfig)

const queryClient = new QueryClient()

interface ConsoleAppProps extends AppProps {
  colorMode: string
}
export default function ConsoleApp(props: ConsoleAppProps) {
  const { Component, pageProps, colorMode } = props

  function onError(error) {
    const status = error.status
    /**
     * Errors will only be logged when it's different from:
     * 200: It means it's an Graphql API error, so it will be handled in the request time
     * 403/401: This is related to failed auth
     */
    if (status !== 200 && status !== 403 && status !== 401) {
      Sentry.captureException(error)
    }
  }

  function onErrorRetry(error) {
    // Never retry on 404, 401 and 403.
    if ([404, 401, 403].includes(error.status)) return
  }

  return (
    <ColorModeProvider attribute="class" defaultTheme={colorMode}>
      <QueryClientProvider client={queryClient}>
        <SWRConfig
          value={{
            keepPreviousData: true,
            onErrorRetry,
            onError
          }}
        >
          <AuthEventsProvider>
            <AccountStateSetupProvider>
              <Component {...pageProps} />
            </AccountStateSetupProvider>
          </AuthEventsProvider>
        </SWRConfig>
      </QueryClientProvider>
    </ColorModeProvider>
  )
}

ConsoleApp.getStaticProps = (context) => {
  const cookies = nookies.get(context)
  return {
    colorMode: cookies.colorMode || defaults.COLOR_MODE
  }
}
