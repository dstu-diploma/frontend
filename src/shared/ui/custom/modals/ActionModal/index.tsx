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
  onSave: (event: React.FormEvent) => Promise<boolean | void> | boolean | void
  contentClassName?: string
  form?: UseFormReturn<any>
  isSubmitting?: boolean
  footerActions?: React.ReactNode
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

    // Если есть форма, проверяем валидацию
    if (props.form) {
      const isValid = await props.form.trigger()
      if (!isValid) {
        // Форма не валидна - не отправляем и не закрываем модалку
        return
      }
    }

    // Форма валидна или её нет - вызываем обработчик
    const result = await props.onSave(e)

    // Закрываем модалку только если onSave не вернул false
    if (result !== false) {
      setIsOpen(false)
    }
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
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <div>{props.trigger}</div>
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
            {props.footerActions ? (
              <div className={styles.footerActionsContainer}>
                {props.footerActions}
              </div>
            ) : (
              <Button
                variant={props.destructive ? 'destructive' : 'default'}
                type='submit'
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Отправка...' : props.submitButtonText}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
