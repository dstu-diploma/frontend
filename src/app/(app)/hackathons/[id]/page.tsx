'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/shared/ui/shadcn/button'
import { ConfirmModal } from '@/shared/ui/custom/ConfirmModal'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useRef, useEffect, useState } from 'react'
import { ActionModal } from '@/shared/ui/custom/ActionModal'
import { useHackathonForms } from '@/features/hackathons/hooks/useHackathonForms'
import { useHackathonCriteria } from '@/features/hackathons/hooks/useHackathonCriteria'
import { useHackathonJury } from '@/features/hackathons/hooks/useHackathonJury'
import { useHackathonPage } from '@/features/hackathons/hooks/useHackathonPage'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import HackathonInfoSidebar from '@/features/hackathons/ui/HackathonInfoSidebar'
import HackathonPageCriteria from '@/features/hackathons/ui/page-sections/HackathonPageCriteria'
import HackathonPageDescription from '@/features/hackathons/ui/page-sections/HackathonPageDescription'
import HackathonPageJury from '@/features/hackathons/ui/page-sections/HackathonPageJury'
import { HackathonPageTeams } from '@/features/hackathons/ui/page-sections/HackathonPageTeams'
import styles from './hackathonPage.module.scss'

const HackathonPage = () => {
  const { id } = useParams()
  const user = cookiesApi.getUser()
  const infoRef = useRef<HTMLDivElement>(null)
  const [sidebarTop, setSidebarTop] = useState(84)

  const {
    isUserTeamApplied,
    hasTeam,
    hackathonInfo,
    isHackathonLoading,
    handleApplicationSubmit,
  } = useHackathonPage(Number(id))

  const {
    criteria,
    handleCriterionCreation,
    handleCriterionUpdate,
    handleCriterionDeletion,
  } = useHackathonCriteria(Number(id))

  const { juryInfo, handleJuryAddition, handleJuryDeletion } = useHackathonJury(
    Number(id),
  )

  const { criterionForm, juryForm, editForm } = useHackathonForms(hackathonInfo)

  // Обновляем значения формы при изменении информации о хакатоне
  useEffect(() => {
    if (hackathonInfo) {
      editForm.reset({
        name: hackathonInfo.name,
        max_participant_count: hackathonInfo.max_participant_count,
        max_team_mates_count: hackathonInfo.max_team_mates_count,
        description: hackathonInfo.description,
        start_date: hackathonInfo.start_date,
        score_start_date: hackathonInfo.score_start_date,
        end_date: hackathonInfo.end_date,
      })
    }
  }, [hackathonInfo])

  useEffect(() => {
    const updateSidebarPosition = () => {
      if (infoRef.current) {
        const rect = infoRef.current.getBoundingClientRect()
        setSidebarTop(rect.top + window.scrollY + 20)
      }
    }

    updateSidebarPosition()
    window.addEventListener('resize', updateSidebarPosition)
    window.addEventListener('scroll', updateSidebarPosition)

    return () => {
      window.removeEventListener('resize', updateSidebarPosition)
      window.removeEventListener('scroll', updateSidebarPosition)
    }
  }, [])

  return (
    <div className={styles.hackathonPageContainer}>
      {isHackathonLoading ? (
        <span>Загрузка информации о хакатоне...</span>
      ) : (
        <div className={styles.hackathonPageContent}>
          <h1>Хакатон «{hackathonInfo?.name}»</h1>
          <div className={styles.hackathonPageInfo}>
            {user.role === 'user' ? (
              hasTeam ? (
                <Toolbar className={styles.hackathonPageInfoToolbar}>
                  <div className={styles.hackathonPageInfoToolbarButtons}>
                    {!isUserTeamApplied && (
                      <ConfirmModal
                        title={`Подать заявку на участие в хакатоне ${hackathonInfo?.name}?`}
                        submitButtonText='Подать'
                        onConfirm={handleApplicationSubmit}
                      >
                        <Button>Подать заявку на участие</Button>
                      </ConfirmModal>
                    )}
                    {isUserTeamApplied && (
                      <ActionModal
                        title='Загрузка вложения'
                        submitButtonText='Загрузить'
                        trigger={<Button>Добавить вложение</Button>}
                        onSave={e => {
                          e.preventDefault()
                          juryForm.handleSubmit(handleJuryAddition)(e)
                        }}
                      ></ActionModal>
                    )}
                    {isUserTeamApplied && (
                      <Link href={`/hackathons/${id}/team`}>
                        <Button>Моя команда</Button>
                      </Link>
                    )}
                  </div>
                </Toolbar>
              ) : (
                <Toolbar className={styles.hackathonPageInfoToolbar}>
                  У вас нет команды для записи на данный хакатон
                </Toolbar>
              )
            ) : null}
            <div className={styles.hackathonInfo} ref={infoRef}>
              <div className={styles.hackathonDetailedInfo}>
                <HackathonPageDescription hackathonInfo={hackathonInfo} />
                <HackathonPageCriteria
                  criteria={criteria}
                  criterionForm={criterionForm}
                  handleCriterionCreation={handleCriterionCreation}
                  handleCriterionUpdate={handleCriterionUpdate}
                  handleCriterionDeletion={handleCriterionDeletion}
                />
                <HackathonPageJury
                  juryInfo={juryInfo}
                  juryForm={juryForm}
                  handleJuryAddition={handleJuryAddition}
                  handleJuryDeletion={handleJuryDeletion}
                />
                <HackathonPageTeams hackathonInfo={hackathonInfo} />
              </div>
              <HackathonInfoSidebar
                hackathon={hackathonInfo}
                editForm={editForm}
                style={{ top: `${sidebarTop}px` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HackathonPage
