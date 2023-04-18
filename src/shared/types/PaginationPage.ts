import { PaginationState } from '@tanstack/react-table'

export type PaginationPage = {
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
  onNextPage: () => void
  onPreviousPage: () => void
  onFirstPage: () => void
  onLastPage: () => void
}
