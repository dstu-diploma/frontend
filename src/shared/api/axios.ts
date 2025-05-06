import axios from 'axios';
import { cookiesApi } from '../lib/helpers/cookies';
import { AuthService } from '../lib/services/auth.service';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookiesApi.getAccessToken()
    
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
    
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = cookiesApi.getRefreshToken()
      
      if (!refreshToken) {
        AuthService.gracefulLogout()
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/user/access_token`, {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        
        cookiesApi.setTokensCookie({
          accessToken: response.data.access_token,
          refreshToken: refreshToken,
        });
        
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        AuthService.gracefulLogout();
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 
