'use client'

import React from 'react'
import { ActionModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import { useHackathonCreate } from '@/features/hackathons/hooks/useHackathonCreate'
import styles from './HackathonCreateModal.module.scss'
import HackathonEditFormContent from '../../hackathonPage/modal-form-contents/HackathonEditFormContent'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

const HackathonCreateModal = () => {
  const { createForm, hackathonCreationHandler } = useHackathonCreate()

  // Мобильные стили
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonsListToolbarStyles = clsx(styles.hackathonsListToolbar, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Toolbar className={hackathonsListToolbarStyles}>
      <div className={styles.toolbarContent}>
        <ActionModal
          title='Объявление хакатона'
          trigger={<Button>Объявить новый хакатон</Button>}
          submitButtonText='Объявить'
          onSave={e => {
            e.preventDefault()
            createForm.handleSubmit(hackathonCreationHandler)(e)
          }}
          contentClassName={styles.hackathonCreateModal}
        >
          <HackathonEditFormContent form={createForm} />
        </ActionModal>
      </div>
    </Toolbar>
  )
}

export default HackathonCreateModal
