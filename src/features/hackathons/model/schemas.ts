import { z } from 'zod'

export const hackathonFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Название должно содержать минимум 3 символа')
      .max(100, 'Название не должно превышать 100 символов'),
    max_participant_count: z.coerce.number(),
    max_team_mates_count: z.coerce.number(),
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
  .refine(data => new Date(data.score_start_date) > new Date(data.start_date), {
    message: 'Дата начала оценок должна быть позже даты начала хакатона',
    path: ['score_start_date'],
  })
  .refine(data => new Date(data.end_date) > new Date(data.score_start_date), {
    message: 'Дата окончания должна быть позже даты начала оценок',
    path: ['end_date'],
  })

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
      return num >= 0 && num <= 1
    },
    {
      message: 'Введите целое число от 0 до 1',
    },
  ),
})

export const juryFormSchema = z.object({
  email: z.string().email('Введите корректный email'),
})

export type HackathonFormData = z.infer<typeof hackathonFormSchema>
export type CriterionFormData = z.infer<typeof criterionFormSchema>
export type JuryFormData = z.infer<typeof juryFormSchema>
export type DescriptionFormData = z.infer<typeof descriptionFormSchema>
