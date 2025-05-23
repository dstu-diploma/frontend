"use client"

import EntityLoading from '@/shared/ui/custom/EntityLoading'
import Link from 'next/link'
import React from 'react'
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
    handleChangeCaptain: (event: React.FormEvent, member: TeamMateRef) => Promise<void>
    handleTeamKick: (event: React.FormEvent, member: TeamMateRef) => Promise<void>
  }
}

const TeamMembersList = (props: TeamMembersListProps) => {
  const user = props.user;
  const {
    isTeamMatesLoading,
    teamMates,
    isCaptain,
    handleChangeCaptain,
    handleTeamKick,
  } = props.settings;
  return (
    <div className={styles.teamMembers}>
                <div className={styles.members}>
                  {isTeamMatesLoading ? (
                    <EntityLoading />
                  ) : teamMates && teamMates?.length > 0 ? (
                    teamMates?.map(member => (
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
                    ))
                  ) : (
                    <span className={styles.noMates}>
                      В команде нет активных участников
                    </span>
                  )}
                </div>
              </div>
  )
}

export default TeamMembersList