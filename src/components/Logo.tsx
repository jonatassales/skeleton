import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import NoSSR from 'react-no-ssr'

export function Logo() {
  const { theme } = useTheme()

  const logo = theme === 'dark' ? '/images/propel-logo-white.svg' : '/images/propel-logo.svg'

  return (
    <NoSSR>
      <Image className="mr-[71px] hidden sm:hidden md:block" src={logo} width={80} height={24} alt="Propel logo" />
      <Image
        className="hidden sm:mr-[18px] sm:block md:hidden lg:hidden"
        src={logo}
        width={57.6}
        height={17.2}
        alt="Propel logo"
      />
      <Image
        className="mr-[19px] block sm:hidden"
        src="/images/paulina.svg"
        width={56}
        height={42}
        alt="Paulina mascot icon"
      />
    </NoSSR>
  )
}
