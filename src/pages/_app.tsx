import React from 'react'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import { ThemeProvider as ColorModeProvider } from 'next-themes'
import nookies from 'nookies'
import '@/theme/globals.css'

import { authConfig } from '@/auth'
import { defaults } from '@/shared/utils'

Amplify.configure(authConfig)

interface ConsoleAppProps extends AppProps {
  colorMode: string
}
export default function ConsoleApp(props: ConsoleAppProps) {
  const { Component, pageProps, colorMode } = props

  return (
    <ColorModeProvider attribute="class" defaultTheme={colorMode}>
      <Component {...pageProps} />
    </ColorModeProvider>
  )
}

ConsoleApp.getInitialProps = (context) => {
  const cookies = nookies.get(context)
  return {
    colorMode: cookies.colorMode || defaults.COLOR_MODE
  }
}
