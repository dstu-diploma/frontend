import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import styles from './HackathonCriteriaFormContent.module.scss'
import { CriterionFormData } from '@/features/hackatons/model/schemas'
import { UseFormReturn } from 'react-hook-form'

interface HackathonCriteriaFormContentProps {
  form: UseFormReturn<CriterionFormData>
}

const HackathonCriteriaFormContent = ({
  form,
}: HackathonCriteriaFormContentProps) => {
  return (
    <div className={styles.dialogFormContentContainer}>
      <div className={styles.dialogFormContentItem}>
        <Label htmlFor='name'>Название критерия</Label>
        <Input
          id='name'
          type='text'
          className={styles.dialogFormInput}
          {...form.register('name')}
          placeholder='Введите название критерия'
        />
        {form.formState.errors.name && (
          <p className={styles.errorMessage}>
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className={styles.dialogFormContentItem}>
        <Label htmlFor='weight'>Вес критерия</Label>
        <Input
          id='name'
          type='text'
          className={styles.dialogFormInput}
          {...form.register('weight')}
          placeholder='Введите вес критерия (от 0 до 1)'
        />
        {form.formState.errors.weight && (
          <p className={styles.errorMessage}>
            {form.formState.errors.weight.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default HackathonCriteriaFormContent
