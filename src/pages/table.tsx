import React from 'react'
import { useRouter } from 'next/router'
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
import { Layout, TableLoader } from '@/components'
import { Card } from '@/design-system'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { defaults } from '@/shared/utils'

interface Data {
  foo: 'MOCKED_DATA'
  bar: 'MOCKED_DATA'
}

async function fetchData(options: { pageIndex: number; pageSize: number }) {
  await new Promise((r) => setTimeout(r, 500))
  const data = Array.from({ length: 50 }, () => null)

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

  const columns = React.useMemo<ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: 'foo',
        header: () => <span>Foo</span>,
        cell: (props) => <span>{props.row.original.foo}</span>
      },

      {
        accessorKey: 'bar',
        header: () => <span>Bar</span>,
        cell: (props) => <span>{props.row.original.bar}</span>
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

  const table = useReactTable<Data>({
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
