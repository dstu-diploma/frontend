import { useToast } from '@/shared/hooks/use-toast'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { userApi } from '../../api'
import { LoginFormData } from '../../model/schemas'

export const useLogin = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null)
  const searchParams = useSearchParams()

  const { mutate: loginUser, isPending: isSubmitting } = userApi.useLogin()
  const { data: userInfo } = userApi.useGetSingleUser(loggedInUserId!)

  useEffect(() => {
    const redirectReason = searchParams.get('reason')
    if (redirectReason === 'session_expired') {
      toast({
        title: 'Сессия истекла',
        description: 'Пожалуйста, войдите снова',
        variant: 'destructive',
      })
    }
    setHasCheckedAuth(true)
  }, [toast, searchParams])

  // Обрабатываем получение данных пользователя после установки ID
  useEffect(() => {
    if (userInfo && loggedInUserId) {
      cookiesApi.setUserCookie(userInfo)
      router.push('/hackathons')
    }
  }, [userInfo, loggedInUserId, router])

  // Метод для логина юзера
  const login = (username: string, password: string) => {
    loginUser(
      {
        username,
        password,
      },
      {
        onSuccess: response => {
          setError(null)
          setLoggedInUserId(response.user.id)
          cookiesApi.setAccessToken(response.access_token)
          cookiesApi.setRefreshToken(response.refresh_token)
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const data = axiosError.response.data as { detail?: string }

            if (
              data.detail?.toLowerCase().includes('логин') &&
              data.detail?.toLowerCase().includes('пароль')
            ) {
              setError('Неверный логин или пароль')
            } else {
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

  // Обработка отправки формы логина
  const handleLogin = async (data: LoginFormData) => {
    login(data.username, data.password)
  }

  return {
    login,
    hasCheckedAuth,
    handleLogin,
    error,
    isSubmitting,
  }
}
