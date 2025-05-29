'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../../model/schemas'
import { Button } from '@/shared/ui/shadcn/button'
import { useRegister } from '../../hooks/auth/useRegister'
import AuthFormGroup from './AuthFormGroup'
import styles from './auth.module.scss'
import clsx from 'clsx'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })
  const { handleRegister, error } = useRegister()

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.brandTitle}>Packathon</h1>
        <form
          className={clsx(styles.form, styles.registerForm)}
          onSubmit={handleSubmit(handleRegister)}
        >
          <h2>Регистрация</h2>
          <div className={styles.fieldsContainer}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <AuthFormGroup
                  label='Фамилия'
                  fieldKey='last_name'
                  placeholder='Введите фамилию'
                  register={register}
                  errors={errors}
                />
                <AuthFormGroup
                  label='Имя'
                  fieldKey='first_name'
                  placeholder='Введите имя'
                  register={register}
                  errors={errors}
                />
                <AuthFormGroup
                  label='Отчество'
                  fieldKey='patronymic'
                  placeholder='Введите отчество'
                  register={register}
                  errors={errors}
                />
              </div>
              <div className={styles.formColumn}>
                <AuthFormGroup
                  label='Email'
                  fieldKey='email'
                  placeholder='Введите email'
                  register={register}
                  errors={errors}
                />
                <AuthFormGroup
                  label='Пароль'
                  fieldKey='password'
                  fieldType='password'
                  placeholder='Введите пароль'
                  register={register}
                  errors={errors}
                />
                <AuthFormGroup
                  label='Подтвеждение пароля'
                  fieldKey='confirmPassword'
                  fieldType='password'
                  placeholder='Подтвердите пароль'
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>
          <div className={styles.formButtons}>
            <Button
              type='submit'
              className={styles.formButton}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            <Link href='/login' className={styles.linkButton}>
              <Button type='submit' className={styles.formButton}>
                Войти в аккаунт
              </Button>
            </Link>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </div>
    </div>
  )
}
