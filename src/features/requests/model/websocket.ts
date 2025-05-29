export type WSActions = 'message' | 'request_opened' | 'request_closed'

export interface WSOpenRequestData {
  id: number
  author_user_id: number
  subject: string
  create_date: string
  closed_by_user_id: null
}

export interface WSMessageData {
  id: number
  user_id: number
  message: string
  request_id: number
  send_date: string
}

export interface WSCloseRequestData {
  id: number
  author_user_id: number
  subject: string
  create_date: string
  closed_by_user_id: number
}
