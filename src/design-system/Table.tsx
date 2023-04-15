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
