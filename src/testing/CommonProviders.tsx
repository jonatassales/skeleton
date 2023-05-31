import type { ReactElement } from 'react'
import mockRouter from 'next-router-mock'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

/**
 * This is a convenience type for referring to the first argument to `useHydrateAtoms`.
 */
export type InitialValues = Parameters<typeof useHydrateAtoms>[0]

interface HydrateAtomsProps {
  initialValues: InitialValues
  children: ReactElement
}

function HydrateAtoms(props: HydrateAtomsProps): ReactElement {
  useHydrateAtoms(props.initialValues)

  // NOTE(mroberts): AFAICT, atoms with storage must be explicitly set, so I do that here.
  for (const [atom, value] of Array.from(props.initialValues)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, setAtom] = useAtom(atom)
    ;(setAtom as any)(value)
  }

  return props.children
}

export interface CommonProvidersProps extends HydrateAtomsProps {}

/**
 * This will wrap components under test in our most commonly used providers.
 */
export function CommonProviders(props: CommonProvidersProps): ReactElement {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  return (
    <RouterContext.Provider value={mockRouter}>
      <Provider>
        <HydrateAtoms initialValues={props.initialValues}>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </HydrateAtoms>
      </Provider>
    </RouterContext.Provider>
  )
}
