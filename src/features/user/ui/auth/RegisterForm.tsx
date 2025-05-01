'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../model/schemas';
import styles from '../../styles/auth.module.css';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  error: string | null;
}

export const RegisterForm = ({ onSubmit, error }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.brandTitle}>Packathon</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Регистрация</h2>

          <div className={styles.formGroup}>
            <label htmlFor="last_name">Фамилия</label>
            <input
              type="text"
              id="last_name"
              placeholder="Введите фамилию"
              {...register('last_name')}
              className={errors.last_name ? styles.errorInput : ''}
            />
            {errors.last_name && (
              <span className={styles.errorText}>{errors.last_name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="first_name">Имя</label>
            <input
              type="text"
              id="first_name"
              placeholder="Введите имя"
              {...register('first_name')}
              className={errors.first_name ? styles.errorInput : ''}
            />
            {errors.first_name && (
              <span className={styles.errorText}>{errors.first_name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="patronymic">Отчество</label>
            <input
              type="text"
              id="patronymic"
              placeholder="Введите отчество"
              {...register('patronymic')}
              className={errors.patronymic ? styles.errorInput : ''}
            />
            {errors.patronymic && (
              <span className={styles.errorText}>{errors.patronymic.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Введите email"
              {...register('email')}
              className={errors.email ? styles.errorInput : ''}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              {...register('password')}
              className={errors.password ? styles.errorInput : ''}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтверждение пароля</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Подтвердите пароль"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? styles.errorInput : ''}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className={styles.formButtons}>
            <button 
              type="submit" 
              className={styles.formButton}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
            <Link href="/login" className={styles.formButton}>
              Войти в аккаунт
            </Link>
          </div>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}; 