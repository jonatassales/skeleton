import { useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'

import { accountIdAtom, environmentIdAtom, usernameAtom } from '@/atoms'

export function useCleanupJotaiStorage() {
  const setUsername = useSetAtom(usernameAtom)
  const setAccountId = useSetAtom(accountIdAtom)
  const setEnvironmentId = useSetAtom(environmentIdAtom)

  const cleanupJotaiStorage = () => {
    setAccountId(RESET)
    setEnvironmentId(RESET)
    setUsername(RESET)
  }

  return { cleanupJotaiStorage }
}
