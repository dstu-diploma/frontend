import { z } from 'zod'

export const createRequestFormSchema = z.object({
  hackathon_id: z.number().min(1, 'Выберите хакатон'),
  subject: z.string().min(1, 'Введите тему обращения'),
  message: z.string().min(1, 'Введите сообщение'),
})

export const createRequestFormInputSchema = z
  .object({
    hackathon_id: z.number().min(1, 'Выберите хакатон').optional(),
    subject: z.string().min(1, 'Введите тему обращения'),
    message: z.string().min(1, 'Введите сообщение'),
  })
  .refine(data => data.hackathon_id && data.hackathon_id > 0, {
    message: 'Выберите хакатон',
    path: ['hackathon_id'],
  })

export type CreateRequestFormData = z.infer<typeof createRequestFormSchema>
export type CreateRequestFormInputData = z.infer<
  typeof createRequestFormInputSchema
>
