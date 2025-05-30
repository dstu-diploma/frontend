'use client'

import EntityLoading from '@/shared/ui/custom/fallback/EntityLoading'
import Link from 'next/link'
import { memo } from 'react'
import { TeamMemberCard } from '../../cards/TeamMemberCard'
import styles from './HackathonTeamMembersList.module.scss'
import { TeamMateRef } from '@/features/team/model/types'
import { UserPartial } from '@/features/user/model/types'

interface HackathonTeamMembersListProps {
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

const HackathonTeamMembersList = memo(
  ({ user, settings }: HackathonTeamMembersListProps) => {
    const { teamMates, isCaptain, handleChangeCaptain, handleTeamKick } =
      settings

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
              member.user_id === user.id
                ? '/profile'
                : `/user/${member.user_id}`
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
  },
)

HackathonTeamMembersList.displayName = 'HackathonTeamMembersList'

export default HackathonTeamMembersList
