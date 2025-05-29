import React from 'react'
import styles from './HackathonInfoSidebar.module.scss'
import { DetailedHackathon } from '../../../model/types'
import { Button } from '@/shared/ui/shadcn/button'
import { ActionModal } from '@/shared/ui/custom/modals/ActionModal'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import HackathonEditFormContent from '../../modal-form-contents/HackathonEditFormContent'
import { UseFormReturn } from 'react-hook-form'
import { HackathonFormData } from '../../../model/schemas'
import GeneralInfoSidebarContent from '../../sidebar-contents/GeneralInfoSidebarContent'
import HackathonPageSidebar from '../HackathonPageSidebar'

interface HackathonInfoSidebarProps {
  hackathon: DetailedHackathon | null
  editForm: UseFormReturn<HackathonFormData>
  style?: React.CSSProperties
  onHackathonUpdate: (data: HackathonFormData) => Promise<void>
}

const HackathonInfoSidebar = ({
  hackathon,
  editForm,
  onHackathonUpdate,
}: HackathonInfoSidebarProps) => {
  if (!hackathon) return null

  return (
    <HackathonPageSidebar
      title='Информация о хакатоне'
      actions={
        isPrivilegedRole() && (
          <div className={styles.sidebarActions}>
            <ActionModal
              title='Редактирование хакатона'
              trigger={<Button>Редактировать</Button>}
              submitButtonText='Сохранить'
              form={editForm}
              onSave={async e => {
                await editForm.handleSubmit(onHackathonUpdate)(e)
              }}
              contentClassName={styles.editHackathonModal}
            >
              <HackathonEditFormContent form={editForm} />
            </ActionModal>
          </div>
        )
      }
    >
      <GeneralInfoSidebarContent hackathon={hackathon} />
    </HackathonPageSidebar>
  )
}

export default HackathonInfoSidebar
