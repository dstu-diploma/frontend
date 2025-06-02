import React from 'react'
import styles from './HackathonInfoSidebar.module.scss'
import { Button } from '@/shared/ui/shadcn/button'
import { ActionModal } from '@/shared/ui/custom/modals/ActionModal'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import HackathonEditFormContent from '../../modal-form-contents/HackathonEditFormContent'
import { UseFormReturn } from 'react-hook-form'
import GeneralInfoSidebarContent from '../../sidebar-contents/GeneralInfoSidebarContent'
import HackathonPageSidebar from '../HackathonPageSidebar'
import { HackathonFormData } from '@/features/hackathons/model/schemas'
import { DetailedHackathon } from '@/features/hackathons/model/types'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

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

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const sidebarActionsStyles = clsx(styles.sidebarActions, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <HackathonPageSidebar
      title='Информация о хакатоне'
      actions={
        isPrivilegedRole() && (
          <div className={sidebarActionsStyles}>
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
