'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui/shadcn/button'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import UserCardSkeleton from '@/shared/ui/custom/UserCardSkeleton'
import { UserPartial } from '@/features/user/model/types'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import {
  TeamMemberCard,
  TeamSidebar,
  ActionModal,
  ConfirmModal,
  TeamInviteCard,
  useTeam,
  useInvites,
  useRenameModal,
  useCreateModal,
  useInviteModal,
  useSetRoleModal,
  type TeamInfo,
} from '@/features/team/'
import styles from './team.module.scss'

export default function TeamsPage() {
  const user = cookiesApi.getUser()

  const {
    isCaptain,
    isTeamLoading,
    isTeamMatesLoading,
    hasTeam,
    teamInfo,
    teamRole,
    teamMates,
    teamInfoName,
    handleTeamLeave,
    refreshTeamInfo,
    refreshTeamMates,
    refreshTeamName,
    handleChangeCaptain,
  } = useTeam()

  const { userInvites, handleAcceptInvite, handleDenyInvite } = useInvites({
    refreshTeamInfo,
  })

  const { role, setRole, handleMateRoleChange, handleMateRoleSave } =
    useSetRoleModal({ refreshTeamMates, teamRole })

  const { teamName, setTeamName, handleTeamRename, handleTeamNameChange } =
    useRenameModal({ teamInfoName, refreshTeamName })

  const {
    setNewTeamName,
    newTeamName,
    handleTeamCreateChange,
    handleTeamCreate,
  } = useCreateModal({ refreshTeamInfo })

  const { mateEmail, setMateEmail, handleTeamInviteChange, handleTeamInvite } =
    useInviteModal()

  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.teamTitle}>Моя команда</h1>
      <div className={styles.teamContent}>
        <Toolbar>
          <div className={styles.toolbarContent}>
            {isTeamLoading && <span>Загрузка данных о команде...</span>}
            {!isTeamLoading && !hasTeam && (
              <span>Вы не состоите в команде</span>
            )}
            <div className={styles.toolbarControls}>
              {!hasTeam && !isTeamLoading && (
                <ActionModal
                  title='Создание команды'
                  fieldName='name'
                  fieldValue={newTeamName}
                  setFieldValue={setNewTeamName}
                  fieldPlaceholder='Введите название новой команды'
                  submitButtonText='Создать команду'
                  onChange={handleTeamCreateChange}
                  onSave={handleTeamCreate}
                >
                  <Button>Создать команду</Button>
                </ActionModal>
              )}
              {hasTeam && isCaptain && (
                <ActionModal
                  fieldName='name'
                  title='Обновить название команды'
                  fieldValue={teamName}
                  setFieldValue={setTeamName}
                  fieldPlaceholder='Введите новое название команды'
                  submitButtonText='Изменить название'
                  onChange={handleTeamNameChange}
                  onSave={handleTeamRename}
                >
                  <Button>Изменить название команды</Button>
                </ActionModal>
              )}
              {hasTeam && (
                <ActionModal
                  fieldName='name'
                  title='Установить или обновить роль'
                  fieldValue={role}
                  setFieldValue={setRole}
                  fieldPlaceholder='Введите Вашу текущую роль в команде'
                  submitButtonText='Установить роль'
                  onChange={handleMateRoleChange}
                  onSave={handleMateRoleSave}
                >
                  <Button>Изменить свою роль в команде</Button>
                </ActionModal>
              )}
              {hasTeam && isCaptain && (
                <ActionModal
                  fieldName='email'
                  title='Пригласить участника'
                  fieldValue={mateEmail}
                  setFieldValue={setMateEmail}
                  fieldType='email'
                  fieldPlaceholder='Введите электронную почту пользователя'
                  submitButtonText='Отправить приглашение'
                  onChange={handleTeamInviteChange}
                  onSave={handleTeamInvite}
                >
                  <Button>Пригласить в команду</Button>
                </ActionModal>
              )}
              {hasTeam && isCaptain && (
                <ConfirmModal
                  title='Вы действительно хотите снять с себя права капитана?'
                  submitButtonText='Снять права'
                  isSingleCaptainText={
                    teamMates?.filter(mate => mate.is_captain).length == 1
                      ? 'Назначьте нового капитана, т.к. вы единственный капитан'
                      : ''
                  }
                  onConfirm={e =>
                    handleChangeCaptain(
                      e,
                      teamMates?.find(
                        mate => mate.is_captain && mate.id == user.id,
                      ) as UserPartial,
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
                  isSingleCaptainText={
                    teamMates?.filter(mate => mate.is_captain).length == 1
                      ? 'Назначьте нового капитана, т.к. вы единственный капитан'
                      : ''
                  }
                  onConfirm={handleTeamLeave}
                >
                  <Button variant='destructive'>Покинуть команду</Button>
                </ConfirmModal>
              )}
            </div>
          </div>
        </Toolbar>
        {!hasTeam && !isTeamLoading && (
          <div className={styles.invitesContainer}>
            <h3>Приглашения</h3>
            <div className={styles.invites}>
              {userInvites.length > 0 ? (
                userInvites.map((team: TeamInfo) => (
                  <TeamInviteCard
                    key={team.name}
                    team={team}
                    onAccept={handleAcceptInvite}
                    onReject={handleDenyInvite}
                  />
                ))
              ) : (
                <span>Нет активных приглашений в команды</span>
              )}
            </div>
          </div>
        )}
        {hasTeam && teamInfo && (
          <div className={styles.teamContents}>
            <h3>Участники команды</h3>
            <div className={styles.membersContainer}>
              <div className={styles.teamMembers}>
                <div className={styles.members}>
                  {isTeamMatesLoading ? (
                    <div className={styles.skeletonContainer}>
                      <UserCardSkeleton />
                      <UserCardSkeleton />
                      <UserCardSkeleton />
                    </div>
                  ) : teamMates && teamMates?.length > 0 ? (
                    teamMates?.map((member: UserPartial) => (
                      <Link
                        key={member.id}
                        href={
                          member.id === user.id
                            ? '/profile'
                            : `/user/${member.id}`
                        }
                        className={styles.link}
                      >
                        <TeamMemberCard member={member} isCaptain={isCaptain} />
                      </Link>
                    ))
                  ) : (
                    <span className={styles.noMates}>
                      В команде нет активных участников
                    </span>
                  )}
                </div>
              </div>
              <TeamSidebar team={teamInfo} teamName={teamInfoName} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
