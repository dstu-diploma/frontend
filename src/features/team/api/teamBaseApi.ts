import axiosInstance from '@/shared/api/axios';
import { useMutation } from '@tanstack/react-query';
import { 
  TeamCreateRequestBody,
  TeamCreateResponseBody,
  TeamInfo,
  TeamRenameRequestBody,
  TeamRenameResponseBody,
} from '../model/types';
import { API_URL } from './teamApi';

export const teamBaseApi = {
  createTeam: () => {
    return useMutation({
      mutationFn: async (data: TeamCreateRequestBody): Promise<TeamCreateResponseBody> => {
        const response = await axiosInstance.post(`${API_URL}/team/`, data);
        return response.data;
      },
    });
  },
  getTeamInfo: () => {
    return useMutation({
      mutationFn: async (team_id: number): Promise<TeamInfo> => {
        const response = await axiosInstance.get(`${API_URL}/team/info/${team_id}`)
        return response.data;
      },
    })
  },
  getMyTeamInfo: () => {
    return useMutation({
      mutationFn: async (): Promise<TeamInfo> => {
        const response = await axiosInstance.get(`${API_URL}/team/info/`)
        return response.data;
      },
    })
  },
  renameTeam: () => {
    return useMutation({
      mutationFn: async (team_name: TeamRenameRequestBody): Promise<TeamRenameResponseBody> => {
        const response = await axiosInstance.post(`${API_URL}/team/name`, team_name)
        return response.data
      }
    })
  },
  leaveTeam: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.delete(`${API_URL}/team/mate/`)
        return response.data;
      }
    })
  }
}