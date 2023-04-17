import React from 'react'
import useSWR from 'swr'
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'
import { faker } from '@faker-js/faker'
import { Layout, TableLoader } from '@/components'
import { Card } from '@/design-system'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { defaults } from '@/shared/utils'

export type DataPool = {
  id: string
  uniqueName: string
  status: React.ReactNode
  tableName: string
  records: string
  storage: string
  activity: React.ReactNode
}

const newDataPool = (): DataPool => {
  const id = faker.datatype.uuid()
  return {
    id,
    uniqueName: faker.name.firstName(),
    status: faker.helpers.shuffle<React.ReactNode>([
      <span key={`status-active-${id}`} className="text-green-500">
        Active
      </span>,
      <span key={`status-inactive-${id}`} className="text-red-500">
        Inactive
      </span>
    ])[0]!,
    tableName: faker.name.lastName(),
    records: faker.datatype.number(1000000).toString(),
    storage: faker.datatype.number(1000000).toString(),
    activity: faker.helpers.shuffle<React.ReactNode>([
      <span key={`activity-active-${id}`} className="text-green-500">
        Active
      </span>,
      <span key={`activity-inactive-${id}`} className="text-red-500">
        Inactive
      </span>
    ])[0]!
  }
}

const data = Array.from({ length: 50 }, () => newDataPool())

async function fetchData(options: { pageIndex: number; pageSize: number }) {
  await new Promise((r) => setTimeout(r, 500))

  return {
    rows: data.slice(options.pageIndex * options.pageSize, (options.pageIndex + 1) * options.pageSize),
    pageCount: Math.ceil(data.length / options.pageSize)
  }
}

export default function Table() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const router = useRouter()

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: router.query.page ? parseInt(router.query.page as string) - 1 : 0,
    pageSize: router.query.size ? parseInt(router.query.size as string) : defaults.RESOURCE_LIST_PAGE_SIZE
  })

  React.useEffect(() => {
    async function updatePaginationQueryParams() {
      await router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: pageIndex + 1, size: pageSize }
        },
        undefined,
        { shallow: true }
      )
    }
    updatePaginationQueryParams()
    /**
     * Need to do this because we are using shallow routing
     * and we don't want to trigger a re-render of the page
     * when the query params change (which would cause the useEffect to run again)
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize])

  const columns = React.useMemo<ColumnDef<DataPool>[]>(
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
        cell: (props) => <span>{props.row.original.activity}</span>
      }
    ],
    []
  )

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }

  const { data, isLoading } = useSWR(['table', fetchDataOptions], () => fetchData(fetchDataOptions), {
    keepPreviousData: true
  })

  const defaultData = React.useMemo(() => [], [])

  const table = useReactTable<DataPool>({
    data: data?.rows ?? defaultData,
    columns,
    pageCount: data?.pageCount ?? -1,
    state: {
      pagination: {
        pageIndex,
        pageSize
      },
      sorting
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    debugTable: true
  })

  return (
    <Layout>
      <Card className="px-20 py-40">
        <div className="p-2">
          <div className="h-2" />
          {isLoading ? (
            <TableLoader />
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} colSpan={header.colSpan} className="px-4 py-2">
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort() ? 'flex cursor-pointer select-none items-center gap-4' : ''
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <CaretUp size={18} color="#22183C" />,
                                desc: <CaretDown size={18} color="#22183C" />
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id} className="border-t border-gray-200">
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id} className="px-4 py-2">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="rounded border p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="rounded border p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button className="rounded border p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              {'>'}
            </button>
            <button
              className="rounded border p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="rounded border p-1 text-primary-950"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>{table.getRowModel().rows.length} Rows</div>
        </div>
      </Card>
    </Layout>
  )
}
