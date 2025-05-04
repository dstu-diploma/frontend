import React from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { DialogHeader, DialogFooter } from '@/shared/ui/shadcn/dialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/shared/ui/shadcn/dialog'
import styles from './TeamConfirmModal.module.scss'

interface TeamConfirmModalProps {
  children: React.ReactNode
  title: string
  submitButtonText: string
  onConfirm: (event: React.FormEvent) => void
}

export const TeamConfirmModal = (props: TeamConfirmModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <form 
          onSubmit={props.onConfirm}
          className={styles.dialogForm}
        >
          <DialogHeader>
            <DialogTitle>
              <h4>{props.title}</h4>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className={styles.dialogActions}>
            <Button>
              Нет
            </Button>
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