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
}

export interface HackathonTeam {
    id: number
    hackathon_id: number
    name: string
}

export interface HackathonTeamMate {
    team_id: number
    user_id: number
    is_captain: boolean
}

export interface HackathonTeamScore {
    id: number
    team_id: number
    criterion_id: number
    judge_user_id: number
    score: number
}

export interface HackathonTeamWithMates {
    id: number
    hackathon_id: number
    name: string
    mates: HackathonTeamMate[]
}

export interface Judge {
    id: number
    hackathon_id: number
    user_id: number
}

export interface JudgeUserId {
    judge_user_id: number
}

export interface Criterion {
    id: number
    name: string
    weight: number
}

export interface CriterionScore {
    criterion_id: number
    score: number
}

export interface CreateCriterion {
    name: string
    weight: number;
}
