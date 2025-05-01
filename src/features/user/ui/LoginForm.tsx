'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../model/schemas';
import styles from '../styles/auth.module.css';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  error: string | null;
  isSubmitting: boolean;
}

export const LoginForm = ({ onSubmit, error, isSubmitting }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.brandTitle}>Packathon</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Вход в систему</h2>
          <div className={styles.formGroup}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              placeholder="Введите email"
              {...register('username')}
              className={errors.username ? styles.errorInput : ''}
            />
            {errors.username && (
              <span className={styles.errorText}>{errors.username.message}</span>
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
          <div className={styles.formButtons}>
            <button type="submit" className={styles.formButton} disabled={isSubmitting || !isValid}>
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
            <Link href="/register" className={styles.formButton}>
                Создать аккаунт
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