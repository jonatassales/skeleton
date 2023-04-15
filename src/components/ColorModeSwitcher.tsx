import { Moon, SunDim } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import NoSSR from 'react-no-ssr'

import { IconButton } from '@/design-system'

export function ColorModeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <NoSSR>
      <IconButton>
        {theme === 'dark' ? (
          <Moon size={24} color="white" onClick={() => setTheme('light')} />
        ) : (
          <SunDim size={24} onClick={() => setTheme('dark')} />
        )}
      </IconButton>
    </NoSSR>
  )
}
