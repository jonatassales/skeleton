import { Moon, SunDim } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'

export function ColorModeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <>
      {theme === 'dark' ? (
        <Moon size={24} color="white" onClick={() => setTheme('light')} />
      ) : (
        <SunDim size={24} onClick={() => setTheme('dark')} />
      )}
    </>
  )
}
