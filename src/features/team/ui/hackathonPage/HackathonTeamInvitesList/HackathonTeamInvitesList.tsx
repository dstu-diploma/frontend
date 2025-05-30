'use client'

import React from 'react'
import { TeamInviteCard } from '../../cards/TeamInviteCard'
import styles from './HackathonTeamInvitesList.module.scss'
import { useInvites } from '@/features/team'

const HackathonTeamInvitesList = () => {
  const { teamInvites, handleAcceptInvite, handleDenyInvite } = useInvites()

  return (
    <div className={styles.invitesContainer}>
      <h3>Приглашения</h3>
      <div className={styles.invites}>
        {teamInvites && teamInvites.length > 0 ? (
          teamInvites.map(invite => (
            <TeamInviteCard
              key={invite.team_id}
              invite={invite}
              onAccept={handleAcceptInvite}
              onReject={handleDenyInvite}
            />
          ))
        ) : (
          <span>Нет активных приглашений в команды</span>
        )}
      </div>
    </div>
  )
}

export default HackathonTeamInvitesList
