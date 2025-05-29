import React from 'react'
import styles from './HackathonScoreFormContent.module.scss'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import { ScoreFormData } from '@/features/hackathons/model/schemas'
import { Criterion } from '@/features/hackathons/model/types'
import { UseFormReturn } from 'react-hook-form'

interface HackathonScoreFormContentProps {
  criteria: Criterion[] | undefined
  form: UseFormReturn<ScoreFormData>
}

const HackathonScoreFormContent = ({
  criteria,
  form,
}: HackathonScoreFormContentProps) => {
  return (
    <div className={styles.dialogFormContentContainer}>
      <div className={styles.dialogFormColumn}>
        {criteria && criteria.length > 0 ? (
          criteria.map(criterion => (
            <div key={criterion.id} className={styles.dialogFormContentItem}>
              <Label htmlFor={`criteria.${criterion.name}`}>
                {criterion.name}
              </Label>
              <Input
                id={`criteria.${criterion.name}`}
                type='text'
                className={styles.dialogFormInput}
                {...form.register(`criteria.${criterion.name}`, {
                  valueAsNumber: true,
                })}
              />
              {form.formState.errors.criteria?.[criterion.name] && (
                <p className={styles.errorMessage}>
                  {form.formState.errors.criteria[criterion.name]?.message}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>Нет критериев для оценки</p>
        )}
      </div>
    </div>
  )
}

export default HackathonScoreFormContent
