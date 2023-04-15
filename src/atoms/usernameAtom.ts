import { atomWithStorage } from 'jotai/utils'

import { Cookie } from '@/shared/types'

import { makeCookieStorage } from './utils'

type Username = typeof Cookie.Username | undefined

export const usernameAtom = atomWithStorage<Username>(
  Cookie.Username,
  undefined,
  makeCookieStorage<Username>(Cookie.Username)
)
