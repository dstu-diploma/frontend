'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ReactNode, useState } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
          mutations: {
            retry: false,
            onError: error => {
              const axiosError = error as AxiosError
              if (axiosError.response?.status === 400) {
                const errorData = axiosError.response.data as {
                  detail?: string
                }
                console.warn(errorData.detail)
              }
              throw error
            },
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
