'use client';

import { useRouter } from 'next/navigation';
import { RegisterForm, RegisterFormData, userApiMutations } from '@/features/user';
import { useState } from 'react';
import { AxiosError } from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: registerUser } = userApiMutations.register();
  const [error, setError] = useState<string | null>(null);

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
          router.push('/login');
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            const data = axiosError.response.data as { detail?: string };
            
            if (data.detail?.toLowerCase().includes('уже зарегистрирован')) {
              setError('Аккаунт с данной почтой уже существует');
            } else {
              console.log(data.detail)
              setError('Ошибка сервера при авторизации');
            }
          } else {
            setError('Ошибка сервера при авторизации!');
          }
          console.error('Login failed:', error);
        },
    });
  };

  return (
    <div className="container">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
} 