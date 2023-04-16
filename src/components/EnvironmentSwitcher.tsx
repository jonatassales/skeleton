import React from 'react'
import { CaretDown, Rocket, CodeSimple, LineSegments } from '@phosphor-icons/react'

import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, IconButton } from '@/design-system'

export function EnvironmentSwitcher() {
  return (
    <Dropdown>
      <div className="flex h-full items-center gap-8 border-b-2 border-b-black dark:border-b-gray-400">
        <CodeSimple size={16} />
        <p>development</p>
        <DropdownTrigger asChild>
          <IconButton>
            <CaretDown size={18} />
          </IconButton>
        </DropdownTrigger>
      </div>
      <DropdownContent sideOffset={26} align="end">
        <DropdownItem>
          <CodeSimple className="mr-8 self-center" size={16} />
          <span>development</span>
        </DropdownItem>
        <DropdownItem>
          <LineSegments className="mr-8 self-center" size={16} />
          <span>staging</span>
        </DropdownItem>
        <DropdownItem>
          <Rocket className="mr-8 self-center" size={16} />
          <span>production</span>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
