import React from 'react'
import styles from './AdminContentBrandTeamForm.module.scss'
import { TeamInfo } from '@/features/team'
import { type AdminTeamFormData } from '@/features/admin/model/schemas'
import { BrandTeamContent } from '@/features/team/ui/TeamPageContent/TeamPageContent'

interface AdminContentBrandTeamFormProps {
  entity: TeamInfo
  onSubmit: (data: AdminTeamFormData) => void
}

const AdminContentBrandTeamForm = ({
  entity,
}: AdminContentBrandTeamFormProps) => {
  return (
    <div className={styles.brandTeamContent}>
      <BrandTeamContent
        user={{
          id:
            entity.mates.find(mate => mate.is_captain)?.user_id ??
            entity.mates[0].user_id,
          first_name:
            entity.mates.find(mate => mate.is_captain)?.user_name ??
            entity.mates[0].user_name,
          last_name: '',
          patronymic: '',
          register_date: new Date().toISOString(),
          is_captain: true,
          role_desc:
            entity.mates.find(mate => mate.is_captain)?.role_desc ??
            entity.mates[0].role_desc,
        }}
        teamInfo={entity}
        isAdmin={true}
      />
    </div>
  )
}

export default AdminContentBrandTeamForm
