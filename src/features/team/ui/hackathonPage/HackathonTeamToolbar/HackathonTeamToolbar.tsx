'use client'

import React from 'react'
import { TeamMateRef } from '@/features/team/model/types'
import { ActionModal } from '@/shared/ui/custom/modals/ActionModal'
import { ConfirmModal } from '@/shared/ui/custom/modals/ConfirmModal'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import TeamSingleFieldFormContent from '../../modals/TeamSingleFieldFormContent'
import { confirmModalWarning } from '@/features/team/configs/confirmModalWarnings'
import styles from './HackathonTeamToolbar.module.scss'
import { UserPartial } from '@/features/user/model/types'
import { useHackathonSetRoleModal } from '@/features/team/hooks/hackathonTeam/dialogs/useHackathonSetRoleModal'
import { useAddMemberModal } from '@/features/team/hooks/hackathonTeam/dialogs/useAddMemberModal'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

interface HackathonTeamToolbarProps {
  hackathonId: number
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

const HackathonTeamToolbar = (props: HackathonTeamToolbarProps) => {
  const user = props.user
  const {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamMates,
    handleTeamLeave,
    handleChangeCaptain,
  } = props.settings

  const { role, handleMateRoleChange, handleMateRoleSave } =
    useHackathonSetRoleModal(props.hackathonId)

  const { mateEmail, handleTeamInviteChange, handleHackathonTeamAdd } =
    useAddMemberModal(props.hackathonId)

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
        {isTeamLoading && <span>Загрузка данных о команде...</span>}
        {!isTeamLoading && !hasTeam && <span>Вы не состоите в команде</span>}
        <div className={styles.toolbarControls}>
          {hasTeam && (
            <ActionModal
              title='Установить или обновить роль'
              submitButtonText='Установить роль'
              onSave={handleMateRoleSave}
              trigger={<Button>Установить название роли в команде</Button>}
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
              title='Добавить участника'
              submitButtonText='Добавление участника'
              onSave={handleHackathonTeamAdd}
              trigger={<Button>Добавить участника</Button>}
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

export default HackathonTeamToolbar
