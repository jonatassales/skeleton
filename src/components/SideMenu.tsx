import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  SidebarSimple,
  SquaresFour,
  IconProps,
  Wallet,
  UserList,
  Newspaper,
  UserCircle,
  Gear,
  ChartLineUp,
  CloudArrowDown,
  Database
} from '@phosphor-icons/react'

import { cn } from '@/shared/utils'

export interface ListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  Icon?: React.ComponentType<IconProps>
  children: React.ReactNode
  highlighted?: boolean
}

export function SideMenu(props: React.ComponentPropsWithoutRef<'div'>) {
  const { route } = useRouter()
  const basePath = route.split('/')[1]

  return (
    <div
      {...props}
      className="sticky top-0 h-full w-full bg-transparent px-12  dark:bg-primary-1000 dark:bg-gradient-to-b dark:from-primary-1000 dark:to-primary-950"
    >
      <ul>
        <Link href="/" title="Dashboard menu link">
          <ListItem Icon={SidebarSimple} className="mb-10" highlighted={basePath === ''}>
            Dashboard
          </ListItem>
        </Link>
        <span className="mb-6 block pl-10 pt-10 text-xs font-semiBold uppercase text-gray-400 sm:hidden md:block">
          Account
        </span>
        <Link href="#" title="Data Sources menu link">
          <ListItem Icon={Database}>Data Sources</ListItem>
        </Link>
        <Link href="/data-pools" title="Data Pools menu link">
          <ListItem Icon={CloudArrowDown} highlighted={basePath === 'data-pools'}>
            Data Pools
          </ListItem>
        </Link>
        <Link href="#" title="Metrics menu link">
          <ListItem Icon={ChartLineUp}>Metrics</ListItem>
        </Link>
        <Link href="#" title="Applications menu link">
          <ListItem Icon={SquaresFour}>Applications</ListItem>
        </Link>
        <Link href="#" title="Account Settings menu link">
          <ListItem Icon={Gear}>Settings</ListItem>
        </Link>
        <span className="mb-6 block pl-10 pt-10 text-xs font-semiBold uppercase text-gray-400 sm:hidden md:block">
          General
        </span>
        <Link href="#" title="User Profile menu link">
          <ListItem Icon={UserCircle}>Profile</ListItem>
        </Link>
        <Link href="#" title="User Accounts menu link">
          <ListItem Icon={Newspaper}>Accounts</ListItem>
        </Link>
        <Link href="#" title="Users menu link">
          <ListItem Icon={UserList}>Users</ListItem>
        </Link>
        <Link href="#" title="Billing menu link">
          <ListItem Icon={Wallet}>Billing</ListItem>
        </Link>
      </ul>
    </div>
  )
}

function ListItem(props: ListItemProps) {
  const { Icon, className, children, highlighted = false } = props

  const iconWeight = highlighted ? 'bold' : 'regular'

  return (
    <li
      className={cn(
        'mb-4 flex w-full items-center gap-4 rounded-4 py-10 pl-10 transition duration-200 ease-in-out sm:w-fit sm:gap-0 md:w-full md:gap-4',
        highlighted
          ? 'rounded-4 bg-primary-50 text-primary-600 dark:bg-primary-100 dark:text-primary-900 [&>span]:font-medium '
          : 'hover:rounded-4 hover:bg-primary-50 hover:text-primary-600 dark:font-semibold dark:hover:bg-primary-100 dark:hover:text-primary-900 hover:[&>span]:font-medium [&>span]:dark:hover:font-medium',
        className
      )}
    >
      {Icon && <Icon weight={iconWeight} size={20} className="mr-12" />}
      <span
        className={cn(highlighted && 'dark:text-primary-900 dark:hover:text-primary-900', 'block sm:hidden md:block')}
      >
        {children}
      </span>
    </li>
  )
}
