import { useTheme } from 'next-themes'
import { setCookie } from 'nookies'

import { Cookie } from '@/shared/types'

export function useColorMode() {
  const { theme, setTheme } = useTheme()

  const setColorTheme = (selectedMode: string) => {
    const oneMonth = 30 * 24 * 60 * 60

    setCookie(null, Cookie.ColorMode, selectedMode, {
      maxAge: oneMonth,
      path: '/'
    })
    setTheme(selectedMode)
  }

  return [theme, setColorTheme]
}
