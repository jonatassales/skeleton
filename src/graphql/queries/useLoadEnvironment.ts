import React from 'react'
import useSWR from 'swr'

import { useAtom, useAtomValue } from 'jotai'

import { useGraphqlClient } from '@/graphql'
import { getSdk } from '@/graphql/__generated__/ams-types'
import { GetLoadEnvironmentQuery } from '@/graphql/__generated__/ams-types'
import { environmentKeys } from '@/cache'
import { accountIdAtom, environmentIdAtom } from '@/atoms'
import { defaults } from '@/shared/utils'
import { Cookie } from '@/shared/types'

export function useLoadEnvironment() {
  const [storedId, setStoredId] = useAtom(environmentIdAtom)
  const accountId = useAtomValue(accountIdAtom)

  const client = useGraphqlClient(defaults.ENDPOINT_AMS)

  const sdk = getSdk(client)

  const cacheKey = environmentKeys.load(accountId)

  const request = async () => {
    return sdk.GetLoadEnvironment({}, { 'X-Pro-Account': accountId as string })
  }

  const { data } = useSWR<GetLoadEnvironmentQuery>(cacheKey, request)

  const environment = data?.environments?.nodes?.[0]
  const fetchedId = environment?.id as Cookie.EnvironmentId

  React.useEffect(() => {
    if (!accountId) return

    if (fetchedId && !storedId) {
      setStoredId(fetchedId)
    }
  }, [fetchedId, setStoredId, accountId, storedId])
}
