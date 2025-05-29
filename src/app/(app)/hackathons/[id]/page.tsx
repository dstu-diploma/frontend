'use client'

import { useParams } from 'next/navigation'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useEffect } from 'react'
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

  const { criterionForm, juryForm, editForm, editDescriptionForm } =
    useHackathonForms(hackathonInfo)

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

  // Права на секции
  const canSeeScores =
    user &&
    hackathonInfo &&
    user.role === 'judge' &&
    hackathonInfo?.judges.some(judge => judge.user_id === user.id)

  return (
    <div className={styles.hackathonPageContainer}>
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
                <HackathonPageCriteria
                  criteria={hackathonInfo?.criteria}
                  criterionForm={criterionForm}
                  handleCriterionCreation={handleCriterionCreation}
                  handleCriterionUpdate={handleCriterionUpdate}
                  handleCriterionDeletion={handleCriterionDeletion}
                />
                <HackathonPageJury
                  juryInfo={hackathonInfo?.judges}
                  juryForm={juryForm}
                  handleJuryAddition={handleJuryAddition}
                  handleJuryDeletion={handleJuryDeletion}
                />
                {canSeeScores && (
                  <HackathonPageMyScores
                    hackathonId={hackathonInfo?.id}
                    scores={myTeamScores}
                  />
                )}
                <HackathonPageTeams
                  hackathonInfo={hackathonInfo}
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
