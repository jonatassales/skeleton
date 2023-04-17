import React from 'react'
import { useRouter } from 'next/router'
import { useSetAtom } from 'jotai'
import { Auth, Hub } from 'aws-amplify'
import { useQueryClient } from 'react-query'
import * as Sentry from '@sentry/nextjs'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { usernameAtom } from '@/atoms'
import { AuthEvent } from '@/auth'
import { Cookie } from '@/shared/types'
import { useCleanupJotaiStorage } from '@/shared/hooks'

interface AuthEventsProviderProps {
  children: React.ReactNode
}

export function AuthEventsProvider(props: AuthEventsProviderProps) {
  const { children } = props

  const setUsername = useSetAtom(usernameAtom)

  const router = useRouter()

  const queryClient = useQueryClient()

  const { cleanupJotaiStorage } = useCleanupJotaiStorage()

  const onSignOut = React.useCallback(async () => {
    Sentry.setUser(null)
    router.push('/login')
  }, [router])

  const onSignIn = React.useCallback(
    (session: CognitoUserSession) => {
      const id = session.getIdToken().payload.sub
      const email = session.getIdToken().payload.email
      const cognitoUsername = session.getIdToken().payload['cognito:username']
      const storedUsername = window.localStorage.getItem(Cookie.Username)

      Sentry.setUser({ id, username: cognitoUsername, email })

      if (cognitoUsername !== storedUsername) {
        cleanupJotaiStorage()
        queryClient.removeQueries()
      }

      setUsername(cognitoUsername)
    },
    [setUsername, queryClient, cleanupJotaiStorage]
  )

  React.useEffect(() => {
    const listener = async (capsule: any) => {
      if (capsule.payload.event === AuthEvent.SignOut) {
        onSignOut()
      }

      if (capsule.payload.event === AuthEvent.SignIn) {
        const session = await Auth.currentSession()
        onSignIn(session)
      }
    }

    const hubListenerCancelToken = Hub.listen('auth', listener)

    return () => {
      hubListenerCancelToken()
    }
  }, [router, onSignOut, onSignIn])

  return <>{children}</>
}
