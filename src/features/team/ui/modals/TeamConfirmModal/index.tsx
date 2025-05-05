"use client"

import React, { useState } from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { DialogHeader, DialogFooter } from '@/shared/ui/shadcn/dialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/shared/ui/shadcn/dialog'
import styles from './TeamConfirmModal.module.scss'

interface TeamConfirmModalProps {
  children: React.ReactNode
  title: string
  submitButtonText: string
  isCaptainText?: string | undefined
  onConfirm: (event: React.FormEvent) => void
}

export const TeamConfirmModal = (props: TeamConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <form 
          onSubmit={props.onConfirm}
          className={styles.dialogForm}
        >
          <DialogHeader className={styles.dialogConfirmHeader}>
            <DialogTitle className={styles.dialogConfirmTitle}>
              <h4 className={styles.dialogConfirmTitleText}>{props.title}</h4>
              {props.isCaptainText && 
                <p className={styles.dangerWarning}>{props.isCaptainText}</p>
              }
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className={styles.dialogActions}>
            <Button 
              onClick={
                (e) => {
                  setIsOpen(false)
                  e.preventDefault()
                }
              }
            >Нет</Button>
            <Button 
              type="submit"
              variant='destructive'
            >
              {props.submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}