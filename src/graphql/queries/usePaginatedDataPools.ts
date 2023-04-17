import React from 'react'
import useSWR from 'swr'
import { useAtom, useAtomValue } from 'jotai'

import { useGraphqlClient } from '@/graphql'
import {
  getSdk,
  GetPaginatedDataPoolsQuery,
  GetPaginatedDataPoolsQueryVariables
} from '@/graphql/__generated__/cms-types'
import { defaults } from '@/shared/utils'
import { dataPoolsPaginationSize, environmentIdAtom } from '@/atoms'
import { accountEnvSetupMiddleware, dataPoolKeys } from '@/cache'
import { usePaginationInfo } from '@/shared/hooks'

export function usePaginatedDataPools() {
  const client = useGraphqlClient(defaults.ENDPOINT_CMS)

  const sdk = getSdk(client)

  const [pageSize, setPageSize] = useAtom(dataPoolsPaginationSize)
  const [pageParams, setPageParams] = React.useState<GetPaginatedDataPoolsQueryVariables>({
    first: pageSize,
    after: null,
    last: pageSize,
    before: null,
    withDataSourcesCheck: true
  })

  const environmentId = useAtomValue(environmentIdAtom)

  const cacheKey = dataPoolKeys.paginatedList(pageParams, environmentId)

  const request = async () => {
    return sdk.GetPaginatedDataPools(pageParams, { 'X-Pro-Environment': environmentId as string })
  }

  const { data, isLoading, error } = useSWR<GetPaginatedDataPoolsQuery>(
    [...cacheKey, JSON.stringify(pageParams)],
    request,
    {
      use: [accountEnvSetupMiddleware]
    }
  )

  console.log(data)

  const isDataSourcesEmpty = data?.dataSources?.edges?.length
  const pageInfo = data?.dataPools?.pageInfo

  const page = usePaginationInfo({
    pageInfo,
    pageSize,
    pageParams,
    setPageSize,
    setPageParams
  })

  return {
    isLoading,
    error,
    data,
    isDataSourcesEmpty,
    page
  }
}
