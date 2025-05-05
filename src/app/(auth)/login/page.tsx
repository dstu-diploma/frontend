'use client';

import { LoginForm } from '@/features/user/';
import { useLogin } from '@/features/user/hooks/auth/useLogin';
import LayoutFallback from '@/shared/ui/custom/LayoutFallback/LayoutFallback';

export default function LoginPage() {
  const {
    hasCheckedAuth,
    handleLogin,
    error,
    isSubmitting
  } = useLogin()

  if (!hasCheckedAuth) {
    return (
      <LayoutFallback />
    )
  }

  return (
    <div className="container">
      <LoginForm 
        onSubmit={handleLogin} 
        error={error} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
} 