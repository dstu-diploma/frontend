import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import React from 'react'
import styles from './HackathonCriteriaFormContent.module.scss'
import {
  CriterionFormData,
  CriterionDeletionData,
} from '@/features/hackathons/model/schemas'
import { UseFormReturn } from 'react-hook-form'
import { Criterion } from '@/features/hackathons/model/types'
import TabSelect from '@/features/admin/ui/AdminTabFilter/TabSelect/TabSelect'

interface BaseHackathonCriteriaFormContentProps {
  deletion?: boolean
  update?: boolean
  criteria?: Criterion[]
}

interface CreationFormProps extends BaseHackathonCriteriaFormContentProps {
  form: UseFormReturn<CriterionFormData>
  deletion?: false
  update?: false
}

interface UpdateFormProps extends BaseHackathonCriteriaFormContentProps {
  form: UseFormReturn<CriterionFormData>
  deletion?: false
  update: true
}

interface DeletionFormProps extends BaseHackathonCriteriaFormContentProps {
  form: UseFormReturn<CriterionDeletionData>
  deletion: true
  update?: false
}

type HackathonCriteriaFormContentProps =
  | CreationFormProps
  | UpdateFormProps
  | DeletionFormProps

const HackathonCriteriaFormContent = (
  props: HackathonCriteriaFormContentProps,
) => {
  const { form, deletion, update, criteria } = props
  // Преобразуем критерии в опции для TabSelect
  const criteriaOptions =
    criteria?.map(criterion => ({
      value: criterion.name,
      label: criterion.name,
    })) || []

  return (
    <div className={styles.dialogFormContentContainer}>
      <div className={styles.dialogFormContentItem}>
        <Label htmlFor='name'>Название критерия</Label>
        {deletion || update ? (
          <div className={styles.dialogFormInput}>
            <TabSelect
              key={form.watch('name').toString() || 'default'}
              selectedValue={form.watch('name').toString() || undefined}
              handleSelect={value => {
                form.setValue('name', value)
              }}
              placeholder={
                deletion
                  ? 'Выберите критерий для удаления'
                  : 'Выберите критерий для обновления'
              }
              options={criteriaOptions}
              position='popper'
              sideOffset={4}
              align='start'
              side='bottom'
              triggerClassName={styles.hackathonChooseSelectTrigger}
            />
          </div>
        ) : (
          <Input
            id='name'
            type='text'
            className={styles.dialogFormInput}
            {...form.register('name')}
            placeholder='Введите название критерия'
          />
        )}
        {form.formState.errors.name && (
          <p className={styles.errorMessage}>
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      {!deletion && (
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='weight'>Вес критерия</Label>
          <Input
            id='weight'
            type='text'
            className={styles.dialogFormInput}
            {...form.register('weight')}
            placeholder='Введите вес критерия (от 0.1 до 1)'
          />
          {form.formState.errors.weight && (
            <p className={styles.errorMessage}>
              {form.formState.errors.weight.message}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default HackathonCriteriaFormContent
