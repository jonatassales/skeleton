import React from 'react'
import { CloudWarning } from '@phosphor-icons/react'

import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastAction,
  Card,
  Breadcrumb,
  BreadcrumbItem
} from '@/design-system'
import { Layout } from '@/components'

export default function Home() {
  const [isWelcomeToastOpen, setIsWelcomeToastOpen] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setIsWelcomeToastOpen(true), 1000)
  }, [])

  return (
    <ToastProvider swipeDirection="right">
      <Layout>
        <Breadcrumb>
          <BreadcrumbItem>Account</BreadcrumbItem>
          <BreadcrumbItem>Data Pools</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-14">Data Pools</h1>
        <Card>test</Card>
      </Layout>
      <Toast open={isWelcomeToastOpen} duration={5000}>
        <ToastTitle>Welcome back!</ToastTitle>
        <ToastDescription asChild>
          <div className="flex items-center gap-6">
            <CloudWarning className="text-danger" size={24} />
            <p className="text-md">
              We&apos;ve got <b>12</b> failing syncs
            </p>
          </div>
        </ToastDescription>
        <ToastAction asChild altText="Dismiss toast message" onClick={() => setIsWelcomeToastOpen(false)}>
          <button className="text-primary">Dismiss</button>
        </ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}
