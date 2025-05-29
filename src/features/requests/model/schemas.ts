import { z } from 'zod'

export const createRequestFormSchema = z.object({
  hackathon_id: z.number(),
  subject: z.string().min(1),
  message: z.string().min(1),
})

export type CreateRequestFormData = z.infer<typeof createRequestFormSchema>
