// UI
export { TeamMemberCard } from './ui/cards/TeamMemberCard/'
export { TeamInviteCard } from './ui/cards/TeamInviteCard/'
export { ConfirmModal } from '../../shared/ui/custom/ConfirmModal'
export { ActionModal } from '../../shared/ui/custom/ActionModal'
export { TeamSidebar } from './ui/sidebar/TeamSidebar/'

// Хуки
export { useTeam } from './hooks/useTeam'
export { useInvites } from './hooks/useInvites'
export { useRenameModal } from './hooks/dialogs/useRenameModal'
export { useCreateModal } from './hooks/dialogs/useCreateModal'
export { useInviteModal } from './hooks/dialogs/useInviteModal'
export { useSetRoleModal } from './hooks/dialogs/useSetRoleModal'

// Типы
export type {
  TeamInfo,
  TeamMateRef,
  TeamMate,
  TeamInvite,
  TeamCreateRequestBody,
  TeamCreateResponseBody,
  TeamRenameRequestBody,
  TeamRenameResponseBody,
} from './model/types'

// API
export { teamApi } from './api'
