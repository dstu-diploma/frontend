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
import TeamSingleFieldFormContent from '@/features/team/ui/modals/TeamSingleFieldFormContent'
import styles from './team.module.scss'
import EntityLoading from '@/shared/ui/custom/EntityLoading'

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

  const { role, handleMateRoleChange, handleMateRoleSave } = useSetRoleModal({
    refreshTeamMates,
    teamRole,
  })

  const { teamName, handleTeamRename, handleTeamNameChange } = useRenameModal({
    teamInfoName,
    refreshTeamName,
  })

  const { newTeamName, handleTeamCreateChange, handleTeamCreate } =
    useCreateModal({ refreshTeamInfo })

  const { mateEmail, handleTeamInviteChange, handleTeamInvite } =
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
                    labelText='Название команды'
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
                    value={teamName}
                    onChange={handleTeamNameChange}
                    placeholder='Введите название новой команды'
                    fieldType='text'
                    labelText='Название команды'
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
              {hasTeam && isCaptain && (
                <ConfirmModal
                  title='Вы действительно хотите снять с себя права капитана?'
                  submitButtonText='Снять права'
                  isSingleCaptainText={
                    teamMates?.length != 1 &&
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
                    teamMates?.length != 1 &&
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
                    <EntityLoading />
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
