'use client'

import React from 'react'
import { TeamSidebar } from '../sidebar/TeamSidebar'
import TeamToolbar from '../teamPage/TeamToolbar/TeamToolbar'
import TeamInvitesList from '../teamPage/TeamInvitesList/TeamInvitesList'
import TeamMembersList from '../teamPage/TeamMembersList/TeamMembersList'
import { UserPartial } from '@/features/user/model/types'
import { useTeam } from '@/features/team/hooks/brandTeam/useTeam'
import { useHackathonTeam } from '@/features/team/hooks/hackathonTeam/useHackathonTeam'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import styles from './TeamPageContent.module.scss'
import HackathonTeamToolbar from '../hackathonPage/HackathonTeamToolbar/HackathonTeamToolbar'
import HackathonTeamMembersList from '../hackathonPage/HackathonTeamMembersList/HackathonTeamMembersList'
import HackathonTeamSubmissionSidebar from '../hackathonPage/HackathonTeamSubmissionSidebar'

interface TeamPageContentProps {
  user: UserPartial
  path: string
}

const BrandTeamContent = ({ user }: { user: UserPartial }) => {
  const {
    isCaptain,
    isTeamLoading,
    isTeamMatesLoading,
    hasTeam,
    teamName,
    teamMates,
    teamInfo,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
  } = useTeam()

  const toolbarSettings = {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamName: teamName ?? '',
    teamMates: teamMates ?? [],
    handleTeamLeave,
    handleChangeCaptain,
  }

  const membersListSettings = {
    isTeamMatesLoading,
    teamMates: teamMates ?? [],
    isCaptain,
    handleTeamKick,
    handleChangeCaptain,
  }

  if (isTeamLoading) {
    return <LayoutFallback text='Загрузка данных о команде...' />
  }

  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.teamTitle}>Моя команда</h1>
      <div className={styles.teamContent}>
        <TeamToolbar user={user} settings={toolbarSettings} />
        {!hasTeam && !isTeamLoading && <TeamInvitesList />}
        {hasTeam && teamInfo && (
          <div className={styles.teamContents}>
            <h3>Участники команды</h3>
            <div className={styles.membersContainer}>
              <TeamMembersList user={user} settings={membersListSettings} />
              <TeamSidebar team={teamInfo} teamName={teamName ?? ''} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const HackathonTeamContent = ({
  user,
  path,
}: {
  user: UserPartial
  path: string
}) => {
  const pageId = Number(path.split('/')[2])
  const {
    isCaptain,
    isTeamLoading,
    hasTeam,
    teamName,
    teamMates,
    teamInfo,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
  } = useHackathonTeam(pageId)

  const toolbarSettings = {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamName: teamName ?? '',
    teamMates: teamMates ?? [],
    handleTeamLeave,
    handleChangeCaptain,
  }

  const membersListSettings = {
    teamMates: teamMates ?? [],
    isCaptain,
    handleTeamKick,
    handleChangeCaptain,
  }

  if (isTeamLoading) {
    return <LayoutFallback text='Загрузка данных о команде...' />
  }

  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.teamTitle}>Команда «{teamInfo?.name}»</h1>
      <div className={styles.teamContent}>
        <HackathonTeamToolbar
          hackathonId={pageId}
          user={user}
          settings={toolbarSettings}
        />
        {!hasTeam && !isTeamLoading && <TeamInvitesList />}
        {hasTeam && teamInfo && (
          <div className={styles.teamContents}>
            <h3>Участники команды</h3>
            <div className={styles.membersContainer}>
              <HackathonTeamMembersList
                user={user}
                settings={membersListSettings}
              />
              <div className={styles.hackathonTeamSidebars}>
                <TeamSidebar team={teamInfo} teamName={teamName ?? ''} />
                <HackathonTeamSubmissionSidebar
                  submission={teamInfo?.submission}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const TeamPageContent = ({ user, path }: TeamPageContentProps) => {
  const teamType = path.endsWith('/team') ? 'brand' : 'hackathon'

  return teamType === 'brand' ? (
    <BrandTeamContent user={user} />
  ) : (
    <HackathonTeamContent user={user} path={path} />
  )
}

export default TeamPageContent
