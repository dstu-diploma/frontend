"use client"

import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'

export const useCustomToast = () => {
  const { toast, dismiss } = useToast()

  const showToastError = (error: unknown, errorMessage: string) => {
    const axiosError = error as AxiosError
    if (axiosError.response) {
      const errorData = axiosError.response.data as { detail?: string }
      if (
        errorData.detail ===
        'Данный пользователь не является членом какой-либо команды!'
      ) {
        return
      }
      dismiss()
      toast({
        title: errorMessage,
        variant: 'destructive',
        description: errorData.detail,
      })
    }
    console.warn(errorMessage, error)
  }

  const showRawToastError = (title: string, description: string) => {
    dismiss()
    toast({
      variant: 'destructive',
      title: title,
      description: description,
    })
  }

  const showToastSuccess = (successMessage: string) => {
    dismiss()
    toast({
      variant: 'defaultBlueSuccess',
      description: successMessage,
    })
  }

  return {
    showToastError,
    showRawToastError,
    showToastSuccess,
  }
}
