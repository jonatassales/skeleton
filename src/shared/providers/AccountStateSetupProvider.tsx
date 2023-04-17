import React from 'react'

import { useLoadAccount, useLoadEnvironment } from '@/graphql'

interface Props {
  children: React.ReactNode
}

export function AccountStateSetupProvider(props: Props) {
  const { children } = props

  useLoadAccount()
  useLoadEnvironment()

  return <>{children}</>
}
