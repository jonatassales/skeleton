import { cookies } from 'next/headers'
import { createJSONStorage } from 'jotai/utils'

export function makeCookieStorage<T>(cookieKey: string, maxAge?: number) {
  const storage = createJSONStorage<T>(() => ({
    getItem: () => {
      const cookieStore = cookies()
      const cookie = cookieStore.get(cookieKey)
      return cookie.value
    },
    setItem: (key: string, newValue: string) => {
      const oneMonth = 30 * 24 * 60 * 60
      const cookieStore = cookies()

      cookieStore.set(key, newValue, {
        maxAge: maxAge ?? oneMonth,
        path: '/'
      })
    },
    removeItem: (key: string) => {
      const cookieStore = cookies()
      cookieStore.delete(key)
    },
    delayInit: true
  }))

  return storage
}
