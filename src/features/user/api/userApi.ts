import axiosInstance from '@/shared/api/axios';
import { useMutation } from '@tanstack/react-query';
import { 
  RegisterRequestBody, 
  AuthResponseBody, 
  LoginRequestBody, 
  RefreshResponseBody 
} from '../model/types';
import { getAuthCookies } from '@/shared/lib/helpers/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export const userApi = {
    registerUser: async (data: RegisterRequestBody): Promise<AuthResponseBody> => {
      const response = await axiosInstance.post(`${API_URL}/user/`, data);
      return response.data;
    },
    loginUser: async (data: LoginRequestBody): Promise<AuthResponseBody> => {
      const formData = new URLSearchParams();
      formData.append('username', data.username);
      formData.append('password', data.password);
    
      const response = await axiosInstance.post(`${API_URL}/user/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    },
    refreshAccessToken: async (): Promise<RefreshResponseBody> => {
      const authCookies = getAuthCookies()
      const refreshToken = authCookies.refreshToken;
      const response = await axiosInstance.post(`${API_URL}/user/access_token`, {},
        {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        }
      );
      return response.data;
    }
}

export const userApiMutations = {
    register: () => {
        return useMutation({
          mutationFn: userApi.registerUser
        });
    },
    login: () => {
        return useMutation({
          mutationFn: userApi.loginUser
        });
    },
    refresh: () => {
        return useMutation({
            mutationFn: userApi.refreshAccessToken
        })
    }
}