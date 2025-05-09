'use client'

import React, { useState } from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { DialogHeader, DialogFooter } from '@/shared/ui/shadcn/dialog'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  children: React.ReactNode
  title: string
  submitButtonText: string
  isCaptainText?: string | undefined
  isSingleCaptainText?: string | undefined
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
            <DialogTitle className={styles.dialogConfirmTitle}>
              <h4 className={styles.dialogConfirmTitleText}>{props.title}</h4>
              {props.isCaptainText && (
                <p className={styles.dangerWarning}>{props.isCaptainText}</p>
              )}
              {props.isSingleCaptainText && (
                <p className={styles.dangerWarning}>
                  {props.isSingleCaptainText}
                </p>
              )}
            </DialogTitle>
          </DialogHeader>
          {!props.isSingleCaptainText && (
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
