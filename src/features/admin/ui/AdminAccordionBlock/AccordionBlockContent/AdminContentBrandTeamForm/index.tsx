import React from 'react'
import styles from './AdminContentBrandTeamForm.module.scss'
import { TeamInfo } from '@/features/team'
import { type AdminTeamFormData } from '@/features/admin/model/schemas'
import { BrandTeamContent } from '@/features/team/ui/TeamPageContent/TeamPageContent'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

interface AdminContentBrandTeamFormProps {
  entity: TeamInfo
  onSubmit: (data: AdminTeamFormData) => void
}

const AdminContentBrandTeamForm = ({
  entity,
}: AdminContentBrandTeamFormProps) => {
  const user = cookiesApi.getUser()
  return (
    <div className={styles.brandTeamContent}>
      <BrandTeamContent user={user} teamInfo={entity} isAdmin={true} />
    </div>
  )
}

export default AdminContentBrandTeamForm
