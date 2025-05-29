// UI
export { TeamMemberCard } from './ui/cards/TeamMemberCard/'
export { TeamInviteCard } from './ui/cards/TeamInviteCard/'
export { ConfirmModal } from '../../shared/ui/custom/modals/ConfirmModal'
export { ActionModal } from '../../shared/ui/custom/modals/ActionModal'
export { TeamSidebar } from './ui/sidebar/TeamSidebar/'

// Хуки
export { useTeam } from './hooks/brandTeam/useTeam'
export { useInvites } from './hooks/brandTeam/useInvites'
export { useRenameModal } from './hooks/brandTeam/dialogs/useRenameModal'
export { useCreateModal } from './hooks/brandTeam/dialogs/useCreateModal'
export { useInviteModal } from './hooks/brandTeam/dialogs/useInviteModal'
export { useSetRoleModal } from './hooks/brandTeam/dialogs/useSetRoleModal'

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
