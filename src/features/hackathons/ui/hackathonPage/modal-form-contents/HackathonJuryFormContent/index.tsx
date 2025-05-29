import { Label } from '@/shared/ui/shadcn/label'
import React from 'react'
import { Input } from '@/shared/ui/shadcn/input'
import { JuryFormData } from '@/features/hackatons/model/schemas'
import { UseFormReturn } from 'react-hook-form'
import styles from './HackathonJuryFormContent.module.scss'

interface HackathonJuryFormContentProps {
  form: UseFormReturn<JuryFormData>
}

const HackathonJuryFormContent = ({ form }: HackathonJuryFormContentProps) => {
  return (
    <div className={styles.dialogFormContentContainer}>
      <div className={styles.dialogFormContentItem}>
        <Label htmlFor='name'>Email</Label>
        <Input
          id='name'
          type='text'
          className={styles.dialogFormInput}
          {...form.register('email')}
          placeholder='Введите email члена жюри'
        />
        {form.formState.errors.email && (
          <p className={styles.errorMessage}>
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default HackathonJuryFormContent
