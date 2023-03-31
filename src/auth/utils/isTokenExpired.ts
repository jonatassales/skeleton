import decode from 'jwt-decode'

export default function isTokenExpired(token: string): boolean {
  const session = decode<{ exp: number }>(token)
  const now = new Date()
  const expiration = new Date(session.exp * 1000)

  return now >= expiration
}
