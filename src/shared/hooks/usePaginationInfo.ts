import React from 'react'

import { PageInfo } from '@/graphql/__generated__/cms-types'

export interface UsePaginationInfoResult {
  isPaginationVisible: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  handleNextPage: () => void
  handlePreviousPage: () => void
  currentPage: number
  pageIndex: number
  pageSize: number
  setPageSize: (newPageSize: number) => void
}

interface UsePaginationInfoOptions<PageParams> {
  pageInfo?: PageInfo
  pageParams: PageParams
  pageSize: number
  setPageParams: React.Dispatch<React.SetStateAction<PageParams>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export function usePaginationInfo<PageParams>(options: UsePaginationInfoOptions<PageParams>): UsePaginationInfoResult {
  const { pageInfo, pageParams, setPageParams, pageSize, setPageSize } = options

  const [currentPage, setCurrentPage] = React.useState(0)

  const endCursor = pageInfo?.endCursor
  const startCursor = pageInfo?.startCursor
  const hasNextPage = Boolean(pageInfo?.hasNextPage)
  const hasPreviousPage = Boolean(pageInfo?.hasPreviousPage)
  const isPaginationVisible = hasNextPage || hasPreviousPage

  const handleNextPage = () => {
    setPageParams({
      ...pageParams,
      after: endCursor,
      before: null
    })
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageParams({
      ...pageParams,
      after: null,
      before: startCursor
    })
    setCurrentPage(currentPage - 1)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(0)
    setPageParams({
      ...pageParams,
      first: newPageSize,
      after: null,
      last: newPageSize,
      before: null
    })
  }

  return {
    isPaginationVisible,
    hasNextPage,
    hasPreviousPage,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    pageIndex: currentPage - 1,
    pageSize,
    setPageSize: handlePageSizeChange
  }
}
