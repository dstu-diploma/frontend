export interface TeamMember {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role?: string;
}

export interface TeamMate {
    team_id: number
    user_id: number
    is_captain: boolean
}

export interface TeamInvite {
    team_id: number
    user_id: number
}

export interface TeamCreateRequestBody {
    name: string
}

export interface TeamCreateResponseBody {
    id: number
    name: string
    owner_id: number
}

export interface TeamChangeOwnerRequestBody {
    user_id: number
}

export interface TeamChangeOwnerResponseBody {
    id: number
    name: string
    owner_id: number
}
