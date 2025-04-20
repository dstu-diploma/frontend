'use client';

import { useRouter } from 'next/navigation';
import { RegisterForm, RegisterFormData, userApiMutations } from '@/features/user';
import { useState } from 'react';

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
          setError('Ошибка сервера при регистрации!');
          console.error('Registration failed:', error);
        },
    });
  };

  return (
    <div className="container">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
} 