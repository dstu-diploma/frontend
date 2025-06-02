import React from 'react'
import styles from './HackathonsEditFormContent.module.scss'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import { UseFormReturn } from 'react-hook-form'
import {
  dateTimeLocalToIso,
  isoToDateTimeLocal,
} from '@/shared/lib/helpers/date'
import { HackathonFormData } from '@/features/hackathons/model/schemas'
import clsx from 'clsx'
import CustomMDEditor from '@/shared/ui/custom/misc/CustomMDEditor/CustomMDEditor'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonEditFormContentProps {
  form: UseFormReturn<HackathonFormData>
}

const HackathonEditFormContent = ({ form }: HackathonEditFormContentProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const editHackathonFormContentStyles = clsx(
    styles.dialogFormContentContainer,
    {
      [styles.mobile]: isMobile,
      [styles.tablet]: isTablet,
      [styles.desktop]: isDesktop,
      [styles.mediumDesktop]: isMediumDesktop,
    },
  )

  return (
    <div className={editHackathonFormContentStyles}>
      <div className={styles.dialogFormRow}>
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
        </div>
        <div className={styles.dialogFormColumn}>
          <div className={styles.dialogFormContentItem}>
            <Label htmlFor='startDate'>Дата начала хакатона</Label>
            <Input
              id='startDate'
              type='datetime-local'
              className={styles.dialogFormInput}
              value={isoToDateTimeLocal(form.watch('start_date'))}
              onChange={e => {
                form.setValue('start_date', dateTimeLocalToIso(e.target.value))
              }}
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
              value={isoToDateTimeLocal(form.watch('score_start_date'))}
              onChange={e => {
                form.setValue(
                  'score_start_date',
                  dateTimeLocalToIso(e.target.value),
                )
              }}
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
              value={isoToDateTimeLocal(form.watch('end_date'))}
              onChange={e => {
                form.setValue('end_date', dateTimeLocalToIso(e.target.value))
              }}
            />
            {form.formState.errors.end_date && (
              <p className={styles.errorMessage}>
                {form.formState.errors.end_date.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.dialogFormRow}>
        <div
          className={clsx(styles.dialogFormContentItem, styles.markdownWrapper)}
        >
          <Label htmlFor='description'>Описание хакатона</Label>
          <CustomMDEditor
            value={form.watch('description')}
            onChange={value => {
              form.setValue('description', value || '')
            }}
            mdClassName={styles.markdownEditor}
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
