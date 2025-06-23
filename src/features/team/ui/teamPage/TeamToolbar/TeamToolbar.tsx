'use client'

import React from 'react'
import { TeamInfo, TeamMateRef } from '@/features/team/model/types'
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
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

interface TeamToolbarProps {
  user: UserPartial
  isAdmin: boolean
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
  adminSettings?: {
    currentBrandTeamName: string
    setNewBrandTeamName: React.Dispatch<React.SetStateAction<string>>
    currentNewCaptain: string
    setCurrentNewCaptain: React.Dispatch<React.SetStateAction<string>>
    handleBrandTeamRename: (e: React.FormEvent) => Promise<void>
    handleBrandTeamNameChange: (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => Promise<void>
    handleDeleteTeam: () => void
    handleTeamNameChange: (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => Promise<void>
    handleNewCaptainChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeCaptainRights: (
      e: React.FormEvent,
      isCaptain: boolean,
    ) => Promise<void>
  }
}

const TeamToolbar = (props: TeamToolbarProps) => {
  const user = props.user
  const isAdmin = props.isAdmin
  const {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamMates,
    handleTeamLeave,
    handleChangeCaptain,
  } = props.settings

  const {
    currentBrandTeamName = '',
    handleDeleteTeam = () => {},
    handleBrandTeamRename = () => {},
    handleBrandTeamNameChange = () => {},
  } = props.adminSettings ?? {}

  const { role, handleMateRoleChange, handleMateRoleSave } = useSetRoleModal()

  const { currentTeamName, handleTeamRename, handleTeamNameChange } =
    useRenameModal()

  const { newTeamName, handleTeamCreateChange, handleTeamCreate } =
    useCreateModal()

  const { mateEmail, handleTeamInviteChange, handleTeamInvite } =
    useInviteModal()

  const modalWarning = confirmModalWarning(teamMates, user)

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const toolbarStyles = clsx(styles.toolbar, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Toolbar className={toolbarStyles}>
      <div className={styles.toolbarContent}>
        {isTeamLoading && !props.adminSettings && (
          <span>Загрузка данных о команде...</span>
        )}
        {!isAdmin && !isTeamLoading && !hasTeam && (
          <span>Вы не состоите в команде</span>
        )}
        {!isAdmin && (
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
                <Button variant='destructive'>
                  Cнять с себя права капитана
                </Button>
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
        )}
        {isAdmin && (
          <div className={styles.toolbarControls}>
            <ActionModal
              title='Изменить название'
              submitButtonText='Изменить название'
              onSave={handleBrandTeamRename}
              trigger={<Button>Изменить название команды</Button>}
            >
              <TeamSingleFieldFormContent
                fieldName='name'
                placeholder='Введите название новой команды'
                value={currentBrandTeamName}
                onChange={
                  handleBrandTeamNameChange as (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => void
                }
                fieldType='text'
              />
            </ActionModal>
            <ConfirmModal
              title='Вы действительно хотите удалить команду?'
              submitButtonText='Удалить'
              onConfirm={handleDeleteTeam}
            >
              <Button variant='destructive'>Удалить команду</Button>
            </ConfirmModal>
          </div>
        )}
      </div>
    </Toolbar>
  )
}

export default TeamToolbar
