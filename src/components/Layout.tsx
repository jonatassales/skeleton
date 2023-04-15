import React from 'react'
import { List, X } from '@phosphor-icons/react'

import { ColorModeSwitcher, SideMenu } from '@/components'

import { IconButton, Tag } from '@/design-system'
import { useMainAccount } from '@/graphql'
import { EnvironmentSwitcher } from './EnvironmentSwitcher'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { MobileDrawerMenu } from './MobileDrawerMenu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout(props: LayoutProps) {
  const response = useMainAccount()

  return (
    <>
      <DesktopLayout {...props} />
      <MobileLayout {...props} />
    </>
  )
}

export function DesktopLayout(props: LayoutProps) {
  const { children } = props

  return (
    <div className={`hidden h-screen grid-cols-[88px_auto] grid-rows-[64px_auto] sm:grid md:grid-cols-[180px_auto]`}>
      <header className=" sticky top-0 z-1 col-span-2 flex h-64 w-full items-center justify-between bg-white/90 px-12 shadow-sm backdrop-blur-sm dark:border-b-[1px] dark:border-b-gray-800 dark:bg-[#111322] dark:bg-gradient-to-r dark:from-[#111322] dark:to-[#30374F] md:px-28">
        <div className="flex h-full items-center">
          <Logo />
          <EnvironmentSwitcher />
        </div>
        <div className="flex items-center gap-20">
          <UserMenu />
          <ColorModeSwitcher />
        </div>
      </header>
      <SideMenu />
      <main className="flex flex-col bg-primary-25 p-20 dark:bg-[#111322]">{children}</main>
    </div>
  )
}

export function MobileLayout(props: LayoutProps) {
  const { children } = props
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  function handleDrawerToggle() {
    setDrawerOpen((prev) => !prev)
  }

  return (
    <div className={`grid h-screen w-screen grid-cols-1 grid-rows-[64px_auto] sm:hidden`}>
      <header className="sticky top-0 z-1 col-span-2 flex h-64 w-full items-center justify-between bg-white/90 px-12 shadow-sm backdrop-blur-sm dark:bg-slate-900 dark:bg-gradient-to-r dark:from-[#111322] dark:to-[#30374F]">
        <div className="flex items-center">
          <Logo />
          <Tag className="border-spacing-0 bg-success-100 text-success-600">development</Tag>
        </div>
        <IconButton>
          {drawerOpen ? <X size={24} onClick={handleDrawerToggle} /> : <List size={24} onClick={handleDrawerToggle} />}
        </IconButton>
      </header>
      <MobileDrawerMenu isOpen={drawerOpen} />
      <main className="flex flex-col bg-primary-25 p-20 dark:bg-[#111322]">{children}</main>
    </div>
  )
}
