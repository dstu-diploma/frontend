import React from 'react'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import clsx from 'clsx'
import styles from './HackathonPageTeams.module.scss'
import { ActionModal } from '@/shared/ui/custom/ActionModal'
import { DetailedHackathon } from '@/features/hackatons/model/types'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import HackathonPageTeamCard from '../../HackathonPageTeamCard'
import { TeamInfo } from '@/features/team'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import { Button } from '@/shared/ui/shadcn/button'

interface HackathonPageTeamsProps {
  hackathonInfo: DetailedHackathon | null
}

export const HackathonPageTeams = ({
  hackathonInfo,
}: HackathonPageTeamsProps) => {
  const user = cookiesApi.getUser()
  console.log('User role:', user.role)

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Save clicked')
  }

  return (
    <Toolbar className={styles.hackathonTeams}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonTeamsContainer,
        )}
      >
        <h4>Команды-участники</h4>
        <div className={styles.hackathonTeamsList}>
          {hackathonInfo?.teams && hackathonInfo.teams.length > 0 ? (
            hackathonInfo.teams.map(team => {
              console.log('Team:', team)
              const isAdminOrJuryOrOrganizer =
                user.role === 'admin' ||
                user.role === 'jury' ||
                user.role === 'organizer'
              console.log('Should show modal:', isAdminOrJuryOrOrganizer)

              return isAdminOrJuryOrOrganizer ? (
                <ActionModal
                  key={team.id}
                  title='Обновление критериев оценки'
                  submitButtonText='Добавить'
                  onSave={handleSave}
                  trigger={
                    <Button variant='default' className={styles.teamCardButton}>
                      <HackathonPageTeamCard team={team} />
                    </Button>
                  }
                >
                  <div className={styles.dialogFormContent}>
                    <div className={styles.dialogFormContentItem}>
                      <Label htmlFor='score'>Оценка</Label>
                      <Input
                        id='score'
                        type='number'
                        placeholder='Введите оценку'
                        className={styles.dialogFormInput}
                      />
                    </div>
                  </div>
                </ActionModal>
              ) : (
                <HackathonPageTeamCard key={team.id} team={team} />
              )
            })
          ) : (
            <div className={styles.noCriteria}>
              <span>На данный момент нет команд-участников</span>
            </div>
          )}
        </div>
      </div>
    </Toolbar>
  )
}
