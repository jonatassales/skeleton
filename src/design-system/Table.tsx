// Table.tsx
import React from 'react'
import { styled } from '@stitches/react'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState,
  getCoreRowModel
} from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { PaginationPage } from '@/shared/types'

export const StyledTable = styled('table', {
  borderCollapse: 'collapse',
  width: '100%',
  overfloY: 'auto'
})

export const TableHead = styled('thead', {})

export const TableHeaderRow = styled('tr', {
  borderBottom: '1px solid inherit',
  borderTop: '1px solid inherit'
})

const StyledTableHeaderCell = styled('th', {
  height: 87,
  textAlign: 'left',
  color: '#22183C',
  fontWeight: 'bold',

  '& span': {
    fontWeight: 'bold'
  }
})

export function TableHeaderCell(props: React.ComponentProps<typeof StyledTableHeaderCell>) {
  const { children, ...rest } = props
  return (
    <StyledTableHeaderCell {...rest}>
      <span>{children}</span>
    </StyledTableHeaderCell>
  )
}

export const TableBody = styled('tbody', {})

export const TableRow = styled('tr', {
  borderBottom: '1px solid inherit',
  borderTop: '1px solid inherit'
})

export const TableCell = styled('td', {
  textAlign: 'left',
  color: '#22183C',
  padding: '16px 24px'
})

export const PaginationControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1rem'
})

export const PaginationButton = styled('button', {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '0.25rem 0.5rem',
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
})

export const PaginationInfo = styled('span', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem'
})

export const PageSizeSelector = styled('select', {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '0.25rem 0.5rem',
  marginLeft: '0.5rem'
})

interface TableProps<TData> extends React.ComponentProps<typeof StyledTable> {
  data: TData[]
  columns: ColumnDef<TData>[]
  page: PaginationPage
  isLoading?: boolean
  manualPagination?: boolean
  manualSorting?: boolean
  debugTable?: boolean
}

export function Table<TData>(props: TableProps<TData>) {
  const { columns, data, page, debugTable = false, manualPagination = true, isLoading = false, ...rest } = props

  const [sorting, setSorting] = React.useState<SortingState>([])

  const router = useRouter()

  const { pageSize, pageIndex } = page.pagination

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

  const table = useReactTable<TData>({
    data,
    columns,
    pageCount: data?.length ?? -1,
    state: {
      pagination: {
        pageIndex,
        pageSize
      },
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    debugTable
  })

  function handleNextPage() {
    if (page.onNextPage) {
      page.onNextPage()
    }
    table.nextPage()
  }

  function handlePreviousPage() {
    if (page.onPreviousPage) {
      page.onPreviousPage()
    }
    table.previousPage()
  }

  function handleFirstPage() {
    if (page.onFirstPage) {
      page.onFirstPage()
    }
    table.setPageIndex(0)
  }

  function handleLastPage() {
    if (page.onLastPage) {
      page.onLastPage()
    }
    table.setPageIndex(table.getPageCount() - 1)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-2">
      <div className="h-2" />
      <StyledTable {...rest}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeaderCell key={header.id} colSpan={header.colSpan} className="px-4 py-2">
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ? 'flex cursor-pointer select-none items-center gap-4' : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <CaretUp size={18} color="#050B49" />,
                          desc: <CaretDown size={18} color="#050B49" />
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHeaderCell>
                )
              })}
            </TableHeaderRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id} className="border-t border-gray-200">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </StyledTable>
      <div className="flex items-center gap-2">
        <button className="rounded border p-1" onClick={handleFirstPage} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </button>
        <button className="rounded border p-1" onClick={handlePreviousPage} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <button className="rounded border p-1" onClick={handleNextPage} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button className="rounded border p-1" onClick={handleLastPage} disabled={!table.getCanNextPage()}>
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
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  )
}
