import axiosInstance from '@/shared/api/axios';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from './teamApi';

export const invitesApi = {
  sendInvite: () => {
    return useMutation({
      mutationFn: async (user_id: number) => {
        const response = await axiosInstance.post(`${API_URL}/team/invite/create/${user_id}`);
        return response.data;
      }
    })
  },
  acceptInvite: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.post(`${API_URL}/team/invite/${team_id}`);
        return response.data;
      },
    });
  },
  denyInvite: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.delete(`${API_URL}/team/invite/${team_id}`);
        return response.data;
      },
    });
  },
  getUserInvites: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.get(`${API_URL}/team/invite/`);
        return response.data;
      }
    })
  },
}