import axiosInstance from '@/shared/api/axios';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { ProfileFormData } from '../model/schemas';
import { RefreshResponseBody } from '../model/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export const profileApi = {
  getProfile: () => {
      const userData = Cookies.get('user');
      return userData ? JSON.parse(userData) : null;
  },
  updateProfile: async (profile: Partial<ProfileFormData>): Promise<ProfileFormData> => {
    const response = await axiosInstance.patch(`${API_URL}/user/`, profile);
    return response.data;
  },
  setOrUpdateAvatar: async (file: File): Promise<RefreshResponseBody> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axiosInstance.put(`${API_URL}/user/avatar`, formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    });
    return response.data;
  },
  deleteAvatar: async () => {
    const response = await axiosInstance.delete(`${API_URL}/user/avatar`)
    return response.data;
  },
  getAvatar: (user_id: number) => {
    return API_URL + '/uploads/avatars/' + user_id + '.jpg'
  },
  isAvatarExists: async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);  
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}; 

export const profileApiMutations = {
  updateProfile: () => {
    return useMutation({
      mutationFn: profileApi.updateProfile
    });
  },
  setOrUpdateAvatar: () => {
    return useMutation({
      mutationFn: profileApi.setOrUpdateAvatar
    });
  },
  deleteAvatar: () => {
    return useMutation({
      mutationFn: profileApi.deleteAvatar,
    });
  },
}