'use client'

import EntityLoading from '@/shared/ui/custom/fallback/EntityLoading'
import Link from 'next/link'
import { memo } from 'react'
import { TeamMemberCard } from '../../cards/TeamMemberCard'
import styles from './TeamMembersList.module.scss'
import { TeamMateRef } from '@/features/team/model/types'
import { UserPartial } from '@/features/user/model/types'

interface TeamMembersListProps {
  user: UserPartial
  settings: {
    isTeamMatesLoading: boolean
    teamMates: TeamMateRef[]
    isCaptain: boolean
    handleChangeCaptain: (
      event: React.FormEvent,
      member: TeamMateRef,
    ) => Promise<void>
    handleTeamKick: (
      event: React.FormEvent,
      member: TeamMateRef,
    ) => Promise<void>
  }
}

const TeamMembersList = memo(({ user, settings }: TeamMembersListProps) => {
  const {
    isTeamMatesLoading,
    teamMates,
    isCaptain,
    handleChangeCaptain,
    handleTeamKick,
  } = settings

  if (isTeamMatesLoading) {
    return (
      <div className={styles.teamMembers}>
        <div className={styles.members}>
          <EntityLoading />
        </div>
      </div>
    )
  }

  if (!teamMates?.length) {
    return (
      <div className={styles.teamMembers}>
        <div className={styles.members}>
          <span className={styles.noMates}>
            В команде нет активных участников
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.teamMembers}>
      {teamMates.map(member => (
        <Link
          key={member.user_id}
          href={
            member.user_id === user.id ? '/profile' : `/user/${member.user_id}`
          }
          className={styles.link}
        >
          <TeamMemberCard
            member={member}
            isCaptain={isCaptain}
            onChangeRights={handleChangeCaptain}
            onKick={handleTeamKick}
          />
        </Link>
      ))}
    </div>
  )
})

TeamMembersList.displayName = 'TeamMembersList'

export default TeamMembersList
