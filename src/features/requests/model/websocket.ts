export interface WSOpenRequest {
  action: 'request_opened'
  data: {
    id: number
    author_user_id: number
    subject: string
    create_date: string
    closed_by_user_id: null
  }
}

export interface WSMessage {
  action: 'message'
  data: {
    id: number
    user_id: number
    message: string
    request_id: number
    send_date: string
  }
}

export interface WSCloseRequest {
  action: 'request_closed'
  data: {
    id: number
    author_user_id: number
    subject: string
    create_date: string
    closed_by_user_id: number
  }
}
