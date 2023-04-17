import prettyBytes from 'pretty-bytes'

import { DataPoolFragment } from '@/graphql/__generated__/cms-types'

export const getDataPoolStorage = (dataPool: DataPoolFragment): string => {
  const bytes = dataPool.sizeInTerabytes ? dataPool.sizeInTerabytes * 1e12 : 0
  return prettyBytes(bytes)
}
