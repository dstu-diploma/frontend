import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { userApi } from '../../api'
import { RegisterFormData } from '../../model/schemas'
import { useToast } from '@/shared/hooks/use-toast'

export const useRegister = () => {
  const router = useRouter()
  const { mutate: registerUser } = userApi.register()
  const [error, setError] = useState<string | null>(null)
  const { toast, dismiss } = useToast()

  const handleRegister = async (data: RegisterFormData) => {
    registerUser(
      {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        patronymic: data.patronymic || '',
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push('/login')
          dismiss()
          toast({
            variant: 'defaultBlueSuccess',
            title: 'Регистрация прошла успешно',
            description: 'Вы успешно зарегистрировались',
          })
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const data = axiosError.response.data as { detail?: string }

            if (data.detail?.toLowerCase().includes('уже зарегистрирован')) {
              setError('Аккаунт с данной почтой уже существует')
            } else {
              console.log(data.detail)
              setError('Ошибка сервера при авторизации')
            }
          } else {
            setError('Ошибка сервера при авторизации!')
          }
          console.error('Login failed:', error)
        },
      },
    )
  }

  return {
    handleRegister,
    error,
  }
}
