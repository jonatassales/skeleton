import React from 'react'
import { useQuery } from 'react-query'
import { getCoreRowModel, ColumnDef, useReactTable, PaginationState } from '@tanstack/react-table'
import { GraphQLClient } from 'graphql-request'

import { Table, TableHeader, TableBody, TableRow, TableCell, TablePagination } from '@/design-system'
import { Layout } from '@/components'

interface Person {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const mockData: Person[] = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 28,
    visits: 5,
    status: 'active',
    progress: 80
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 34,
    visits: 12,
    status: 'inactive',
    progress: 55
  },
  {
    firstName: 'Carol',
    lastName: 'Brown',
    age: 42,
    visits: 7,
    status: 'suspended',
    progress: 65
  }
]

export const client = new GraphQLClient('https://your-graphql-endpoint.com/graphql', {
  headers: {
    // Add any required headers, like an authorization token
  }
})

// Replace this query with your actual GraphQL query
const FETCH_DATA_QUERY = `query FetchData($offset: Int!, $limit: Int!) { people(offset: $offset, limit: $limit) { rows { firstName lastName age visits status progress } pageCount } }`

const fetchData = async ({ pageIndex, pageSize }: PaginationState) => {
  const data = await client.request(FETCH_DATA_QUERY, {
    offset: pageIndex * pageSize,
    limit: pageSize
  })

  return {
    rows: data.people.rows,
    pageCount: data.people.pageCount
  }
}

export default function App() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      // Define columns based on your data structure
    ],
    []
  )

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }

  const dataQuery = useQuery(['data', fetchDataOptions], () => fetchData(fetchDataOptions), { keepPreviousData: true })

  const defaultData = React.useMemo(() => [], [])

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true
  })

  return (
    <Layout>
      <Table columns={columns} data={dataQuery.data?.rows ?? defaultData} tableInstance={table} />
      <TablePagination tableInstance={table} />
    </Layout>
  )
}
