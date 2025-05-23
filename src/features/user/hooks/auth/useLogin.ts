import { useToast } from "@/shared/hooks/use-toast";
import { cookiesApi } from "@/shared/lib/helpers/cookies";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { userApi } from "../../api";
import { LoginFormData } from "../../model/schemas";

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: loginUser, isPending: isSubmitting } = userApi.useLogin();

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

  const handleLogin = async (data: LoginFormData) => {
    loginUser(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          setError(null);
          cookiesApi.setAuthCookies(response.user, response.access_token, response.refresh_token);
          router.push('/hackathons');
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            const data = axiosError.response.data as { detail?: string };
            
            if (data.detail?.toLowerCase().includes('логин') && data.detail?.toLowerCase().includes('пароль')) {
              setError('Неверный логин или пароль');
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

  return {
    hasCheckedAuth,
    handleLogin,
    error,
    isSubmitting
  }
}