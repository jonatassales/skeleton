const base = ['account']

export const accountKeys = {
  all: base,
  settings: (accountId?: string) => [...base, 'settings', accountId],
  list: () => [...base, 'list'],
  load: () => [...base, 'load']
}
