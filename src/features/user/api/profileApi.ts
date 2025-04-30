import axiosInstance from '@/shared/api/axios';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { ProfileFormData } from '../model/schemas';

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
  updateAvatar: async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  },
}; 

export const profileApiMutations = {
  updateProfile: () => {
    return useMutation({
      mutationFn: profileApi.updateProfile
    });
  },
  updateAvatar: () => {
    return useMutation({
      mutationFn: profileApi.updateAvatar
    });
  },
}