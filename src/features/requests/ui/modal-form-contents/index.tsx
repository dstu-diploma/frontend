import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreateRequestFormData } from '../../model/schemas'
import { Label } from '@/shared/ui/shadcn/label'
import { Input } from '@/shared/ui/shadcn/input'
import styles from './CreateRequestFormContent.module.scss'

interface CreateRequestFormContentProps {
  form: UseFormReturn<CreateRequestFormData>
}

const CreateRequestFormContent = ({ form }: CreateRequestFormContentProps) => {
  return (
    <div className={styles.requestForm}>
      <div className={styles.requestFormItem}>
        <Label htmlFor='subject'>Тема</Label>
        <Input
          id='subject'
          {...form.register('subject')}
          placeholder='Введите тему обращения'
        />
      </div>
      <div className={styles.requestFormItem}>
        <Label htmlFor='subject'>Сообщение</Label>
        <Input
          id='subject'
          {...form.register('message')}
          placeholder='Введите сообщение'
        />
      </div>
    </div>
  )
}

export default CreateRequestFormContent
