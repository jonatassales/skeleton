import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Plus } from '@phosphor-icons/react'
import { TimeSeries } from '@propeldata/react-time-series'

import { Card, Breadcrumb, BreadcrumbItem, Button, Table } from '@/design-system'
import { Layout } from '@/components'
import { usePaginatedDataPools } from '@/graphql'
import { getDataPoolStorage } from '@/shared/utils'

const chartDataMock = {
  labels: [
    '2022-01-01T00:00:00.000Z',
    '2022-02-01T00:00:00.000Z',
    '2022-03-01T00:00:00.000Z',
    '2022-04-01T00:00:00.000Z',
    '2022-05-01T00:00:00.000Z',
    '2022-06-01T00:00:00.000Z',
    '2022-07-01T00:00:00.000Z',
    '2022-08-01T00:00:00.000Z',
    '2022-09-01T00:00:00.000Z',
    '2022-10-01T00:00:00.000Z',
    '2022-11-01T00:00:00.000Z',
    '2022-12-01T00:00:00.000Z',
    '2023-01-01T00:00:00.000Z',
    '2023-02-01T00:00:00.000Z',
    '2023-03-01T00:00:00.000Z',
    '2023-04-01T00:00:00.000Z',
    '2023-05-01T00:00:00.000Z',
    '2023-06-01T00:00:00.000Z',
    '2023-07-01T00:00:00.000Z',
    '2023-08-01T00:00:00.000Z'
  ],
  values: [809, 984, 673, 530, 522, 471, 872, 578, 825, 619, 38, 326, 128, 615, 844, 58, 576, 28, 663, 189]
}

export type DataPoolColumn = {
  id: string
  uniqueName: string
  status: React.ReactNode
  tableName: string
  records: string
  storage: string
  activity: React.ReactNode
}

export default function DataPoolsPage() {
  const { isLoading, data, page } = usePaginatedDataPools()

  const styles = {
    line: {
      tension: 0.1,
      borderColor: '#17B897',
      borderWidth: 2
    },
    point: {
      style: false
    },
    canvas: {
      width: 80,
      height: 30,
      backgroundColor: 'transparent',
      hideGridLines: true
    }
  }

  const chartProps = {
    ...chartDataMock,
    styles
  }

  const dataPools = data?.dataPools?.edges.map(({ node: dataPool }) => ({
    id: dataPool.id,
    uniqueName: dataPool.uniqueName,
    status: dataPool.status,
    tableName: dataPool.table,
    records: dataPool.recordCount || '0',
    storage: getDataPoolStorage(dataPool),
    activity: <TimeSeries {...chartProps} variant="line" />
  }))

  const pagination = {
    pageIndex: page.pageIndex,
    pageSize: page.pageSize
  }

  const columns = React.useMemo<ColumnDef<DataPoolColumn>[]>(
    () => [
      {
        accessorKey: 'uniqueName',
        header: () => <span>Unique Name</span>,
        cell: (props) => <span>{props.row.original.uniqueName}</span>
      },

      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: (props) => <span>{props.row.original.status}</span>
      },
      {
        accessorKey: 'tableName',
        header: () => <span>Table Name</span>,
        cell: (props) => <span>{props.row.original.tableName}</span>
      },
      {
        accessorKey: 'records',
        header: () => <span>Records</span>,
        cell: (props) => <span>{props.row.original.records}</span>
      },
      {
        accessorKey: 'storage',
        header: () => <span>Storage</span>,
        cell: (props) => <span>{props.row.original.storage}</span>
      },
      {
        accessorKey: 'activity',
        header: () => <span>Sync Activity</span>,
        cell: (props) => <span className="h-[30%] w-[80px]">{props.row.original.activity}</span>
      }
    ],
    []
  )

  if (!columns) {
    return <>loading...</>
  }

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbItem>Account</BreadcrumbItem>
        <BreadcrumbItem>Data Pools</BreadcrumbItem>
      </Breadcrumb>
      <nav className="mb-16 flex items-center justify-between">
        <h1 className="mb-14">Data Pools</h1>
        <Button
          className="dark:text-primary-50 dark:hover:text-primary-300"
          variant="ghost"
          rightIcon={<Plus weight="bold" />}
        >
          Create
        </Button>
      </nav>
      <Card className="p-12 shadow-md backdrop-blur-sm dark:border-b-primary-950 dark:bg-gradient-to-tl dark:from-primary-1000/95 dark:to-primary-950/95">
        <Table<DataPoolColumn> isLoading={isLoading} columns={columns} data={dataPools} pagination={pagination} />
      </Card>
    </Layout>
  )
}
