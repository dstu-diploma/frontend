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
            retry: (failureCount, error) => {
              const axiosError = error as AxiosError
              return axiosError.response?.status !== 400 && failureCount < 2
            },
            staleTime: 0,
            gcTime: 0,
          },
          mutations: {
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
