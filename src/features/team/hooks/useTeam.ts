import { userApi } from "@/features/user"
import { UserPartial } from "@/features/user/model/types"
import { cookiesApi } from "@/shared/lib/helpers/cookies"
import { useState, useEffect } from "react"
import { teamApi } from "../api"
import { TeamInfo } from "../model/types"
import { useToast } from "@/shared/hooks/use-toast"
import { AxiosError } from "axios"

export const useTeam = () => {
  const { mutate: getUsers } = userApi.getUsers()
  const { mutate: getMyTeamInfo } = teamApi.getMyTeamInfo()
  const { mutate: leaveTeam } = teamApi.leaveTeam()
  const { mutate: kickMate } = teamApi.kickMate()
  const { mutate: setCaptainRights } = teamApi.setCaptainRights()

  const [isTeamLoading, setIsTeamLoading] = useState(false)
  const [isTeamMatesLoading, setIsTeamMatesLoading] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null)
  const [teamMates, setTeamMates] = useState<UserPartial[] | null>(null)
  const [hasTeam, setHasTeam] = useState(false)
  const [isCaptain, setIsCaptain] = useState(false)
  const [nonCaptainMates, setNonCaptainMates] = useState<UserPartial[] | null>(null)
  
  const { toast, dismiss } = useToast()
  const user = cookiesApi.getUser()

  // Функция для получения данных о команде, привязанной к пользователю
  const getCurrentUserTeamInfo = async () => {
    setIsTeamLoading(true)
    getMyTeamInfo(user.id, {
      onSuccess: (data) => {
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

  // Функция для получения списка участников команды и его обработки
  const getTeamMates = async () => {
    if (teamInfo) {
      const mate_ids = teamInfo.mates.map((mateRef) => mateRef.user_id)
      getUsers(mate_ids, {
        onSuccess: (data) => {
          const modifiedMates = data.map((mate) => {
            const mateRef = teamInfo?.mates.find(ref => ref.user_id === mate.id);
            return {
              ...mate,
              is_captain: mateRef?.is_captain ?? false,
              role_desc: mateRef?.role_desc ?? ''
            };
          });
          setTeamMates(modifiedMates);
          setIsCaptain(modifiedMates.some(
            mate => mate.is_captain && mate.id === user.id
          ))
          setNonCaptainMates(modifiedMates.filter(mate => !mate.is_captain))
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

  // Функция для обновления карточек участников команды
  const refreshTeamMates = async (success_message: string) => {
    setTeamMates(null)
    setIsTeamMatesLoading(true)

    setTimeout(async () => {
      await getTeamMates()
      setIsTeamLoading(false)
    }, 500)

    dismiss()
    toast({
      variant: 'defaultBlueSuccess',
      description: `${success_message}`
    })
  }

  // Функция для обновления данных о всей команде
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

  // Обработчик исключения участника из команды
  const handleTeamKick = (event: React.FormEvent, user_id: number) => {
    event.preventDefault()
    kickMate(user_id, {
      onSuccess: async () => {
        await refreshTeamInfo(`Участник ${teamInfo?.name} успешно исключен из команды`)
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при исключении участника'
        })
        console.error("Ошибка при исключении участника:", error)
      }
    })
  }

  // Обработчик назначения капитана
  const handleChangeCaptain = (event: React.FormEvent, user_id: number) => {
    event.preventDefault()
    const requestBody = { user_id: user_id, is_captain: true }
    setCaptainRights(requestBody, {
      onSuccess: async () => {
        await refreshTeamMates(`Участник ${teamInfo?.name} успешно назначен капитаном`)
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при назначении капитана'
        })
        console.error("Ошибка при назначении капитана:", error)
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
    isCaptain,
    setHasTeam,
    setTeamInfo,
    setTeamMates,
    nonCaptainMates,
    setNonCaptainMates,
    isTeamMatesLoading,
    setIsTeamLoading,
    getCurrentUserTeamInfo,
    refreshTeamInfo,
    refreshTeamMates,
    isTeamLoading,
    hasTeam,
    teamInfo,
    teamMates,
    teamName,
    setTeamName,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain
  }
}