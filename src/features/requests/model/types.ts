export interface CreatedRequest {
  message: string
  subject: string
}

export interface RequestMessage {
  id: number
  user_id: number
  message: string
  request_id: number
  send_date: string
}

export interface Request {
  id: number
  author_user_id: number
  subject: string
  create_date: string
  closed_by_user_id: number
}

export interface RequestMessage {
  message: string
}

export interface RequestWithMessages extends Request {
  messages: string[]
}
