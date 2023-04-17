import React from 'react'
import { useAtom } from 'jotai'
import useSWR from 'swr'

import { accountIdAtom } from '@/atoms'
import { useGraphqlClient } from '@/graphql'
import { GetLoadAccountQuery, getSdk } from '@/graphql/__generated__/ams-types'
import { accountKeys } from '@/cache'
import { defaults } from '@/shared/utils'
import { Cookie } from '@/shared/types'

export function useLoadAccount() {
  const [storedId, setStoredId] = useAtom(accountIdAtom)

  const client = useGraphqlClient(defaults.ENDPOINT_AMS)

  const sdk = getSdk(client)

  const cacheKey = accountKeys.load()

  const request = async () => {
    return sdk.GetLoadAccount()
  }
  const { data } = useSWR<GetLoadAccountQuery>(cacheKey, request)

  const account = data?.accounts?.nodes?.[0]
  const fetchedId = account?.id as Cookie.AccountId

  React.useEffect(() => {
    if (fetchedId && !storedId) {
      setStoredId(fetchedId)
    }
  }, [fetchedId, storedId, setStoredId])
}
