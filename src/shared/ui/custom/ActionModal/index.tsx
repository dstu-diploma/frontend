import React, { useState, useRef } from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import { DialogHeader, DialogFooter } from '@/shared/ui/shadcn/dialog'
import { Input } from '@/shared/ui/shadcn/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import styles from './ActionModal.module.scss'
import { Label } from '@/shared/ui/shadcn/label'
import clsx from 'clsx'

// type ActionModalFieldConfig = {
//   fieldValue: string
//   fieldName: string
//   fieldPlaceholder: string
//   labelText?: string
//   fieldType?: 'text' | 'email'
//   setFieldValue: React.Dispatch<React.SetStateAction<string>>
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

interface ActionModalProps {
  title: string
  trigger: React.ReactNode
  children?: React.ReactNode
  type?: 'actionWithField' | 'actionChoose'
  destructive?: boolean
  submitButtonText: string
  onSave: (event: React.FormEvent) => void
  contentClassName?: string
}

export const ActionModal = (props: ActionModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const preventAutoInputSelection = (e: Event) => {
    e.preventDefault()
    if (inputRef.current) {
      const input = inputRef.current
      const length = input.value.length
      input.focus({ preventScroll: true })
      input.setSelectionRange(length, length)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent
        className={clsx(styles.dialogContent, props.contentClassName)}
        onOpenAutoFocus={preventAutoInputSelection}
      >
        <form
          onSubmit={e => {
            props.onSave(e)
            setIsOpen(false)
          }}
          className={styles.dialogForm}
        >
          <DialogHeader>
            <DialogTitle>
              <h4>{props.title}</h4>
            </DialogTitle>
          </DialogHeader>
          <div
            className={clsx(styles.dialogFormContent, props.contentClassName)}
          >
            {/* {props.singleFieldConfig && (
              <div className={styles.dialogFormContentItem}>
                {props.singleFieldConfig.labelText && (
                  <Label htmlFor={props.singleFieldConfig.fieldName}>
                    {props.singleFieldConfig.labelText}
                  </Label>
                )}
                <Input
                  ref={inputRef}
                  id={props.singleFieldConfig.fieldName}
                  type={
                    props.singleFieldConfig.fieldType === 'email'
                      ? 'email'
                      : 'text'
                  }
                  className={styles.dialogFormInput}
                  value={props.singleFieldConfig.fieldValue}
                  onChange={props.singleFieldConfig.onChange}
                  placeholder={props.singleFieldConfig.fieldPlaceholder}
                />
              </div>
            )} */}
            {props.children}
          </div>
          <DialogFooter>
            <Button
              variant={props.destructive ? 'destructive' : 'default'}
              type='submit'
            >
              {props.submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
