import axios from 'axios';
import { getAuthCookies, removeAuthCookies, setTokensCookie } from '../lib/helpers/cookies';
import { headers } from 'next/headers';
import { AuthService } from '../lib/services/auth.service';

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
        AuthService.gracefulLogout();
        return Promise.reject(error);
      }
      
      try {
        const response = await axios.post(`${API_URL}/user/access_token`, 
          {}, 
          {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
            },
          }
        );
        
        const newAccessToken = response.data.access_token;
        
        setTokensCookie({
          accessToken: newAccessToken,
          refreshToken: refreshToken,
        });
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

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