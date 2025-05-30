'use client'

import React, { useState, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/shared/ui/shadcn/button'
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { Dialog, DialogTrigger, DialogContent } from '@/shared/ui/shadcn/dialog'
import styles from './ActionModal.module.scss'
import clsx from 'clsx'

interface ActionModalProps {
  title: string
  trigger: React.ReactNode
  children?: React.ReactNode
  type?: 'actionWithField' | 'actionChoose'
  destructive?: boolean
  submitButtonText: string
  onSave: (event: React.FormEvent) => Promise<void> | void
  contentClassName?: string
  form?: UseFormReturn<any>
  isSubmitting?: boolean
}

export const ActionModal = (props: ActionModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Запрет на автоматический выбор текста в инпутах
  const preventAutoInputSelection = (e: Event) => {
    e.preventDefault()
    if (inputRef.current) {
      const input = inputRef.current
      const length = input.value.length
      input.focus({ preventScroll: true })
      input.setSelectionRange(length, length)
    }
  }

  // Обработка отправки формы. Если форма не валидна,
  // то не отправляем форму (и не закрываем модалку)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (props.form) {
      const isValid = await props.form.trigger()
      if (!isValid) {
        return
      }
    }

    await props.onSave(e)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent
        className={clsx(styles.dialogContent, props.contentClassName)}
        onOpenAutoFocus={preventAutoInputSelection}
      >
        <form onSubmit={handleSubmit} className={styles.dialogForm} noValidate>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <h4>{props.title}</h4>
          </DialogHeader>
          <div
            className={clsx(styles.dialogFormContent, props.contentClassName)}
          >
            {props.children}
          </div>
          <DialogFooter>
            <Button
              variant={props.destructive ? 'destructive' : 'default'}
              type='submit'
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? 'Отправка...' : props.submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
