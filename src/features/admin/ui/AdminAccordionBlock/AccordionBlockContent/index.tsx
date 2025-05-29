import React from 'react'
import { TeamInfo } from '@/features/team/model/types'
import { User } from '@/features/user'
import AdminContentUserForm from './AdminContentUserForm'
import AdminContentBrandTeamForm from './AdminContentBrandTeamForm'
import { isTeam, isUser } from '@/features/admin/model/guards'
import {
  AdminUserFormData,
  AdminTeamFormData,
} from '@/features/admin/model/schemas'
import styles from './AccordionBlockContent.module.scss'

interface AccordionBlockContentProps {
  entity: User | TeamInfo | undefined
}

export const AccordionBlockContent = ({
  entity,
}: AccordionBlockContentProps) => {
  const editUserSubmit = async (data: AdminUserFormData) => {
    console.log(data)
  }

  const editBrandTeamSubmit = async (data: AdminTeamFormData) => {
    // TODO: edit brand team
  }

  return (
    <div className={styles.accordionBlockContent}>
      {isUser(entity) && (
        <AdminContentUserForm
          entity={entity as User}
          onSubmit={editUserSubmit}
        />
      )}
      {isTeam(entity) && (
        <AdminContentBrandTeamForm
          entity={entity as TeamInfo}
          onSubmit={editBrandTeamSubmit}
        />
      )}
    </div>
  )
}
