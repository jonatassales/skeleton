import { atomWithStorage } from 'jotai/utils'

import { Cookie } from '@/shared/types'

import { makeCookieStorage } from './utils'

type EnvironmentId = typeof Cookie.EnvironmentId | undefined

export const environmentIdAtom = atomWithStorage<EnvironmentId>(
  Cookie.EnvironmentId,
  undefined,
  makeCookieStorage<EnvironmentId>(Cookie.EnvironmentId)
)
