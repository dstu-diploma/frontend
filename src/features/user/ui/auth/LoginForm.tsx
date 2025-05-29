'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../../model/schemas'
import styles from './auth.module.scss'
import { Button } from '@/shared/ui/shadcn/button'
import { useToast } from '@/shared/hooks/use-toast'
import { useEffect } from 'react'
import { useLogin } from '../../hooks/auth/useLogin'
import Cookies from 'js-cookie'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const { handleLogin, error, isSubmitting } = useLogin()
  const { toast } = useToast()

  useEffect(() => {
    const message = Cookies.get('login_redirect_reason')
    if (message) {
      const timer = setTimeout(() => {
        toast({
          title: 'Ошибка при доступе к маршруту',
          description: message,
          variant: 'destructive',
          duration: 5000,
        })
        Cookies.remove('login_redirect_reason')
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.brandTitle}>Packathon</h1>
        <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
          <h2>Вход в систему</h2>
          <div className={styles.fieldsContainer}>
            <div className={styles.formGroup}>
              <label htmlFor='username'>Email</label>
              <input
                type='email'
                id='username'
                placeholder='Введите email'
                {...register('username')}
                className={errors.username ? styles.errorInput : ''}
              />
              {errors.username && (
                <span className={styles.errorText}>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password'>Пароль</label>
              <input
                type='password'
                id='password'
                placeholder='Введите пароль'
                {...register('password')}
                className={errors.password ? styles.errorInput : ''}
              />
              {errors.password && (
                <span className={styles.errorText}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.formButtons}>
            <Button
              type='submit'
              className={styles.formButton}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
            <Link href='/register' className={styles.linkButton}>
              <Button type='submit' className={styles.formButton}>
                Создать аккаунт
              </Button>
            </Link>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </div>
    </div>
  )
}
