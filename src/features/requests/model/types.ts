import { UserUpload } from '@/features/user/model/types'

export interface CreateRequestBody {
  hackathon_id: number
  message: string
  subject: string
}

export interface MinimalRequestData {
  id: number
  author_user_id: number
  author_name: string
  author_uploads: UserUpload[]
  subject: string
  create_date: string
  closed_by_user_id: number
  closed_by_name: string
  closed_by_uploads: UserUpload[]
  hackathon_id: number
  hackathon_name: string
}

export interface Request {
  id: number
  author_user_id: number
  author_name: string
  author_uploads: UserUpload[]
  subject: string
  create_date: string
  closed_by_user_id: number
  closed_by_name: string
  closed_by_uploads: UserUpload[]
  hackathon_id: number
  hackathon_name: string
  messages: ChatMessage[]
}

export interface ChatMessage {
  id: number
  user_id: number
  user_name: string
  user_uploads: UserUpload[]
  message: string
  request_id: number
  send_date: string
}

export interface RequestMessage {
  message: string
}

export interface CreatedRequest {
  id: number
  hackathon_id: number
  message: string
  subject: string
  created_at: string
  updated_at: string
  closed_by_user_id: number | null
  user_id: number
}
