import { TeamInfo } from '@/features/team/model/types'
import { User } from '@/features/user'
import { useEffect, useState, useMemo } from 'react'
import { adminApi } from '../api'

export const useAdmin = () => {
  const { mutate: getAllUsers, isPending: isUsersLoading } =
    adminApi.getAllUsers()
  const { mutate: getBrandTeams, isPending: isTeamsLoading } =
    adminApi.getAllBrandTeams()
  const { mutate: getBrandTeamFullInfo, isPending: isBrandTeamLoading } =
    adminApi.getBrandTeamFullInfo()
  const [users, setUsers] = useState<User[]>([])
  const [isUsersLoaded, setIsUsersLoaded] = useState(false)
  const [teamRefs, setTeamRefs] = useState<TeamInfo[]>([])
  const [brandTeams, setBrandTeams] = useState<TeamInfo[]>([])

  // Получение полной информации о командах-брендах
  const getBrandTeamsFullInfo = async () => {
    try {
      for (const team of teamRefs) {
        getBrandTeamFullInfo(team.id, {
          onSuccess: data => {
            setBrandTeams(prevTeams => {
              const existingTeamIndex = prevTeams.findIndex(
                t => t.id === data.id,
              )
              if (existingTeamIndex === -1) {
                return [...prevTeams, data]
              }
              const updatedTeams = [...prevTeams]
              updatedTeams[existingTeamIndex] = data
              return updatedTeams
            })
          },
        })
      }
    } catch (error) {
      console.error(
        'Ошибка при получении полной информации о командах-брендах:',
        error,
      )
    }
  }

  useEffect(() => {
    if (!isUsersLoaded) {
      getAllUsers(undefined, {
        onSuccess: data => {
          setUsers(data)
          setIsUsersLoaded(true)
        },
      })
    }
  }, [isUsersLoaded])

  // Получение всех команд-брендов
  useEffect(() => {
    getBrandTeams(undefined, {
      onSuccess: data => {
        setTeamRefs(data)
      },
    })
  }, [])

  // Получение полной информации о командах-брендах
  useEffect(() => {
    if (teamRefs.length > 0) {
      getBrandTeamsFullInfo()
    }
  }, [teamRefs])

  return {
    users,
    isUsersLoading,
    isTeamsLoading,
    teams: brandTeams,
    brandTeams,
  }
}
