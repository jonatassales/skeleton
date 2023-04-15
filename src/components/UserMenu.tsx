import React from 'react'
import { Auth } from 'aws-amplify'
import { CaretDown, Gear, UserCircle, UsersThree, SignOut } from '@phosphor-icons/react'

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  IconButton,
  TagInfo
} from '@/design-system'
import { UserAvatar } from './UserAvatar'

export function UserMenu() {
  return (
    <div className="flex items-center gap-x-4">
      <UserAvatar />
      <Dropdown>
        <DropdownTrigger asChild>
          <IconButton>
            <CaretDown size={18} />
          </IconButton>
        </DropdownTrigger>

        <DropdownContent sideOffset={26} align="end">
          <DropdownItem>
            <div className="my-6">
              <TagInfo className="bg-primary-50 text-primary-400" label="Account:">
                <p className="text-sm text-[#6941C6]">Jonatas@propeldata.com</p>
              </TagInfo>
            </div>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Gear className="mr-8 self-center text-primary-900 dark:text-gray-200" size={20} />
            Account Settings
          </DropdownItem>
          <DropdownItem>
            <UserCircle className="mr-8 self-center text-primary-900 dark:text-gray-200" size={18} />
            My Profile
          </DropdownItem>
          <DropdownItem>
            <UsersThree className="mr-8 self-center text-primary-900 dark:text-gray-200" size={18} />
            My Accounts
          </DropdownItem>
          <DropdownItem onClick={() => Auth.signOut()}>
            <SignOut className="mr-8 self-center text-primary-900 dark:text-gray-200" size={18} />
            Logout
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
