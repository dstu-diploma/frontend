'use client'

import { useParams } from 'next/navigation'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useEffect, useMemo } from 'react'
import { useHackathonForms } from '@/features/hackathons/hooks/useHackathonForms'
import { useHackathonCriteria } from '@/features/hackathons/hooks/useHackathonCriteria'
import { useHackathonJury } from '@/features/hackathons/hooks/useHackathonJury'
import { useHackathonPage } from '@/features/hackathons/hooks/useHackathonPage'
import HackathonPageMyScores from '@/features/hackathons/ui/hackathonPage/page-sections/HackathonPageMyScores'
import HackathonPageCriteria from '@/features/hackathons/ui/hackathonPage/page-sections/HackathonPageCriteria'
import HackathonPageDescription from '@/features/hackathons/ui/hackathonPage/page-sections/HackathonPageDescription'
import HackathonPageJury from '@/features/hackathons/ui/hackathonPage/page-sections/HackathonPageJury'
import { HackathonPageTeams } from '@/features/hackathons/ui/hackathonPage/page-sections/HackathonPageTeams'
import HackathonAttachmentsSidebar from '@/features/hackathons/ui/hackathonPage/sidebar/HackathonAttachmentsSidebar'
import HackathonInfoSidebar from '@/features/hackathons/ui/hackathonPage/sidebar/HackathonInfoSidebar'
import HackathonPageActionsToolbar from '@/features/hackathons/ui/hackathonPage/actionsToolbar'
import styles from './hackathonPage.module.scss'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import HackathonPageLeaderboard from '@/features/hackathons/ui/hackathonPage/page-sections/HackathonPageLeaderboard'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { teamApi } from '@/features/team'

const HackathonPage = () => {
  const { id } = useParams()
  const user = cookiesApi.getUser()

  const {
    hasTeam,
    isUserTeamApplied,
    hackathonInfo,
    isHackathonLoading,
    handleApplicationSubmit,
    handleHackathonUpdate,
    handleEditHackathonDescription,
  } = useHackathonPage(Number(id))

  const {
    handleCriterionCreation,
    handleCriterionUpdate,
    handleCriterionDeletion,
  } = useHackathonCriteria(Number(id))

  const {
    myTeamScores,
    handleJuryAddition,
    handleJuryDeletion,
    handleSetJuryTeamScore,
  } = useHackathonJury(Number(id), hackathonInfo)

  const {
    criterionForm,
    criterionDeletionForm,
    juryForm,
    editForm,
    editDescriptionForm,
  } = useHackathonForms(hackathonInfo)

  const { data: userTeamInfo } = teamApi.useGetMyTeamInfo()

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
      editDescriptionForm.reset({
        description: hackathonInfo.description,
      })
    }
  }, [hackathonInfo, editDescriptionForm, editForm])

  // Является ли пользователь капитаном
  const isUserTeamCaptain = useMemo(() => {
    if (userTeamInfo && userTeamInfo.mates.length > 0) {
      const userInTeam = userTeamInfo.mates.find(
        mate => user.id === mate.user_id,
      )
      return userInTeam?.is_captain
    }
  }, [userTeamInfo])

  // Права на секции
  const canSeeScores =
    user &&
    hackathonInfo &&
    user.role === 'judge' &&
    hackathonInfo?.judges.some(judge => judge.user_id === user.id)

  // Проверка периода оценки
  const isScorePeriod = useMemo(() => {
    if (!hackathonInfo) return false

    const now = new Date()
    const scoreStartDate = new Date(hackathonInfo.score_start_date)
    const endDate = new Date(hackathonInfo.end_date)

    return now >= scoreStartDate && now < endDate
  }, [hackathonInfo])

  // Проверка начала хакатона
  const isStartPeriod = useMemo(() => {
    if (!hackathonInfo) return false

    const now = new Date()
    const endDate = new Date(hackathonInfo.start_date)

    return now >= endDate
  }, [hackathonInfo])

  // Проверка периода оценки
  const isEndPeriod = useMemo(() => {
    if (!hackathonInfo) return false

    const now = new Date()
    const endDate = new Date(hackathonInfo.end_date)

    return now >= endDate
  }, [hackathonInfo])

  // Объект c правами на секции
  const permissions = {
    canSeeLeaderboard: hackathonInfo?.teams.length > 0 && isEndPeriod,
    canSeeScores: canSeeScores && isScorePeriod,
    canSetScores: isScorePeriod,
  }

  // Мобильные стили
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonPageStyles = clsx(styles.hackathonPageContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={hackathonPageStyles}>
      {isHackathonLoading ? (
        <LayoutFallback text='Загрузка информации о хакатоне...' />
      ) : (
        <div className={styles.hackathonPageContent}>
          <h1>Хакатон «{hackathonInfo?.name}»</h1>
          <div className={styles.hackathonPageInfo}>
            {user.role === 'user' ? (
              <HackathonPageActionsToolbar
                hasTeam={hasTeam}
                onHackathonApply={handleApplicationSubmit}
                isUserTeamApplied={isUserTeamApplied}
                isUserTeamCaptain={isUserTeamCaptain}
                hackathonInfo={hackathonInfo}
              />
            ) : null}
            <div className={styles.hackathonInfo}>
              <div className={styles.hackathonDetailedInfo}>
                <HackathonPageDescription
                  hackathonInfo={hackathonInfo}
                  form={editDescriptionForm}
                  onSave={handleEditHackathonDescription}
                />
                {permissions.canSeeLeaderboard && (
                  <HackathonPageLeaderboard hackathonId={hackathonInfo?.id} />
                )}
                <HackathonPageCriteria
                  isStartPeriod={isStartPeriod}
                  criteria={hackathonInfo?.criteria}
                  criterionForm={criterionForm}
                  criterionDeletionForm={criterionDeletionForm}
                  handleCriterionCreation={handleCriterionCreation}
                  handleCriterionUpdate={handleCriterionUpdate}
                  handleCriterionDeletion={handleCriterionDeletion}
                />
                <HackathonPageJury
                  isStartPeriod={isStartPeriod}
                  juryInfo={hackathonInfo?.judges}
                  juryForm={juryForm}
                  handleJuryAddition={handleJuryAddition}
                  handleJuryDeletion={handleJuryDeletion}
                />
                {permissions.canSeeScores && (
                  <HackathonPageMyScores
                    hackathonId={hackathonInfo?.id}
                    scores={myTeamScores}
                  />
                )}
                <HackathonPageTeams
                  scores={myTeamScores}
                  hackathonInfo={hackathonInfo}
                  canSetScores={permissions.canSetScores}
                  onSetScore={handleSetJuryTeamScore}
                />
              </div>
              <div className={styles.hackathonSidebars}>
                <HackathonInfoSidebar
                  hackathon={hackathonInfo}
                  editForm={editForm}
                  onHackathonUpdate={handleHackathonUpdate}
                />
                <HackathonAttachmentsSidebar
                  attachments={hackathonInfo?.uploads}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HackathonPage
