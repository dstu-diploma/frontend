import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { userApi } from '../../api'
import { RegisterFormData } from '../../model/schemas'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useLogin } from './useLogin'

export const useRegister = () => {
  const router = useRouter()
  const { mutate: registerUser } = userApi.useRegister()
  const [error, setError] = useState<string | null>(null)
  const { login } = useLogin()

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
        onSuccess: async () => {
          try {
            await login(data.email, data.password)
            notificationService.successRaw(
              'Регистрация прошла успешно',
              'Вы успешно зарегистрировались',
            )
          } catch (error) {
            console.error('Login after registration failed:', error)
            notificationService.error(
              error,
              `Ошибка при автоматическом входе после регистрации`,
            )
          }
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
