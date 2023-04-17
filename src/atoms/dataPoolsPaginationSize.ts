import { atomWithStorage } from 'jotai/utils'

import { LocalStorage } from '@/shared/types'
import { defaults } from '@/shared/utils'

type DataPoolPageSize = number

export const dataPoolsPaginationSize = atomWithStorage<DataPoolPageSize>(
  LocalStorage.DataPoolsPaginationSize,
  defaults.DEFAULT_PAGE_SIZE
)
