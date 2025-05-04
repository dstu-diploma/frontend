import { userApi } from "@/features/user"
import { UserPartial } from "@/features/user/model/types"
import { cookiesApi } from "@/shared/lib/helpers/cookies"
import { useState, useEffect } from "react"
import { teamApi } from "../api/teamApi"
import { TeamInfo } from "../model/types"
import { useToast } from "@/shared/hooks/use-toast"
import { AxiosError } from "axios"

export const useTeam = () => {
  const { mutate: getUsers } = userApi.getUsers()
  const { mutate: getMyTeamInfo } = teamApi.getMyTeamInfo()
  const { mutate: leaveTeam } = teamApi.leaveTeam()

  const [isTeamLoading, setIsTeamLoading] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null)
  const [teamMates, setTeamMates] = useState<UserPartial[] | null>(null)
  const [hasTeam, setHasTeam] = useState(false)
  
  const { toast, dismiss } = useToast()
  const user = cookiesApi.getUser()

  // Функция для получения данных о команде, привязанной к пользователю
  const getCurrentUserTeamInfo = async () => {
    setIsTeamLoading(true)
    getMyTeamInfo(user.id, {
      onSuccess: (data) => {
        console.log('Данные о команде:', data)
        if (data.id) {
          setHasTeam(true)
        }
        
        if (data.mates.length === 0) {
          return
        }

        setTeamInfo(data)
        setTeamName(data.name)
        setIsTeamLoading(false)
      },
      onError: (error) => {
        dismiss()
        setIsTeamLoading(false)

        const axiosError = error as AxiosError;
        let title = undefined;

        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string };
          if (data.detail === 'Данный пользователь не является членом какой-либо команды!') {
            return
          }
          if (data.detail === 'Истек срок действия токена!') {
            title = 'Обновите сессию'
          }
          toast({
            title: title,
            variant: 'destructive',
            description: 'Ошибка при загрузке данных команды'
          })
        }
          
        setHasTeam(false)
        console.error('Ошибка при получении данных о команде:', error)
      }
    })  
  }

  // Функция для получения списка участников команды
  const getTeamMates = async () => {
    if (teamInfo) {
      const mate_ids = teamInfo.mates.map((mateRef) => mateRef.user_id)
      getUsers(mate_ids, {
        onSuccess: (data) => {
          const matesWithCaptain = data.map((mate) => {
            const mateRef = teamInfo?.mates.find(ref => ref.user_id === mate.id);
            return {
              ...mate,
              is_captain: mateRef?.is_captain ?? false,
            };
          });
          setTeamMates(matesWithCaptain);
        },
        onError: (error) => {
          dismiss()
          const title = error.message.includes('403') ? 'Обновите сессию' : undefined
          toast({
            title: title,
            variant: 'destructive',
            description: 'Ошибка при загрузке участников'
          })
          console.error('Ошибка при получении списка участников команд: ', error)
        }
      })
    } 
  }

  // Функция для обновления данных о команде
  const refreshTeamInfo = async (success_message: string) => {
    setHasTeam(false)
    setTeamInfo(null)
    setTeamMates(null)

    setIsTeamLoading(true)
    setTimeout(async () => {
      await getCurrentUserTeamInfo()
      setIsTeamLoading(false)
    }, 500)

    setTimeout(() => {
      dismiss()
      toast({
        variant: 'defaultBlueSuccess',
        description: `${success_message}`
      })
    }, 500)
  }

  // Обработчик выхода из команды
  const handleTeamLeave = (event: React.FormEvent) => {
    event.preventDefault()
    leaveTeam(undefined, {
      onSuccess: async () => {
        await refreshTeamInfo(`Вы успешно вышли из команды ${teamInfo?.name}`)
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при выходе из команды'
        })
        console.error("Ошибка при выходе из команды:", error)
      }
    })
  }

  useEffect(() => {
    getCurrentUserTeamInfo()
  }, [])

  useEffect(() => {
    if (teamInfo) {
      getTeamMates()
    } 
  }, [teamInfo])

  return {
    setHasTeam,
    setTeamInfo,
    setTeamMates,
    setIsTeamLoading,
    getCurrentUserTeamInfo,
    refreshTeamInfo,
    isTeamLoading,
    hasTeam,
    teamInfo,
    teamMates,
    teamName,
    setTeamName,
    handleTeamLeave
  }
}