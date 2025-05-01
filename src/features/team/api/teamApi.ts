import axiosInstance from '@/shared/api/axios';
import { useMutation } from '@tanstack/react-query';
import { 
    TeamChangeOwnerRequestBody,
    TeamChangeOwnerResponseBody,
    TeamCreateRequestBody,
    TeamCreateResponseBody,
    TeamInvite,
} from '../model/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export const teamApi = {
    create: async (data: TeamCreateRequestBody): Promise<TeamCreateResponseBody> => {
        const response = await axiosInstance.post(`${API_URL}/team/`, data);
        return response.data;
    },
    getInfo: async (id: number): Promise<TeamCreateResponseBody> => {
        const response = await axiosInstance.get(`${API_URL}/team/${id}`);
        return response.data;
    },
    changeName: async (): Promise<TeamCreateResponseBody> => {
        const response = await axiosInstance.post(`${API_URL}/team/`);
        return response.data;
    },
    changeOwner: async (data: TeamChangeOwnerRequestBody): Promise<TeamChangeOwnerResponseBody> => {
        const response = await axiosInstance.post(`${API_URL}/team/change_owner`, data);
        return response.data;
    },
    getInvites: async (): Promise<TeamInvite[]> => {
        const response = await axiosInstance.get(`${API_URL}/team/invite/`);
        return response.data;
    },
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