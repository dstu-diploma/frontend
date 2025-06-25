'use client'

import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { useCallback } from 'react'

export const useCustomToast = () => {
  const { toast, dismiss } = useToast()

  // Вывод тоста с ошибкой типа AxiosError
  const showToastError = useCallback(
    (error: unknown, errorMessage: string) => {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        const errorData = axiosError.response.data as {
          detail?: string | Array<{ loc: string[]; msg: string; type: string }>
        }

        // Проверяем, является ли detail массивом ошибок
        if (Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map(err => err.msg).join(', ')
          dismiss()
          toast({
            title: errorMessage,
            variant: 'destructive',
            description: errorMessages,
          })
          return
        }

        // Если detail - строка
        if (typeof errorData.detail === 'string') {
          dismiss()
          toast({
            title: errorMessage,
            variant: 'destructive',
            description: errorData.detail,
          })
        }
      }
      console.warn(errorMessage)
    },
    [dismiss, toast],
  )

  // Вывод тоста с текстовой ошибкой
  const showRawToastError = useCallback(
    (title: string, description: string) => {
      dismiss()
      toast({
        variant: 'destructive',
        title: title,
        description: description,
      })
    },
    [dismiss, toast],
  )

  // Вывод успешного тоста с описанием
  const showToastSuccessRaw = useCallback(
    (title: string, description: string) => {
      dismiss()
      toast({
        variant: 'defaultBlueSuccess',
        title: title,
        description: description,
      })
    },
    [],
  )

  // Вывод успешного тоста
  const showToastSuccess = useCallback(
    (successMessage: string) => {
      dismiss()
      toast({
        variant: 'defaultBlueSuccess',
        description: successMessage,
      })
    },
    [dismiss, toast],
  )

  return {
    showToastError,
    showRawToastError,
    showToastSuccess,
    showToastSuccessRaw,
  }
}
