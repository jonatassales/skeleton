import { atomWithStorage } from 'jotai/utils'

export const isDarkModeAtom = atomWithStorage<boolean>('dark-mode', false)
