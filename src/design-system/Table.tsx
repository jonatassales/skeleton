// Table.tsx
import React from 'react'
import { styled } from '@stitches/react'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  PaginationState,
  Header,
  Table as ReactTable
} from '@tanstack/react-table'

export interface Person {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const TableContainer = styled('div', {
  padding: '1rem'
})

const StyledTable = styled('table', {
  borderCollapse: 'collapse',
  width: '100%'
})

const StyledTableHead = styled('thead', {})

const StyledTableHeaderRow = styled('tr', {})

const StyledTableHeaderCell = styled('th', {
  borderBottom: '1px solid #ddd',
  padding: '0.5rem',
  textAlign: 'left'
})

const StyledTableBody = styled('tbody', {})

const StyledTableRow = styled('tr', {
  borderBottom: '1px solid #ddd'
})

const StyledTableCell = styled('td', {
  padding: '0.5rem'
})

const PaginationControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1rem'
})

const PaginationButton = styled('button', {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '0.25rem 0.5rem',
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
})

const PaginationInfo = styled('span', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem'
})

const PageSizeSelector = styled('select', {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '0.25rem 0.5rem',
  marginLeft: '0.5rem'
})

export const Table = ({
  columns,
  data,
  tableInstance
}: {
  columns: ColumnDef<Person>[]
  data: Person[]
  tableInstance: ReactTable<Person>
}) => (
  <TableContainer>
    <StyledTable>
      <TableHeader columns={columns} tableInstance={tableInstance} />
      <TableBody data={data} tableInstance={tableInstance} />
    </StyledTable>
  </TableContainer>
)

export const TableHeader = ({
  columns,
  tableInstance
}: {
  columns: ColumnDef<Person>[]
  tableInstance: ReactTable<Person>
}) => {
  const headerGroups = tableInstance.getHeaderGroups()
  return (
    <StyledTableHead>
      {headerGroups.map((headerGroup) => (
        <StyledTableHeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHeaderCell key={header.id} header={header} />
          ))}
        </StyledTableHeaderRow>
      ))}
    </StyledTableHead>
  )
}

export const TableHeaderCell = ({ header }: { header: Header<Person, {}> }) => (
  <StyledTableHeaderCell key={header.id} colSpan={header.colSpan}>
    {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
  </StyledTableHeaderCell>
)

export const TableBody = ({ data, tableInstance }: { data: Person[]; tableInstance: ReactTable<Person> }) => {
  const rows = tableInstance.getRowModel().rows
  return (
    <StyledTableBody>
      {rows.map((row) => (
        <TableRow key={row.id} row={row} />
      ))}
    </StyledTableBody>
  )
}

export const TableRow = ({ row }: { row: any }) => (
  <StyledTableRow key={row.id}>
    {row.getVisibleCells().map((cell) => (
      <TableCell key={cell.id} cell={cell} />
    ))}
  </StyledTableRow>
)

export const TableCell = ({ cell }: { cell: any }) => (
  <StyledTableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</StyledTableCell>
)

export const TablePagination = ({ tableInstance }: { tableInstance: ReactTable<Person> }) => {
  const pagination = tableInstance.getState().pagination

  return (
    <PaginationControls>
      <PaginationButton onClick={() => tableInstance.setPageIndex(0)} disabled={!tableInstance.getCanPreviousPage()}>
        {'<<'}
      </PaginationButton>
      <PaginationButton onClick={() => tableInstance.previousPage()} disabled={!tableInstance.getCanPreviousPage()}>
        {'<'}
      </PaginationButton>
      <PaginationButton onClick={() => tableInstance.nextPage()} disabled={!tableInstance.getCanNextPage()}>
        {'>'}
      </PaginationButton>
      <PaginationButton
        onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
        disabled={!tableInstance.getCanNextPage()}
      >
        {'>>'}
      </PaginationButton>
      <PaginationInfo>
        <div>Page</div>
        <strong>
          {pagination.pageIndex + 1} of {tableInstance.getPageCount()}
        </strong>
      </PaginationInfo>
      <PaginationInfo>
        | Go to page:
        <input
          type="number"
          defaultValue={pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            tableInstance.setPageIndex(page)
          }}
          className="w-16 rounded border p-1"
        />
      </PaginationInfo>
      <PageSizeSelector
        value={pagination.pageSize}
        onChange={(e) => {
          tableInstance.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </PageSizeSelector>
    </PaginationControls>
  )
}
