import { atomWithStorage } from 'jotai/utils'

import { Cookie } from '@/shared/types'

import { makeCookieStorage } from './utils'

type AccessToken = typeof Cookie.AccessToken | undefined

export const accessTokenAtom = atomWithStorage<AccessToken>(
  Cookie.AccessToken,
  undefined,
  makeCookieStorage<AccessToken>(Cookie.AccessToken)
)
