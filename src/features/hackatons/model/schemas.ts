import { z } from 'zod'

export const hackathonFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Название должно содержать минимум 3 символа')
      .max(100, 'Название не должно превышать 100 символов'),
    max_participant_count: z
      .string()
      .transform(val => parseInt(val))
      .pipe(
        z
          .number()
          .int('Количество участников должно быть целым числом')
          .min(1, 'Минимальное количество участников - 1')
          .max(1000, 'Максимальное количество участников - 1000'),
      ),
    max_team_mates_count: z
      .string()
      .transform(val => parseInt(val))
      .pipe(
        z
          .number()
          .int('Размер команды должен быть целым числом')
          .min(1, 'Минимальный размер команды - 1')
          .max(10, 'Максимальный размер команды - 10'),
      ),
    description: z
      .string()
      .min(10, 'Описание должно содержать минимум 10 символов')
      .max(1000, 'Описание не должно превышать 1000 символов'),
    start_date: z.string().refine(date => new Date(date) > new Date(), {
      message: 'Дата начала должна быть в будущем',
    }),
    score_start_date: z.string().refine(date => new Date(date) > new Date(), {
      message: 'Дата начала оценок должна быть в будущем',
    }),
    end_date: z.string().refine(date => new Date(date) > new Date(), {
      message: 'Дата окончания должна быть в будущем',
    }),
  })
  .refine(data => new Date(data.score_start_date) > new Date(data.start_date), {
    message: 'Дата начала оценок должна быть позже даты начала хакатона',
    path: ['juryStartDate'],
  })
  .refine(data => new Date(data.end_date) > new Date(data.score_start_date), {
    message: 'Дата окончания должна быть позже даты начала оценок',
    path: ['endDate'],
  })

export const criterionFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название не должно превышать 100 символов'),
  weight: z
    .string()
    .refine(val => !isNaN(parseFloat(val)), 'Вес должен быть числом')
    .transform(val => parseFloat(val))
    .refine(val => val >= 0 && val <= 1, 'Вес должен быть от 0 до 1'),
})

export const juryFormSchema = z.object({
  email: z.string().email('Некорректный email'),
})

export type HackathonFormData = z.output<typeof hackathonFormSchema>
export type CriterionFormData = z.output<typeof criterionFormSchema>
export type JuryFormData = z.output<typeof juryFormSchema>
