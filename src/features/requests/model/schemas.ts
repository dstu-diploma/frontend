import { z } from 'zod'

export const createRequestFormSchema = z.object({
  subject: z.string().min(1),
  message: z.string().min(1),
})

export type CreateRequestFormData = z.infer<typeof createRequestSchema>
