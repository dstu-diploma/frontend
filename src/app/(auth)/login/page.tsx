'use client';

import { LoginForm } from '@/features/user/';
import { useLogin } from '@/features/user/hooks/auth/useLogin';
import LayoutFallback from '@/shared/ui/custom/LayoutFallback/LayoutFallback';
import { useToast } from '@/shared/hooks/use-toast';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const {
    hasCheckedAuth,
    handleLogin,
    error,
    isSubmitting
  } = useLogin()
  
  const { toast } = useToast();
  
  useEffect(() => {
    const message = Cookies.get('login_redirect_reason');
    if (message) {
      const timer = setTimeout(() => {
        toast({
          title: "Ошибка при доступе к маршруту",
          description: message,
          variant: "destructive",
          duration: 5000,
        });
        Cookies.remove('login_redirect_reason');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [toast]);

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