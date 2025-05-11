import { userApi } from '@/features/user'
import { UserPartial } from '@/features/user/model/types'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useState, useEffect } from 'react'
import { teamApi } from '../api'
import { TeamInfo } from '../model/types'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'

export const useTeam = () => {
  const { mutate: getUsers } = userApi.getUsers()
  const { mutate: getMyTeamInfo } = teamApi.getMyTeamInfo()
  const { mutate: leaveTeam } = teamApi.leaveTeam()
  const { mutate: kickMate } = teamApi.kickMate()
  const { mutate: setCaptainRights } = teamApi.setCaptainRights()

  const [isTeamLoading, setIsTeamLoading] = useState(false)
  const [isTeamMatesLoading, setIsTeamMatesLoading] = useState(false)
  const [teamInfoName, setTeamInfoName] = useState('')
  const [teamRole, setTeamRole] = useState('')
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null)
  const [teamMates, setTeamMates] = useState<UserPartial[] | null>(null)
  const [hasTeam, setHasTeam] = useState(false)
  const [isCaptain, setIsCaptain] = useState(false)
  const [nonCaptainMates, setNonCaptainMates] = useState<UserPartial[] | null>(
    null,
  )
  const [updateKey, setUpdateKey] = useState(0)

  const { toast, dismiss } = useToast()
  const user = cookiesApi.getUser()

  // Функция для получения данных о команде, привязанной к пользователю
  const getCurrentUserTeamInfo = async () => {
    setIsTeamLoading(true)
    setIsTeamMatesLoading(true)
    getMyTeamInfo(undefined, {
      onSuccess: (data: TeamInfo) => {
        if (data && data.id) {
          setHasTeam(true)
          setTeamInfo(data)
          setTeamInfoName(data.name)
        } else {
          setHasTeam(false)
          setTeamInfo(null)
          setTeamInfoName('')
        }
        setIsTeamLoading(false)
        setIsTeamMatesLoading(false)
      },
      onError: (error: Error) => {
        dismiss()
        setIsTeamLoading(false)
        setIsTeamMatesLoading(false)
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail?: string }
          if (
            errorData.detail ===
            'Данный пользователь не является членом какой-либо команды!'
          ) {
            setHasTeam(false)
            setTeamInfo(null)
            setTeamInfoName('')
            return
          }
          toast({
            title: 'Ошибка при загрузке данных команды',
            variant: 'destructive',
            description: errorData.detail,
          })
        }
        console.error('Ошибка при загрузке данных команды: ', error)
        setHasTeam(false)
        setTeamInfo(null)
        setTeamInfoName('')
      },
    })
  }

  // Функция для получения списка участников команды и его обработки
  const getTeamMates = async () => {
    if (teamInfo) {
      const mate_ids = teamInfo.mates.map(mateRef => mateRef.user_id)
      getUsers(mate_ids, {
        onSuccess: data => {
          const modifiedMates = data.map(mate => {
            const mateRef = teamInfo?.mates.find(ref => ref.user_id === mate.id)
            return {
              ...mate,
              is_captain: mateRef?.is_captain ?? false,
              role_desc: mateRef?.role_desc ?? '',
            }
          })
          setTeamMates([...modifiedMates])
          setIsCaptain(
            modifiedMates.some(mate => mate.is_captain && mate.id === user.id),
          )
          setTeamRole(
            modifiedMates.find(mate => mate.id === user.id)?.role_desc ?? '',
          )
          setNonCaptainMates([
            ...modifiedMates.filter(mate => !mate.is_captain),
          ])
        },
        onError: error => {
          dismiss()
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const data = axiosError.response.data as { detail?: string }
            console.error(
              'Ошибка при получении списка участников: ',
              data.detail,
            )
            toast({
              title: 'Ошибка при получении списка участников',
              variant: 'destructive',
              description: data.detail,
            })
          }
          console.error(
            'Ошибка при получении списка участников команд: ',
            error,
          )
        },
      })
    }
  }

  // Функция для обновления карточек участников команды
  const refreshTeamMates = async (success_message: string) => {
    setIsTeamMatesLoading(true)

    getMyTeamInfo(undefined, {
      onSuccess: async (data: TeamInfo) => {
        setTeamInfo(data)
        await getTeamMates()
        setIsTeamMatesLoading(false)
        toast({
          variant: 'defaultBlueSuccess',
          description: `${success_message}`,
        })
      },
      onError: (error: Error) => {
        console.log('getMyTeamInfo error:', error)
        setIsTeamMatesLoading(false)
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при обновлении данных команды',
            description: data.detail,
          })
        }
      },
    })
  }

  const refreshTeamName = async () => {
    getMyTeamInfo(undefined, {
      onSuccess: (data: TeamInfo) => {
        setTeamInfoName(data.name)
      },
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
        description: `${success_message}`,
      })
    }, 500)
  }

  // Обработчик выхода из команды
  const handleTeamLeave = async (event: React.FormEvent) => {
    event.preventDefault()
    leaveTeam(undefined, {
      onSuccess: async () => {
        await refreshTeamInfo(`Вы успешно вышли из команды ${teamInfo?.name}`)
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при выходе из команды: ', data.detail)
          toast({
            variant: 'destructive',
            title: 'Ошибка при выходе из команды',
            description: data.detail,
          })
        }
      },
    })
  }

  // Обработчик исключения участника из команды
  const handleTeamKick = async (
    event: React.FormEvent,
    member: UserPartial,
  ) => {
    event.preventDefault()
    setIsTeamMatesLoading(true)
    kickMate(member.id, {
      onSuccess: async () => {
        dismiss()
        const success_message = `Участник ${member.first_name} ${member.last_name} успешно исключен из команды`
        await refreshTeamMates(success_message)
      },
      onError: error => {
        setIsTeamMatesLoading(false)
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при исключении участника: ', data.detail)
          toast({
            variant: 'destructive',
            title: 'Ошибка при исключении участника',
            description: data.detail,
          })
        }
      },
    })
  }

  // Обработчик назначения капитана
  const handleChangeCaptain = async (
    event: React.FormEvent,
    member: UserPartial,
  ) => {
    event.preventDefault()
    setIsTeamMatesLoading(true)
    const requestBody = { user_id: member.id, is_captain: !member.is_captain }
    setCaptainRights(requestBody, {
      onSuccess: async () => {
        dismiss()
        const success_message = !member.is_captain
          ? `Участник ${member?.first_name} ${member?.last_name} успешно назначен капитаном`
          : `Участник ${member?.first_name} ${member?.last_name} успешно снят с должности капитана`
        await refreshTeamMates(success_message)
      },
      onError: error => {
        setIsTeamMatesLoading(false)
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при назначении капитана: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при назначении капитана',
            description: data.detail,
          })
        }
      },
    })
  }

  useEffect(() => {
    getCurrentUserTeamInfo()
  }, [])

  useEffect(() => {
    if (teamInfo) {
      setIsTeamMatesLoading(true)
      console.log('teamInfo changed, updating mates')
      getTeamMates()
      setUpdateKey(prev => prev + 1)
      setIsTeamMatesLoading(false)
    }
  }, [teamInfo])

  return {
    isCaptain,
    setHasTeam,
    setTeamInfo,
    setTeamMates,
    teamRole,
    setTeamRole,
    nonCaptainMates,
    setNonCaptainMates,
    isTeamMatesLoading,
    setIsTeamLoading,
    getCurrentUserTeamInfo,
    refreshTeamInfo,
    refreshTeamMates,
    refreshTeamName,
    isTeamLoading,
    hasTeam,
    teamInfo,
    teamMates,
    teamInfoName,
    setTeamInfoName,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
    updateKey,
  }
}
