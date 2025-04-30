'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm, LoginFormData } from '@/features/user/';
import { userApiMutations } from '@/features/user/';
import { setAuthCookies } from '@/shared/lib/helpers/cookies';
import { AxiosError } from 'axios';
import { useToast } from '@/shared/hooks/use-toast';
import LoadingSpinner from '@/shared/ui/custom/LoadingSpinner/LoadingSpinner';
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: loginUser, isPending: isSubmitting } = userApiMutations.login();

  useEffect(() => {
    const redirectReason = localStorage.getItem('login_redirect_reason');
    if (redirectReason === 'session_expired') {
      console.log('got it')
      toast({
        title: 'Сессия истекла',
        description: 'Пожалуйста, войдите снова',
        variant: 'destructive',
      });
      localStorage.removeItem('login_redirect_reason');
    }
    setHasCheckedAuth(true);
  }, [toast]);

  if (!hasCheckedAuth) {
    return (
      <div className={styles.spinnerContainer}>
        <LoadingSpinner />
      </div>
    )
  }

  const handleLogin = async (data: LoginFormData) => {
    loginUser(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          setError(null);
          setAuthCookies(response.user, response.access_token, response.refresh_token);
          router.push('/');
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            const data = axiosError.response.data as { detail?: string };
            
            if (data.detail?.toLowerCase().includes('password') && data.detail?.toLowerCase().includes('email')) {
              setError('Неверный email или пароль');
            } else {
              setError('Ошибка сервера при авторизации');
            }
          } else {
            setError('Ошибка сервера при авторизации!');
          }
          console.error('Login failed:', error);
        },
      }
    );
  };

  return (
    <div className="container">
      <LoginForm onSubmit={handleLogin} error={error} isSubmitting={isSubmitting} />
    </div>
  );
} 