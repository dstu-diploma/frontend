'use client'

import React, { useState } from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { Dialog, DialogTrigger, DialogContent } from '@/shared/ui/shadcn/dialog'
import { ModalWarningObject } from '@/features/team/configs/confirmModalWarnings'
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  children: React.ReactNode
  title: string
  submitButtonText: string
  warning?: ModalWarningObject
  onConfirm: (event: React.FormEvent) => void
}

export const ConfirmModal = (props: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <form
          onSubmit={e => {
            props.onConfirm(e)
            setIsOpen(false)
          }}
          className={styles.dialogForm}
        >
          <DialogHeader className={styles.dialogConfirmHeader}>
            <DialogTitle></DialogTitle>
            <div className={styles.dialogConfirmTitle}>
              <h4 className={styles.dialogConfirmTitleText}>{props.title}</h4>
              {props.warning && (
                <p className={styles.dangerWarning}>{props.warning.message}</p>
              )}
            </div>
          </DialogHeader>
          {props.warning?.type !== 'restricted' && (
            <DialogFooter className={styles.dialogActions}>
              <Button
                onClick={e => {
                  setIsOpen(false)
                  e.preventDefault()
                }}
              >
                Нет
              </Button>
              <Button
                type='submit'
                variant='destructive'
                onClick={e => {
                  e.preventDefault()
                  const form = e.currentTarget.closest('form')
                  if (form) {
                    props.onConfirm(e as unknown as React.FormEvent)
                    setIsOpen(false)
                  }
                }}
              >
                {props.submitButtonText}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
