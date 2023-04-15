import { atomWithStorage } from 'jotai/utils'

import { Cookie } from '@/shared/types'

import { makeCookieStorage } from './utils'

type AccountId = typeof Cookie.AccountId | undefined

export const accountIdAtom = atomWithStorage<AccountId | undefined>(
  Cookie.AccountId,
  undefined,
  makeCookieStorage<AccountId>(Cookie.AccountId)
)
