import {
  Criterion,
  TeamJudgeScoreObject,
} from '@/features/hackathons/model/types'
import React from 'react'
import styles from './ScoreCardContent.module.scss'
import { Input } from '@/shared/ui/shadcn/input'
import { Button } from '@/shared/ui/shadcn/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface ScoreCardContentProps {
  teamScores: TeamJudgeScoreObject[]
  criteria: Criterion[]
}

type FormData = {
  [key: string]: number
}

const ScoreCardContent = ({ teamScores, criteria }: ScoreCardContentProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Create dynamic validation schema based on teamScores
  const validationSchema = z.object(
    teamScores.reduce(
      (acc, score) => ({
        ...acc,
        [String(score.criterion_id)]: z
          .number()
          .min(0, 'Оценка не может быть меньше 0')
          .max(100, 'Оценка не может быть больше 100'),
      }),
      {},
    ),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: teamScores.reduce(
      (acc, score) => ({
        ...acc,
        [String(score.criterion_id)]: score.score,
      }),
      {},
    ),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Here you would typically make an API call to update the scores
      console.log('Form data:', data)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className={styles.accordionBlockForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.accordionBlockFormСontainer}>
        <div className={styles.accordionBlockFormColumns}>
          <div className={styles.accordionBlockFormGroup}>
            <div className={styles.accordionBlockFormRow}>
              {teamScores.map(score => (
                <div key={score.id} className={styles.accordionBlockFormItem}>
                  <label
                    htmlFor={`${score.criterion_id}`}
                    className={styles.formItemLabel}
                  >
                    {criteria && criteria.length > 0
                      ? (criteria.find(
                          criterion => criterion.id === score.criterion_id,
                        )?.name ?? score.criterion_id)
                      : score.criterion_id}
                  </label>
                  <Input
                    id={String(score.criterion_id)}
                    type='number'
                    {...register(String(score.criterion_id), {
                      valueAsNumber: true,
                    })}
                    className={styles.accordionBlockFormInput}
                  />
                  {errors[String(score.criterion_id)] && (
                    <span className={styles.errorMessage}>
                      {errors[String(score.criterion_id)]?.message as string}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.accordionBlockFormButtons}>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Обновление...' : 'Обновить оценку'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ScoreCardContent
