'use client';

import { LoginForm } from '@/features/user/';
import { useLogin } from '@/features/user/hooks/useLogin';
import styles from './login.module.css'
import LoadingSpinner from '@/shared/ui/custom/LoadingSpinner/LoadingSpinner';

export default function LoginPage() {
  const {
    hasCheckedAuth,
    handleLogin,
    error,
    isSubmitting
  } = useLogin()

  if (!hasCheckedAuth) {
    return (
      <div className={styles.spinnerContainer}>
        <LoadingSpinner />
      </div>
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