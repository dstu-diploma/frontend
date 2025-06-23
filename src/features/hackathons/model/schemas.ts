import { z } from 'zod'

export const hackathonFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Название должно содержать минимум 3 символа')
      .max(100, 'Название не должно превышать 100 символов'),
    max_participant_count: z.coerce.number(),
    max_team_mates_count: z.coerce.number(),
    description: z.string(),
    start_date: z.string(),
    score_start_date: z.string().superRefine((date, ctx) => {
      const startDate = new Date((ctx.path[0] as any).start_date)
      const scoreStartDate = new Date(date)
      if (scoreStartDate < startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Дата начала оценок должна быть не раньше даты начала хакатона',
        })
      }
    }),
    end_date: z.string().superRefine((date, ctx) => {
      const scoreStartDate = new Date((ctx.path[0] as any).score_start_date)
      const endDate = new Date(date)
      if (endDate < scoreStartDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Дата окончания должна быть не раньше даты начала оценок',
        })
      }
    }),
  })
  .refine(
    data => {
      const maxParticipants = Number(data.max_participant_count)
      const maxTeamMates = Number(data.max_team_mates_count)
      return maxTeamMates <= maxParticipants
    },
    {
      message: 'Размер команды не может быть больше общего числа участников',
      path: ['max_team_mates_count'],
    },
  )

export const descriptionFormSchema = z.object({
  description: z
    .string()
    .max(1000, 'Описание не должно превышать 1000 символов'),
})

export const criterionFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название не должно превышать 100 символов'),
  weight: z.string().refine(
    val => {
      const num = Number(val)
      return num > 0 && num <= 1
    },
    {
      message: 'Введите число от 0 до 1 (не равное 0)',
    },
  ),
})

export const criterionDeletionSchema = z.object({
  name: z
    .string()
    .min(1, 'Выберите критерий из списка')
    .refine(val => val.trim() !== '', {
      message: 'Выберите критерий из списка',
    }),
  weight: z.string().optional(),
})

export const juryFormSchema = z.object({
  email: z.string().email('Введите корректный email'),
})

export const scoreFormSchema = z.object({
  criteria: z
    .record(
      z.string(),
      z
        .number()
        .min(0, 'Значение не может быть меньше 0')
        .max(100, 'Значение не может превышать 100'),
    )
    .refine(data => Object.keys(data).length > 0, {
      message: 'Добавьте хотя бы один критерий',
    }),
})

export type HackathonFormData = z.infer<typeof hackathonFormSchema>
export type CriterionFormData = z.infer<typeof criterionFormSchema>
export type CriterionDeletionData = z.infer<typeof criterionDeletionSchema>
export type JuryFormData = z.infer<typeof juryFormSchema>
export type DescriptionFormData = z.infer<typeof descriptionFormSchema>
export type ScoreFormData = z.infer<typeof scoreFormSchema>
