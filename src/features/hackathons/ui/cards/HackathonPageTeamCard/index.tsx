import clsx from 'clsx'
import React, { useMemo } from 'react'
import styles from './HackathonPageTeamCard.module.scss'
import {
  DetailedHackathon,
  HackathonTeam,
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

interface HackathonPageTeamCardProps {
  onSetScore: (teamId: number, data: ScoreFormData) => void
  team: HackathonTeam
  hackathonInfo: DetailedHackathon
  className?: string
}

const HackathonPageTeamCard = ({
  hackathonInfo,
  team,
  className,
  onSetScore,
}: HackathonPageTeamCardProps) => {
  const jury = hackathonInfo.judges
  const criteria = hackathonInfo.criteria
  const user = cookiesApi.getUser()

  // Проверка прав доступа на оставление оценок
  const isAllowedToSetScore = useMemo(() => {
    if (jury && jury.length > 0) {
      return jury.some(jury => jury.user_id === user.id)
    }
    return false
  }, [jury, user])

  const form = useForm<ScoreFormData>({
    resolver: zodResolver(scoreFormSchema),
    defaultValues: {
      criteria: criteria.reduce(
        (acc, curr) => {
          acc[curr.name] = 0
          return acc
        },
        {} as Record<string, number>,
      ),
    },
  })

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h5 className={styles.name}>{team.name}</h5>
        </div>
        {isAllowedToSetScore && (
          <div
            className={styles.actions}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <ActionModal
              title='Оставить оценку команде'
              trigger={<Button>Оценить по критериям</Button>}
              submitButtonText='Оставить оценку'
              form={form}
              onSave={async e => {
                e.preventDefault()
                form.handleSubmit(data => {
                  onSetScore(team.id, data)
                })()
              }}
            >
              <HackathonScoreFormContent criteria={criteria} form={form} />
            </ActionModal>
          </div>
        )}
      </div>
    </div>
  )
}

export default HackathonPageTeamCard
