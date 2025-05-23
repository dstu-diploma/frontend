"use client"

import React from 'react'
import { TeamSidebar } from '../../sidebar/TeamSidebar'
import TeamToolbar from '../TeamToolbar/TeamToolbar'
import { useTeam } from '@/features/team/hooks/useTeam'
import TeamInvitesList from '../TeamInvitesList/TeamInvitesList'
import styles from './TeamPageContent.module.scss'
import TeamMembersList from '../TeamMembersList/TeamMembersList'
import { UserPartial } from '@/features/user/model/types'

interface TeamPageContentProps {
  user: UserPartial
}

const TeamPageContent = ({ user }: TeamPageContentProps) => {
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
    teamName,
    teamMates,
    handleTeamLeave,
    handleChangeCaptain,
  }

  const membersListSettings = {
    isTeamMatesLoading,
    teamMates,
    isCaptain,
    handleTeamKick,
    handleChangeCaptain
  }
    
  return (
    <div className={styles.teamContent}>
        <TeamToolbar user={user} settings={toolbarSettings} />
        {!hasTeam && !isTeamLoading && (
          <TeamInvitesList />
        )}
        {hasTeam && teamInfo && (
          <div className={styles.teamContents}>
            <h3>Участники команды</h3>
            <div className={styles.membersContainer}>
              <TeamMembersList user={user} settings={membersListSettings} />
              <TeamSidebar team={teamInfo} teamName={teamName} />
            </div>
          </div>
        )}
      </div>
  )
}

export default TeamPageContent