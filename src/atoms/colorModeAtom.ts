import { atomWithStorage } from 'jotai/utils'

import { ColorMode } from '@/theme'
import { Cookie } from '@/shared/types'

import { makeCookieStorage } from './utils'

export const colorModeAtom = atomWithStorage<ColorMode>(
  Cookie.ColorMode,
  'light',
  makeCookieStorage<ColorMode>(Cookie.ColorMode)
)
