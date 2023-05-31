import React from 'react'
import { GraphQLClient } from 'graphql-request'

async function getCurrentSessionAccessToken() {
  // try {
  //   const session = await Auth.currentSession()
  //   return session.getAccessToken().getJwtToken()
  // } catch (error) {
  //   Auth.signOut()
  // }
}

const requestMiddleware: any = async (request) => {
  const token = await getCurrentSessionAccessToken()
  const headers = {
    ...request.headers,
    authorization: `Bearer ${token}`
  }
  return { ...request, headers }
}

export function makeGraphqlClient(endpoint: string) {
  return new GraphQLClient(endpoint, { requestMiddleware })
}

export function useGraphqlClient(endpoint: string) {
  return React.useMemo(() => makeGraphqlClient(endpoint), [endpoint])
}
