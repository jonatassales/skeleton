import React from 'react'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}
export function AuthLayout(props: AuthLayoutProps) {
  const { children } = props

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-[#ddc6fc] from-20% to-background">
      <div className="grid h-screen w-screen grid-cols-1 items-start bg-clouds-pattern bg-auto bg-bottom bg-no-repeat md:grid-cols-2 md:items-center md:bg-contain">
        <div>
          <Image
            src="/images/propel-logo-paulina.png"
            alt="Paulina mascot"
            width={150}
            height={75}
            className="absolute left-40 top-12"
          />
          <p className="absolute bottom-12 w-full justify-center self-center text-center text-sm text-[#7d89b0] md:left-40 md:w-auto md:text-left">
            © 2023 Propel Data Cloud Inc. All rights reserved.
          </p>
        </div>
        <main className="flex items-center justify-center">{children}</main>
      </div>
    </div>
  )
}
