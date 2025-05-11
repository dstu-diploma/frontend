'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/shared/ui/shadcn/button'
import { ConfirmModal } from '@/shared/ui/custom/ConfirmModal'
import { useHackathonPage } from '@/features/hackatons/hooks/useHackathonPage'
import {
  CriterionFormData,
  criterionFormSchema,
  JuryFormData,
  juryFormSchema,
} from '@/features/hackatons/model/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useHackathonCriteria } from '@/features/hackatons/hooks/useHackathonCriteria'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import HackathonInfoSidebar from '@/features/hackatons/ui/HackathonInfoSidebar'
import HackathonPageDescription from '@/features/hackatons/ui/hackathon-page-sections/HackathonPageDescription'
import HackathonPageCriteria from '@/features/hackatons/ui/hackathon-page-sections/HackathonPageCriteria'
import HackathonPageJury from '@/features/hackatons/ui/hackathon-page-sections/HackathonPageJury'
import { useRef, useEffect, useState } from 'react'
import styles from './hackathonPage.module.scss'
import { useHackathonJury } from '@/features/hackatons/hooks/useHackathonJury'
import { HackathonPageTeams } from '@/features/hackatons/ui/hackathon-page-sections/HackathonPageTeams'
import { ActionModal } from '@/shared/ui/custom/ActionModal'
import Link from 'next/link'

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

  const criterionForm = useForm<CriterionFormData>({
    resolver: zodResolver(criterionFormSchema),
    defaultValues: {
      name: '',
      weight: 0,
    },
  })

  const juryForm = useForm<JuryFormData>({
    resolver: zodResolver(juryFormSchema),
    defaultValues: {
      email: '',
    },
  })

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
