const base = ['environment']

export const environmentKeys = {
  all: base,
  load: (accountId?: string) => [...base, accountId, 'load'],
  list: (accountId?: string) => [...base, 'list', accountId]
}
