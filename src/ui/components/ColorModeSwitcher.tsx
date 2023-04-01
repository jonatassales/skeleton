import NoSSR from 'react-no-ssr'
import { Moon, SunDim } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'

export function ColorModeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <NoSSR onSSR={<SunDim size={24} onClick={() => setTheme('dark')} />}>
      {theme === 'dark' ? (
        <Moon size={24} color="white" onClick={() => setTheme('light')} />
      ) : (
        <SunDim size={24} onClick={() => setTheme('dark')} />
      )}
    </NoSSR>
  )
}
