import useSWR from 'swr'
import { gql } from 'graphql-request'

import { GetMainAccountQuery, useGraphqlClient } from '@/graphql'
import { defaults } from '@/shared/utils'

const QUERY = gql`
  query GetMainAccount {
    accounts(first: 1) {
      nodes {
        id
        uniqueName
      }
    }
  }
`

export function useMainAccount() {
  const client = useGraphqlClient(defaults.ENDPOINT_AMS)

  const options = {
    pageIndex: 0,
    pageSize: 10
  }

  const request = async () => {
    return client.request(QUERY, options)
  }

  const response = useSWR<GetMainAccountQuery>([QUERY, options], request)

  console.log(response)

  return response
}
