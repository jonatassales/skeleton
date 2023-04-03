import React from 'react'
import Image from 'next/image'
import {
  CaretDown,
  Gear,
  UserCircle,
  UsersThree,
  SignOut,
  Rocket,
  CodeSimple,
  LineSegments
} from '@phosphor-icons/react'

import { ColorModeSwitcher } from '@/components'

import {
  Dropdown,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator
} from '@/design-system'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <div className={`grid h-screen grid-cols-[180px_auto] grid-rows-[64px_auto]`}>
      <header className="sticky top-0 z-1 col-span-2 flex h-64 w-full items-center justify-between bg-white/90 px-28 shadow-sm backdrop-blur-sm dark:bg-slate-900">
        <div className="flex h-full items-center gap-64">
          <Image src="/images/propel-logo.png" width={104} height={32} alt="Propel logo" />
          <Dropdown>
            <DropdownTrigger asChild>
              <div className="flex h-full items-center gap-8 border-b-2 border-b-black dark:border-b-white">
                <CodeSimple size={16} />
                <p>development</p>
                <CaretDown size={18} />
              </div>
            </DropdownTrigger>
            <DropdownContent sideOffset={5}>
              <DropdownItem>
                <div className="flex items-center gap-8">
                  <CodeSimple size={16} />
                  development
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center gap-8">
                  <LineSegments size={16} />
                  staging
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center gap-8">
                  <Rocket size={16} />
                  production
                </div>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="flex items-center gap-12">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/6073626?s=120&v=4" alt="User's avatar picture" />
            <AvatarFallback delayMs={600}>JS</AvatarFallback>
          </Avatar>
          <p className="hidden text-sm md:block">jonatas@propeldata.com</p>
          <Dropdown>
            <DropdownTrigger asChild>
              <CaretDown size={18} />
            </DropdownTrigger>

            <DropdownContent sideOffset={5} className="mr-8 mt-24 ">
              <DropdownItem>
                <Gear className="mr-6" size={18} />
                Account Settings
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem>
                <UserCircle className="mr-6" size={18} />
                My Profile
              </DropdownItem>
              <DropdownItem>
                <UsersThree className="mr-6" size={18} />
                My Accounts
              </DropdownItem>
              <DropdownItem>
                <SignOut className="mr-6" size={18} />
                Logout
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
          <ColorModeSwitcher />
        </div>
      </header>
      <div className="dark: sticky top-0 w-full border-r-[1px] bg-white dark:bg-slate-900"></div>
      <main className="flex flex-col px-28 py-12">{children}</main>
    </div>
  )
}
