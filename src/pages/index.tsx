import Image from 'next/image'
import { CaretDown, UserCircleGear, UserCircle, UsersThree, SignOut, Moon, SunDim } from '@phosphor-icons/react'

import { isDarkModeAtom } from '@/atoms'
import { Avatar, Dropdown } from '@/components'
import { useAtom } from 'jotai'

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-[180px_auto] grid-rows-[64px_auto]">
      <header className="sticky top-0 z-1 col-span-2 flex h-64 w-full items-center justify-between bg-white/90 px-28 shadow-sm backdrop-blur-sm dark:bg-slate-800">
        <Image src="/images/propel-logo.png" width={104} height={32} alt="Propel logo" />

        <div className="flex items-center gap-12">
          <Avatar>
            <Avatar.Image src="https://avatars.githubusercontent.com/u/6073626?s=120&v=4" alt="User's avatar picture" />
            <Avatar.Fallback delayMs={600}>JS</Avatar.Fallback>
          </Avatar>
          <p className="text-sm">jonatas@propeldata.com</p>
          <Dropdown>
            <Dropdown.Trigger asChild>
              <CaretDown size={18} />
            </Dropdown.Trigger>

            <Dropdown.Content sideOffset={5} className="mr-8 mt-24 ">
              <Dropdown.Item>
                <UserCircleGear className="mr-6" size={18} />
                Account Settings
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item>
                <UserCircle className="mr-6" size={18} />
                My Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <UsersThree className="mr-6" size={18} />
                My Accounts
              </Dropdown.Item>
              <Dropdown.Item>
                <SignOut size={18} />
                Logout
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <SunDim size={24} />
        </div>
      </header>
      <div className="sticky top-0 w-full border-r-[1px] bg-white"></div>
      <main className="flex flex-col px-28">
        <button className="relative h-48 w-192 overflow-hidden rounded-lg px-20 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2">
          <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-primary text-white">
            Button
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
          />
        </button>
      </main>
    </div>
  )
}
