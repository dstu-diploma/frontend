import { UserUpload } from '@/features/user/model/types'

export interface TeamRef {
  id: number
  name: string
  mates: TeamMate[]
}

// Объект информации о команде
export interface TeamInfo {
  id: number
  name: string
  mates: TeamMateRef[]
}

export interface HackathonTeamInfo extends TeamInfo {
  submission: UserUpload[]
  hackathon_id: number
  hackathon_name: string
}

export interface HackathonTeamSubmission {
  id: number
  team_id: number
  hackathon_id: number
  name: string
  s3_key: string
  content_type: string
  uploaded_at: string
  url: string
}

// Объект cсылки на участника команды
export interface TeamMateRef {
  team_id: number
  user_id: number
  user_name: string
  is_captain: boolean
  role_desc: string
  user_uploads: UserUpload[]
}

// Объект участника команды
export interface TeamMate {
  id: number
  user_name: number
  register_date: string
  is_captain: boolean
}

// Объект приглашения
export interface TeamInvite {
  team_id: number
  user_id: number
  team_name: string
  user_name: string
}

// Объект запроса и ответа для смены капитана
export interface TeamCaptainRequestBody {
  user_id: number
  is_captain: boolean
}
export interface TeamCaptainResponseBody {
  team_id: number
  user_id: number
  is_captain: boolean
  role_desc: string
}

// Объекта запроса и ответа для создания команды
export interface TeamCreateRequestBody {
  name: string
}
export interface TeamCreateResponseBody {
  id: number
  name: string
}

// Объекта запроса и ответа для смены имени команды
export interface TeamRenameRequestBody {
  name: string
}
export interface TeamRenameResponseBody {
  id: number
  name: string
}
