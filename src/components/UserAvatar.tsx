import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system'

export function UserAvatar() {
  return (
    <div className="flex items-center gap-x-4">
      <Avatar className="mr-10">
        <AvatarImage src="https://avatars.githubusercontent.com/u/6073626?s=120&v=4" alt="User's avatar picture" />
        <AvatarFallback delayMs={600}>JS</AvatarFallback>
      </Avatar>
      <div className="mr-6 flex flex-col justify-start">
        <p className="overflow-hidden text-ellipsis text-sm md:text-md">jonatas@propeldata.com</p>
        <p className="text-xs font-medium text-gray-500/90 backdrop-blur-sm ">Owner</p>
      </div>
    </div>
  )
}
