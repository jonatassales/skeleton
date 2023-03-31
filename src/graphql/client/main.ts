import React from 'react'
import { GraphQLClient } from 'graphql-request'
import { Auth } from 'aws-amplify'

import { PropelServiceName } from '@/shared/types'

export class PropelGraphQLClient extends GraphQLClient {
  private accessToken: string

  constructor(endpoint: string, accessToken: string) {
    super(endpoint)
    this.accessToken = accessToken
  }

  async getCurrentSessionAccessToken() {
    try {
      const session = await Auth.currentSession()
      return session.getAccessToken().getJwtToken()
    } catch (error) {
      Auth.signOut()
    }
  }

  async request<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    const accessToken = this.accessToken || (await this.getCurrentSessionAccessToken())

    this.setHeader('Authorization', `Bearer ${accessToken}`)
    return super.request<T>(query, variables)
  }
}

export function useGraphQLClientFor(serviceName: PropelServiceName): GraphQLClient {
  const graphqlClient = React.useMemo(() => buildGraphQLClientFor(serviceName), [serviceName])
  return graphqlClient
}

export function buildGraphQLClientFor(serviceName: PropelServiceName): GraphQLClient {
  const endpoint = getEndpointByServiceName(serviceName)
  const client = new GraphQLClient(endpoint)
  return client
}

export function getEndpointByServiceName(serviceName: PropelServiceName): string {
  const endpoint = {
    [PropelServiceName.AccountManagement]: process.env.NEXT_PUBLIC_ACCOUNT_MANAGEMENT_GRAPHQL_ENDPOINT,
    [PropelServiceName.ConfigManagement]: process.env.NEXT_PUBLIC_CONFIG_MANAGEMENT_GRAPHQL_ENDPOINT
  }[serviceName]

  if (!endpoint) {
    throw new Error(`You must set the endpoint variable for ${serviceName} on your .env file`)
  }

  return endpoint
}
