import React from 'react'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import '@/theme/globals.css'

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    endpoint: process.env.NEXT_PUBLIC_COGNITO_PROXY_ENDPOINT
  },
  oauth: {
    domain: process.env.NEXT_PUBLIC_OKTA_DOMAIN,
    scope: ['openid', 'email', 'profile'],
    redirectSignIn: process.env.NEXT_PUBLIC_OKTA_REDIRECT_SIGNIN,
    redirectSignOut: process.env.NEXT_PUBLIC_OKTA_REDIRECT_SIGNOUT,
    responseType: 'code'
  },
  ssr: true
})

function ConsoleApp(props: AppProps) {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}

export default ConsoleApp
