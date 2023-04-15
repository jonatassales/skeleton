import React from 'react'

import { Card, Breadcrumb, BreadcrumbItem } from '@/design-system'
import { Layout } from '@/components'

export default function Home() {
  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbItem>Account</BreadcrumbItem>
        <BreadcrumbItem>Data Pools</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-14">Data Pools</h1>
      <Card>test</Card>
    </Layout>
  )
}
