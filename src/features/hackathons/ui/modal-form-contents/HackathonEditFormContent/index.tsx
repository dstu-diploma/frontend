import React from 'react'
import styles from './HackathonsEditFormContent.module.scss'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import { HackathonFormData } from '../../../model/schemas'
import { UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/shared/ui/shadcn/textarea'
import clsx from 'clsx'

interface HackathonEditFormContentProps {
  form: UseFormReturn<HackathonFormData>
}

const formatDateTimeForInput = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16)
}

const HackathonEditFormContent = ({ form }: HackathonEditFormContentProps) => {
  return (
    <div className={styles.dialogFormContentContainer}>
      <div className={styles.dialogFormColumn}>
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='name'>Название хакатона</Label>
          <Input
            id='name'
            type='text'
            className={styles.dialogFormInput}
            {...form.register('name')}
            placeholder='Введите название хакатона'
          />
          {form.formState.errors.name && (
            <p className={styles.errorMessage}>
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='startDate'>Дата начала хакатона</Label>
          <Input
            id='startDate'
            type='datetime-local'
            className={styles.dialogFormInput}
            {...form.register('start_date')}
            defaultValue={formatDateTimeForInput(form.getValues('start_date'))}
          />
          {form.formState.errors.start_date && (
            <p className={styles.errorMessage}>
              {form.formState.errors.start_date.message}
            </p>
          )}
        </div>
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='juryStartDate'>Дата начала оценок жюри</Label>
          <Input
            id='juryStartDate'
            type='datetime-local'
            className={styles.dialogFormInput}
            {...form.register('score_start_date')}
            defaultValue={formatDateTimeForInput(
              form.getValues('score_start_date'),
            )}
          />
          {form.formState.errors.score_start_date && (
            <p className={styles.errorMessage}>
              {form.formState.errors.score_start_date.message}
            </p>
          )}
        </div>
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='endDate'>Дата окончания хакатона</Label>
          <Input
            id='endDate'
            type='datetime-local'
            className={styles.dialogFormInput}
            {...form.register('end_date')}
            defaultValue={formatDateTimeForInput(form.getValues('end_date'))}
          />
          {form.formState.errors.end_date && (
            <p className={styles.errorMessage}>
              {form.formState.errors.end_date.message}
            </p>
          )}
        </div>
      </div>
      <div className={styles.dialogFormColumn}>
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='maxParticipants'>
            Максимальное количество участников
          </Label>
          <Input
            id='maxParticipants'
            type='number'
            className={styles.dialogFormInput}
            {...form.register('max_participant_count')}
            placeholder='Введите количество участников'
          />
          {form.formState.errors.max_participant_count && (
            <p className={styles.errorMessage}>
              {form.formState.errors.max_participant_count.message}
            </p>
          )}
        </div>
        <div className={styles.dialogFormContentItem}>
          <Label htmlFor='teamSize'>
            Максимальный состав участников команды
          </Label>
          <Input
            id='teamSize'
            type='number'
            className={styles.dialogFormInput}
            {...form.register('max_team_mates_count')}
            placeholder='Введите размер команды'
          />
          {form.formState.errors.max_team_mates_count && (
            <p className={styles.errorMessage}>
              {form.formState.errors.max_team_mates_count.message}
            </p>
          )}
        </div>
        <div
          className={clsx(
            styles.dialogFormContentItem,
            styles.dialogFormDescriptionEditor,
          )}
        >
          <Label htmlFor='description'>Описание хакатона</Label>
          <Textarea
            id='description'
            className={styles.dialogFormInput}
            {...form.register('description')}
            placeholder='Введите описание хакатона'
          />
          {form.formState.errors.description && (
            <p className={styles.errorMessage}>
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HackathonEditFormContent
