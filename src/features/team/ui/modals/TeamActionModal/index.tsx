import React from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { DialogHeader, DialogFooter } from '@/shared/ui/shadcn/dialog'
import { Input } from '@/shared/ui/shadcn/input'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/shared/ui/shadcn/dialog'
import styles from './TeamActionModal.module.scss'
import { Label } from '@radix-ui/react-dropdown-menu'

interface TeamActionModalProps {
  children: React.ReactNode
  type?: 'actionWithField' | 'actionChoose' 
  title: string
  fieldValue: string
  fieldName: string
  fieldPlaceholder: string
  labelText?: string
  fieldType?: 'text' | 'email'
  submitButtonText: string
  setFieldValue: React.Dispatch<React.SetStateAction<string>>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSave: (event: React.FormEvent) => void
}

export const TeamActionModal = (props: TeamActionModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <form 
          onSubmit={props.onSave}
          className={styles.dialogForm}
        >
          <DialogHeader>
            <DialogTitle>
              <h4>{props.title}</h4>
            </DialogTitle>
          </DialogHeader>
          <div className={styles.dialogFormContent}>
            {props.labelText && 
              <Label htmlFor={props.fieldName}>
                {props.labelText}
              </Label>
            }
            <Input 
              id={props.fieldName} 
              type={props.fieldType === 'email' ? 'email' : 'text'}
              className={styles.dialogFormInput}
              value={props.fieldValue}
              onChange={props.onChange} 
              placeholder={props.fieldPlaceholder}
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              {props.submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
