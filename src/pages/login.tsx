import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { AuthLayout } from '@/components'

const LoginPage: NextPage = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Login - Propel</title>
        <meta name="description" content="Login Page" />
      </Head>
      <div className="flex h-full w-full items-center justify-center">Login</div>
    </AuthLayout>
  )
}

export default LoginPage
