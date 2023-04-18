import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { PaginationState } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'

import {
  getSdk,
  GetPaginatedDataPoolsQuery,
  GetPaginatedDataPoolsQueryVariables
} from '@/graphql/__generated__/cms-types'
import { useGraphqlClient } from '@/graphql'
import { defaults } from '@/shared/utils'
import { environmentIdAtom } from '@/atoms'
import { dataPoolKeys } from '@/cache'
import { PaginationPage } from '@/shared/types'

export function usePaginatedDataPools() {
  const client = useGraphqlClient(defaults.ENDPOINT_CMS)

  const sdk = getSdk(client)

  const router = useRouter()

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: router.query.page ? parseInt(router.query.page as string) - 1 : 0,
    pageSize: router.query.size ? parseInt(router.query.size as string) : defaults.RESOURCE_LIST_PAGE_SIZE
  })

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

  const { data, isLoading, error } = useSWR<GetPaginatedDataPoolsQuery>([cacheKey], request)

  const isDataSourcesEmpty = data?.dataSources?.edges?.length
  const endCursor = data?.dataPools?.pageInfo?.endCursor
  const startCursor = data?.dataPools?.pageInfo?.startCursor

  function onNextPage() {
    setPageParams({
      ...pageParams,
      after: endCursor,
      before: null
    })
  }

  function onPreviousPage() {
    setPageParams({
      ...pageParams,
      after: null,
      before: startCursor
    })
  }

  function onFirstPage() {
    setPageParams({
      ...pageParams,
      first: pageSize,
      after: null,
      last: pageSize,
      before: null
    })
  }

  function onLastPage() {
    setPageParams({
      ...pageParams,
      first: pageSize,
      after: null,
      last: pageSize,
      before: null
    })
  }

  const page: PaginationPage = {
    pagination: {
      pageIndex,
      pageSize
    },
    setPagination,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage
  }

  return {
    isLoading,
    error,
    data,
    isDataSourcesEmpty,
    page
  }
}
