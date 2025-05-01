import axios from 'axios';
import { getAuthCookies, removeAuthCookies, setTokensCookie } from '../lib/helpers/cookies';
import { AuthService } from '../lib/services/auth.service';
import { userApi } from '@/features/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthCookies();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const { refreshToken } = getAuthCookies();
      
      if (!refreshToken) {
        AuthService.gracefulLogout()
        return Promise.reject(error);
      }
      
      try {
        const data = await userApi.refreshAccessToken()
        
        setTokensCookie({
          accessToken: data.access_token,
          refreshToken: refreshToken,
        });
        
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        removeAuthCookies();
        localStorage.setItem('login_redirect_reason', 'session_expired');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 