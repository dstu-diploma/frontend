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
import { useScreenSize } from '@/providers/ScreenSizeProvider'

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

  console.log('ActionModal rendered, isOpen:', isOpen)

  // Запрет на автоматический выбор текста в инпутах
  const preventAutoInputSelection = (e: Event) => {
    console.log('preventAutoInputSelection called')
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
    console.log('handleSubmit called')
    e.preventDefault()

    if (props.form) {
      console.log('Checking form validation')
      const isValid = await props.form.trigger()
      console.log('Form validation result:', isValid)
      if (!isValid) {
        return
      }
    }

    console.log('Calling onSave')
    await props.onSave(e)
    console.log('Setting isOpen to false')
    setIsOpen(false)
  }

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const actionModalContent = clsx(styles.dialogContent, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        console.log('Dialog onOpenChange called with:', open)
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <div onClick={() => console.log('DialogTrigger clicked')}>
          {props.trigger}
        </div>
      </DialogTrigger>
      <DialogContent
        className={clsx(actionModalContent, props.contentClassName)}
        onOpenAutoFocus={preventAutoInputSelection}
      >
        <form onSubmit={handleSubmit} className={styles.dialogForm} noValidate>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <h4 className={styles.dialogTitle}>{props.title}</h4>
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
