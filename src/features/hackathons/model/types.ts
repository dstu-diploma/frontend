import { UserUpload } from '@/features/user/model/types'

// Объекты с информацией о хакатонах
export interface Hackathon {
  id: number
  name: string
  max_participant_count: number
  max_team_mates_count: number
  description: string
  start_date: string
  score_start_date: string
  end_date: string
}
export interface DetailedHackathon extends Hackathon {
  teams: HackathonTeam[]
  judges: Judge[]
  criteria: Criterion[]
  uploads: UserUpload[]
}

// Объекты с информацией о командах в хакатонах
export interface HackathonTeam {
  id: number
  hackathon_id: number
  name: string
  hackathon_name: string
  submission_url: string
}

// Объекты с информацией о участниках команд в хакатонах
export interface HackathonTeamMate {
  team_id: number
  user_id: number
  is_captain: boolean
}

// Объекты с информацией о оценках команд в хакатонах
export interface HackathonTeamScore {
  id: number
  team_id: number
  criterion_id: number
  judge_user_id: number
  score: number
}

// Объекты с информацией о командах в хакатонах с информацией о участниках команд
export interface HackathonTeamWithMates {
  id: number
  hackathon_id: number
  name: string
  mates: HackathonTeamMate[]
}

// Объекты с информацией о судьях в хакатонах
export interface Judge {
  id: number
  hackathon_id: number
  user_id: number
  user_name: string
  user_uploads: UserUpload[]
}

// Объекты с информацией о судьях в хакатонах с информацией о пользователях
export interface JudgeUserId {
  judge_user_id: number
}

// Объекты с информацией о критериях в хакатонах
export interface Criterion {
  id: number
  name: string
  weight: number
}

// Объекты с информацией о оценках критериев в хакатонах
export interface CriterionScore {
  criterion_id: number
  score: number
}
// Объекты с информацией о создании критериев в хакатонах
export interface CreateCriterion {
  name: string
  weight: number
}

// Объект оценки команды по заданному критерию
export interface TeamScore {
  criterion_id: number
  score: number
}

// Объект оценки команды по критерию от члена жюри
export interface TeamJudgeScoreObject {
  id: number
  team_id: number
  team_name: string
  criterion_id: number
  judge_user_id: number
  judge_user_name: string
  score: number
}

// Объект вложения
export interface Attachment {
  id: number
  hackathon_id: number
  name: string
  content_type: string
  uploaded_at: string
  link: string
}

// Объекты с информацией о загрузке вложений в хакатоны
export interface UploadHackathonAttachmentRequestBody {
  hackathon_id: number
  file: File
}

// Объекты с информацией о удалении вложений в хакатоны
export interface DeleteHackathonAttachmentRequestBody {
  hackathon_id: number
  file_id: number
}

// Объект с информацией о вложении в хакатоны
export interface HackathonAttachmentResponseBody {
  id: number
  hackathon_id: number
  name: string
  content_type: string
  uploaded_at: string
}
