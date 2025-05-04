import { useToast } from "@/shared/hooks/use-toast"
import { useEffect, useState } from "react"
import { TeamInvite, TeamInfo } from "../model/types"
import { teamApi } from "../api/teamApi"

interface useInvitesProps {
  refreshTeamInfo: (success_message: string) => Promise<void>
}

export const useInvites = ({ refreshTeamInfo }: useInvitesProps) => {
  const { mutate: getTeamInfo } = teamApi.getTeamInfo()
  const { mutate: getUserInvites } = teamApi.getUserInvites()
  const { mutate: acceptInvite } = teamApi.acceptInvite()
  const { mutate: denyInvite } = teamApi.denyInvite()

  const [userInvites, setUserInvites] = useState<TeamInfo[]>([])
  const { toast, dismiss } = useToast()

  useEffect(() => {
    getAllInvites()
  }, [])
  
  // Получение актуального списка инвайтов
  const getAllInvites = async () => {
    getUserInvites(undefined, {
      onSuccess: async (data: TeamInvite[]) => {
        const userInvites: TeamInfo[] = [];
  
        for (const invite of data) {
          try {
            const team = await new Promise<TeamInfo>((resolve, reject) => {
              getTeamInfo(invite.team_id, {
                onSuccess: resolve,
                onError: reject,
              });
            });
            userInvites.push(team);
          } catch (error) {
            console.error('Ошибка при получении команды', error);
          }
        }
        
        setUserInvites(userInvites);
      },
      onError: () => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка получения приглашений'
        })
      }
    })
  }

  // Обработчик принятия приглашения
  const handleAcceptInvite = (team_id: number) => {
    acceptInvite(team_id, {
      onSuccess: async() => {
        await refreshTeamInfo(`Приглашение успешно принято`)
        setUserInvites([])
      },
      onError: () => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при принятии приглашения'
        })
      }
    })
  }

  // Обработчик отклонения приглашения
  const handleDenyInvite = async (team_id: number) => {
    denyInvite(team_id, {
      onSuccess: async () => {
        dismiss()
        await getAllInvites()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Приглашение на участие отклонено',
        })
      },
      onError: () => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при отклонении приглашения'
        })
      }
    })
  }

  return {
    userInvites,
    handleAcceptInvite,
    handleDenyInvite,
  }
}