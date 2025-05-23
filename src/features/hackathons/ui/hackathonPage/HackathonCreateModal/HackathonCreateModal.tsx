"use client"

import React from 'react'
import { ActionModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import { useHackathonCreate } from '@/features/hackathons/hooks/useHackathonCreate'
import HackathonEditFormContent from '../../modal-form-contents/HackathonEditFormContent'
import styles from './HackathonCreateModal.module.scss'

const HackathonCreateModal = () => {
  const { createForm, hackathonCreationHandler } = useHackathonCreate()

  return (
    <Toolbar>
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