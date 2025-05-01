'use client';

import { RegisterForm } from '@/features/user';
import { useRegister } from '@/features/user/hooks/useRegister';

export default function RegisterPage() {
  const {
    handleRegister,
    error
  } = useRegister()

  return (
    <div className="container">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
} 