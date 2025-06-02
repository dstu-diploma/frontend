import clsx from 'clsx'
import React, { useMemo } from 'react'
import styles from './HackathonPageTeamCard.module.scss'
import {
  DetailedHackathon,
  HackathonTeam,
  TeamJudgeScoreObject,
} from '@/features/hackathons/model/types'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { ActionModal } from '@/features/team'
import { Button } from '@/shared/ui/shadcn/button'
import {
  ScoreFormData,
  scoreFormSchema,
} from '@/features/hackathons/model/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import HackathonScoreFormContent from '../../hackathonPage/modal-form-contents/HackathonScoreFormContent'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonPageTeamCardProps {
  onSetScore: (teamId: number, data: ScoreFormData) => void
  team: HackathonTeam
  hackathonInfo: DetailedHackathon
  className?: string
  scores: Record<string, TeamJudgeScoreObject[]>
  canSetScores: boolean
}

const HackathonPageTeamCard = ({
  hackathonInfo,
  team,
  className,
  onSetScore,
  canSetScores,
  scores,
}: HackathonPageTeamCardProps) => {
  const jury = hackathonInfo.judges
  const criteria = hackathonInfo.criteria
  const user = cookiesApi.getUser()

  // Получаем оценку для текущей команды
  const teamScore = useMemo(() => {
    return scores[team.id]?.length > 0
  }, [scores, team.id])

  // Проверка прав доступа на оставление оценок
  const isAllowedToSetScore = useMemo(() => {
    if (jury && jury.length > 0) {
      return jury.some(jury => jury.user_id === user.id)
    }
    return false
  }, [jury, user])

  const form = useForm<ScoreFormData>({
    resolver: zodResolver(scoreFormSchema),
    defaultValues: criteria.reduce(
      (acc, curr) => {
        acc[curr.name] = 0
        return acc
      },
      {} as Record<string, number>,
    ),
  })

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonTeamCardStyles = clsx(styles.card, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={clsx(hackathonTeamCardStyles, className)}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h5 className={styles.name}>{team.name}</h5>
        </div>
        {canSetScores && isAllowedToSetScore ? (
          <div className={styles.actions}>
            {Array.isArray(criteria) && criteria.length > 0 ? (
              teamScore ? (
                <span>Оценка уже установлена</span>
              ) : (
                <ActionModal
                  title='Оставить оценку команде'
                  trigger={<Button>Оценить по критериям</Button>}
                  submitButtonText='Оставить оценку'
                  form={form}
                  onSave={async e => {
                    try {
                      const isValid = await form.trigger()
                      if (isValid) {
                        const data = form.getValues()
                        onSetScore(team.id, data)
                      } else {
                        console.log(
                          'Form validation failed:',
                          form.formState.errors,
                        )
                      }
                    } catch (error) {
                      console.error('Error in form submission:', error)
                    }
                  }}
                >
                  <HackathonScoreFormContent criteria={criteria} form={form} />
                </ActionModal>
              )
            ) : (
              <span>Нет критериев для оценки</span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default HackathonPageTeamCard
