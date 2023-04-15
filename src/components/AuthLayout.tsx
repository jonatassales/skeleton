import React from 'react'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}
export function AuthLayout(props: AuthLayoutProps) {
  const { children } = props

  return (
    <>
      <Image
        className="absolute right-[2%] top-[16%] hidden lg:block"
        src="/images/paulina-left.svg"
        width={102}
        height={78.8}
        alt="Paulina mascot icon"
      />
      <Image
        className="absolute left-[16%] top-[38%] hidden lg:block"
        src="/images/paulina.svg"
        width={255}
        height={192}
        alt="Paulina mascot icon"
      />
      <div className="h-screen w-screen bg-gradient-to-t from-primary-600 from-20% to-primary-100">
        <div className="h-screen w-screen bg-clouds-pattern bg-auto bg-bottom bg-no-repeat sm:bg-contain">
          <Image
            className="absolute left-16 top-16 sm:left-28"
            src="/images/propel-logo-paulina.png"
            alt="Paulina mascot"
            width={120}
            height={67.5}
          />
          <p className="absolute bottom-12 w-full justify-center self-center text-center text-sm md:left-40 md:w-auto md:text-left">
            © 2023 Propel Data Cloud Inc. All rights reserved.
          </p>
          <main className="h-screen w-screen px-16">{children}</main>
        </div>
      </div>
    </>
  )
}
