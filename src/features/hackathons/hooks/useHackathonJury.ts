import { useEffect, useMemo, useState } from 'react'
import { userApi } from '@/features/user/api'
import { JuryFormData, ScoreFormData } from '../model/schemas'
import { hackathonApi } from '../api'
import { useQueryClient } from '@tanstack/react-query'
import {
  Criterion,
  DetailedHackathon,
  TeamJudgeScoreObject,
} from '../model/types'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useHackathonJury = (
  page_id: number,
  hackathonInfo: DetailedHackathon | undefined,
) => {
  const hackathonId = Number(page_id)

  const { data: juryInfo } = hackathonApi.useGetJuryList(hackathonId)

  const { mutate: addJudge } = hackathonApi.useAddJudge(hackathonId)
  const { mutate: deleteJudge } = hackathonApi.useDeleteJudge(hackathonId)
  const { mutate: setJuryScore } = hackathonApi.useSetJuryScore(hackathonId)
  const { mutate: searchByEmail } = userApi.useSearchByEmail()

  const [isLoading, setIsLoading] = useState(false)

  const [myTeamScores, setMyTeamScores] = useState<
    Record<string, TeamJudgeScoreObject[]>
  >({})
  const queryClient = useQueryClient()

  const myTeamsScores = hackathonApi.useGetAllMyHackathonTeamScores({
    hackathonInfo,
    hackathonId,
  })

  const stringifiedScores = useMemo(
    () => JSON.stringify(myTeamsScores.map(q => q.data)),
    [myTeamsScores],
  )

  useEffect(() => {
    const newScores: Record<string, TeamJudgeScoreObject[]> = {}

    hackathonInfo?.teams?.forEach((team, index) => {
      const query = myTeamsScores[index]
      if (team && query?.data) {
        newScores[team.id] = query.data
      }
    })

    setMyTeamScores(newScores)
  }, [hackathonInfo?.teams, stringifiedScores])

  // Добавление судьи в список жюри
  const handleJuryAddition = async (data: JuryFormData) => {
    try {
      setIsLoading(true)
      searchByEmail(data.email, {
        onSuccess: data => {
          if (!data.id) {
            notificationService.errorRaw(
              'Ошибка при добавлении судьи в список жюри',
              'Судья не найден',
            )
            return
          }
          const requestBody = {
            judge_user_id: data.id,
          }
          addJudge(requestBody, {
            onSuccess: async () =>
              notificationService.success(
                `Судья ${data.first_name} ${data.last_name} успешно добавлен в список жюри`,
              ),
            onError: error =>
              notificationService.error(
                error,
                `Ошибка при добавлении судьи в список жюри`,
              ),
          })
        },
        onError: error =>
          notificationService.error(error, 'Ошибка при поиске судьи'),
      })
    } catch (error) {
      console.error('Ошибка при добавлении члена в состав жюри:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Удаление судьи из списка жюри
  const handleJuryDeletion = async (data: JuryFormData) => {
    try {
      setIsLoading(true)
      searchByEmail(data.email, {
        onSuccess: data => {
          if (!data.id) {
            notificationService.errorRaw(
              'Ошибка при удалении судьи из списка жюри',
              'Судья не найден',
            )
            return
          }
          deleteJudge(
            { judge_user_id: data.id },
            {
              onSuccess: async () => {
                notificationService.success(
                  `Судья ${data.first_name} ${data.last_name} успешно удален из состава жюри`,
                )
              },
              onError: error => {
                notificationService.error(
                  error,
                  'Ошибка при удалении судьи из состава жюри',
                )
              },
            },
          )
        },
        onError: error => {
          notificationService.error(error, 'Ошибка при поиске судьи')
        },
      })
    } catch (error) {
      console.error('Error in handleJuryDeletion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Установка жюри оценки команде по списку критериев
  const handleSetJuryTeamScore = async (
    team_id: number,
    data: ScoreFormData,
  ) => {
    const criteria = queryClient.getQueryData([
      'hackathonCriteria',
      hackathonId,
    ]) as Criterion[]

    const scores = Object.entries(data.criteria).map(([name, score]) => ({
      criterion_id: criteria.find(c => c.name === name)?.id || 0,
      score,
    }))

    const requestBody = {
      team_id,
      scores,
    }

    setJuryScore(requestBody, {
      onSuccess: () => {
        notificationService.success(`Оценка успешно добавлена!`)
      },
      onError: error => {
        notificationService.error(error, `Ошибка при добавлении оценки команде`)
      },
    })
  }

  return {
    juryInfo,
    isLoading,
    myTeamScores,
    handleJuryAddition,
    handleJuryDeletion,
    handleSetJuryTeamScore,
  }
}
