'use client'

import React from 'react'
import { TeamMateRef } from '@/features/team/model/types'
import { ActionModal } from '@/shared/ui/custom/modals/ActionModal'
import { ConfirmModal } from '@/shared/ui/custom/modals/ConfirmModal'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import TeamSingleFieldFormContent from '../../modals/TeamSingleFieldFormContent'
import { useCreateModal } from '@/features/team/hooks/brandTeam/dialogs/useCreateModal'
import { useInviteModal } from '@/features/team/hooks/brandTeam/dialogs/useInviteModal'
import { useRenameModal } from '@/features/team/hooks/brandTeam/dialogs/useRenameModal'
import { useSetRoleModal } from '@/features/team/hooks/brandTeam/dialogs/useSetRoleModal'
import { confirmModalWarning } from '@/features/team/configs/confirmModalWarnings'
import styles from './TeamToolbar.module.scss'
import { UserPartial } from '@/features/user/model/types'

interface TeamToolbarProps {
  user: UserPartial
  settings: {
    hasTeam: boolean
    isCaptain: boolean
    isTeamLoading: boolean
    teamName: string
    teamMates: TeamMateRef[]
    handleTeamLeave: (event: React.FormEvent) => Promise<void>
    handleChangeCaptain: (
      event: React.FormEvent,
      member: TeamMateRef,
    ) => Promise<void>
  }
}

const TeamToolbar = (props: TeamToolbarProps) => {
  const user = props.user
  const {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamMates,
    handleTeamLeave,
    handleChangeCaptain,
  } = props.settings

  const { role, handleMateRoleChange, handleMateRoleSave } = useSetRoleModal()

  const { currentTeamName, handleTeamRename, handleTeamNameChange } =
    useRenameModal()

  const { newTeamName, handleTeamCreateChange, handleTeamCreate } =
    useCreateModal()

  const { mateEmail, handleTeamInviteChange, handleTeamInvite } =
    useInviteModal()

  const modalWarning = confirmModalWarning(teamMates, user)

  return (
    <Toolbar>
      <div className={styles.toolbarContent}>
        {isTeamLoading && <span>Загрузка данных о команде...</span>}
        {!isTeamLoading && !hasTeam && <span>Вы не состоите в команде</span>}
        <div className={styles.toolbarControls}>
          {!hasTeam && (
            <ActionModal
              title='Создание команды'
              submitButtonText='Создать команду'
              onSave={handleTeamCreate}
              trigger={<Button>Создать команду</Button>}
            >
              <TeamSingleFieldFormContent
                fieldName='name'
                value={newTeamName}
                onChange={handleTeamCreateChange}
                placeholder='Введите название новой команды'
                fieldType='text'
              />
            </ActionModal>
          )}
          {hasTeam && isCaptain && (
            <ActionModal
              title='Обновить название команды'
              submitButtonText='Изменить название'
              onSave={handleTeamRename}
              trigger={<Button>Изменить название команды</Button>}
            >
              <TeamSingleFieldFormContent
                fieldName='name'
                value={currentTeamName}
                onChange={handleTeamNameChange}
                placeholder='Введите новое название команды'
                fieldType='text'
              />
            </ActionModal>
          )}
          {hasTeam && (
            <ActionModal
              title='Установить или обновить роль'
              submitButtonText='Установить роль'
              onSave={handleMateRoleSave}
              trigger={<Button>Установить роль в команде</Button>}
            >
              <TeamSingleFieldFormContent
                fieldName='role'
                value={role}
                onChange={handleMateRoleChange}
                placeholder='Введите Вашу текущую роль в команде'
                fieldType='text'
              />
            </ActionModal>
          )}
          {hasTeam && isCaptain && (
            <ActionModal
              title='Пригласить участника'
              submitButtonText='Отправить приглашение'
              onSave={handleTeamInvite}
              trigger={<Button>Пригласить в команду</Button>}
            >
              <TeamSingleFieldFormContent
                fieldName='email'
                fieldType='email'
                value={mateEmail}
                onChange={handleTeamInviteChange}
                placeholder='Введите электронную почту пользователя'
              />
            </ActionModal>
          )}
          {hasTeam && isCaptain && teamMates && teamMates?.length > 1 && (
            <ConfirmModal
              title='Вы действительно хотите снять с себя права капитана?'
              submitButtonText='Снять права'
              warning={modalWarning}
              onConfirm={e =>
                handleChangeCaptain(
                  e,
                  teamMates?.find(
                    mate => mate.is_captain && mate.user_id == user.id,
                  ) as TeamMateRef,
                )
              }
            >
              <Button variant='destructive'>Cнять с себя права капитана</Button>
            </ConfirmModal>
          )}
          {hasTeam && (
            <ConfirmModal
              title='Вы действительно хотите покинуть команду?'
              submitButtonText='Покинуть'
              warning={modalWarning}
              onConfirm={handleTeamLeave}
            >
              <Button variant='destructive'>Покинуть команду</Button>
            </ConfirmModal>
          )}
        </div>
      </div>
    </Toolbar>
  )
}

export default TeamToolbar
