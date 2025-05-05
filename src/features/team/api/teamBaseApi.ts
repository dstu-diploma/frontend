import axiosInstance from '@/shared/api/axios';
import { TEAM_SERVICE_API_URL } from '@/shared/api/basePaths';
import { useMutation } from '@tanstack/react-query';
import { 
  TeamCaptainRequestBody,
  TeamCaptainResponseBody,
  TeamCreateRequestBody,
  TeamCreateResponseBody,
  TeamInfo,
  TeamRenameRequestBody,
  TeamRenameResponseBody,
  TeamRole,
} from '../model/types';

export const teamBaseApi = {
  createTeam: () => {
    return useMutation({
      mutationFn: async (data: TeamCreateRequestBody): Promise<TeamCreateResponseBody> => {
        const response = await axiosInstance.post(`${TEAM_SERVICE_API_URL}/`, data);
        return response.data;
      },
    });
  },
  getTeamInfo: () => {
    return useMutation({
      mutationFn: async (team_id: number): Promise<TeamInfo> => {
        const response = await axiosInstance.get(`${TEAM_SERVICE_API_URL}/info/${team_id}`)
        return response.data;
      },
    })
  },
  getMyTeamInfo: () => {
    return useMutation({
      mutationFn: async (): Promise<TeamInfo> => {
        const response = await axiosInstance.get(`${TEAM_SERVICE_API_URL}/info/`)
        return response.data;
      },
    })
  },
  renameTeam: () => {
    return useMutation({
      mutationFn: async (team_name: TeamRenameRequestBody): Promise<TeamRenameResponseBody> => {
        const response = await axiosInstance.post(`${TEAM_SERVICE_API_URL}/name`, team_name)
        return response.data
      }
    })
  },
  leaveTeam: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.delete(`${TEAM_SERVICE_API_URL}/mate/`)
        return response.data;
      }
    })
  },
  kickMate: () => {
    return useMutation({
      mutationFn: async (user_id: number) => {
        const response = await axiosInstance.delete(`${TEAM_SERVICE_API_URL}/mate/${user_id}`)
        return response.data;
      }
    })
  },
  setTeamMateRole: () => {
    return useMutation({
      mutationFn: async (role_desc: TeamRole) => {
        const response = await axiosInstance.put(`${TEAM_SERVICE_API_URL}/mate/role-desc`, role_desc)
        return response.data;
      } 
    })
  },
  setCaptainRights: () => {
    return useMutation({
      mutationFn: async (captainInfo: TeamCaptainRequestBody): Promise<TeamCaptainResponseBody> => {
        const response = await axiosInstance.put(`${TEAM_SERVICE_API_URL}/mate/captain-rights/`, captainInfo)
        return response.data;
      }
    })
  }
}