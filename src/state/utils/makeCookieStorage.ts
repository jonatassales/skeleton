import { Cookie } from '@/shared/types'
import { createJSONStorage } from 'jotai/utils'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

export function makeCookieStorage<T>(cookieKey: Cookie) {
  return createJSONStorage<T>(() => ({
    getItem: () => {
      const cookies = parseCookies()
      return cookies[cookieKey]
    },
    setItem: (key: string, newValue: string) => {
      const oneMonth = 30 * 24 * 60 * 60
      setCookie(null, key, newValue, {
        maxAge: oneMonth,
        path: '/'
      })
    },
    removeItem: (key: string) => destroyCookie(null, key)
  }))
}
