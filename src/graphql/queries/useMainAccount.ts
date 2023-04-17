import useSWR from 'swr'

import { useGraphqlClient } from '@/graphql'
import { GetMainAccountQuery, getSdk } from '@/graphql/__generated__/ams-types'
import { defaults } from '@/shared/utils'
import { accountKeys } from '@/cache'

export function useMainAccount() {
  const client = useGraphqlClient(defaults.ENDPOINT_AMS)

  const sdk = getSdk(client)

  const cacheKey = accountKeys.load()

  const request = async () => {
    return sdk.GetMainAccount()
  }

  const response = useSWR<GetMainAccountQuery>(cacheKey, request)

  return response
}
