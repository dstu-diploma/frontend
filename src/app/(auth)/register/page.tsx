'use client';

import { RegisterForm, RegisterFormData } from '@/features/auth/ui/RegisterForm';

export default function RegisterPage() {
  const handleRegister = async (data: RegisterFormData) => {
    // TODO: Implement registration logic
    console.log('Registration data:', data);
  };

  return (
    <div className="container">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
} 