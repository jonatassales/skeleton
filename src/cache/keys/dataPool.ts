import {
  DataPoolSyncsArgs,
  QueryDataPoolsArgs,
  TimeSeriesGranularity,
  FilterInput,
  TimeRangeInput
} from '@/graphql/__generated__/cms-types'
import { StepInput } from '@/shared/types'

const base = ['data-pool']

export const dataPoolKeys = {
  all: base,
  list: (environmentId?: string) => [...base, 'list', environmentId],
  detail: (pageParams: DataPoolSyncsArgs, environmentId?: string, dataPoolId?: string) => [
    ...base,
    'detail',
    environmentId,
    dataPoolId,
    pageParams
  ],
  columns: (environmentId?: string, dataPoolId?: string) => [...base, 'columns', environmentId, dataPoolId],
  paginatedList: (pageParams: QueryDataPoolsArgs, environmentId?: string) => [
    ...base,
    'paginated-list',
    environmentId,
    pageParams
  ],
  syncsTimeSeries: (
    timeRange: TimeRangeInput,
    metricId: string,
    granularity: TimeSeriesGranularity.Day | TimeSeriesGranularity.Hour,
    accountFilter: FilterInput,
    environmentFilter: FilterInput
  ) => [
    ...base,
    'syncs-time-series',
    metricId,
    timeRange.relative,
    timeRange.n,
    granularity,
    accountFilter,
    environmentFilter
  ],
  timeSeries: (
    metricUniqueName: string,
    dataPoolId: string,
    granularity: TimeSeriesGranularity.Day | TimeSeriesGranularity.Hour,
    accountFilter: FilterInput,
    environmentFilter: FilterInput,
    dataPoolFilter: FilterInput,
    timeRange?: TimeRangeInput
  ) => [
    ...base,
    'time-series',
    timeRange?.relative,
    timeRange?.n,
    metricUniqueName,
    granularity,
    accountFilter,
    environmentFilter,
    dataPoolFilter,
    dataPoolId
  ],
  status: (environmentId?: string, dataPoolId?: string) => [...base, 'status', environmentId, dataPoolId],
  creation: (step: StepInput) => [...base, 'creation', step]
}
