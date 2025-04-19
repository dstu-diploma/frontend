'use client';

import { LoginForm, LoginFormData } from '@/features/user/';

export default function LoginPage() {
  const handleLogin = async (data: LoginFormData) => {
    // TODO: Implement login logic
    console.log('Login data:', data);
  };

  return (
    <div className="container">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
} 