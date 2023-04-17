import { useAtomValue } from 'jotai'
import { Middleware, SWRHook } from 'swr'

import { accountIdAtom, environmentIdAtom } from '@/atoms'

export const accountEnvSetupMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
  const accountId = useAtomValue(accountIdAtom)
  const environmentId = useAtomValue(environmentIdAtom)

  const middlewareKey = [accountId, environmentId].join('-') + key

  return useSWRNext(middlewareKey, fetcher, config)
}
