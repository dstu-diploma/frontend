'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui/shadcn/button';
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar';
import { UserPartial } from '@/features/user/model/types';
import { cookiesApi } from '@/shared/lib/helpers/cookies';
import {
  TeamMemberCard,
  TeamSidebar,
  TeamActionModal,
  TeamConfirmModal,
  TeamInviteCard,
  useTeam,
  useInvites,
  useRenameModal,
  useCreateModal,
  useInviteModal,
  useSetRoleModal,
  type TeamInfo
} from '@/features/team/'
import styles from './team.module.scss';

export default function TeamsPage() {
  const user = cookiesApi.getUser()

  const {
    isCaptain,
    isTeamLoading,
    hasTeam,
    teamInfo,
    teamMates,
    teamName,
    setTeamName,
    handleTeamLeave,
    refreshTeamInfo
  } = useTeam()

  const {
    userInvites, 
    handleAcceptInvite,
    handleDenyInvite,
  } = useInvites({ refreshTeamInfo })

  const { 
    role, 
    setRole, 
    handleMateRoleChange,
    handleMateRoleSave,
  } = useSetRoleModal({ refreshTeamInfo })

  const { 
    handleTeamRename, 
    handleTeamNameChange 
  } = useRenameModal({ teamName, setTeamName })

  const { 
    setNewTeamName, 
    newTeamName, 
    handleTeamCreateChange, 
    handleTeamCreate 
  } = useCreateModal({ refreshTeamInfo })

  const { 
    mateEmail, 
    setMateEmail, 
    handleTeamInviteChange, 
    handleTeamInvite 
  } = useInviteModal()
  
  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.teamTitle}>Моя команда</h1>
      <div className={styles.teamContent}>
        <Toolbar>
          <div className={styles.toolbarContent}>
            {isTeamLoading && <span>Загрузка данных о команде...</span>}
            {!isTeamLoading && !hasTeam && <span>Вы не состоите в команде</span>}
            <div className={styles.toolbarControls}>
              {!hasTeam && !isTeamLoading && 
                <TeamActionModal 
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
                </TeamActionModal>
              }
              {hasTeam && isCaptain &&
                <TeamActionModal 
                  fieldName='name'
                  title='Название команды'
                  fieldValue={teamName}
                  setFieldValue={setTeamName}
                  fieldPlaceholder='Введите новое название команды'
                  submitButtonText='Изменить название'
                  onChange={handleTeamNameChange}
                  onSave={handleTeamRename}
                >
                  <Button>Изменить название</Button>
                </TeamActionModal>
              }
              {hasTeam &&
                <TeamActionModal 
                  fieldName='name'
                  title='Установление роли'
                  fieldValue={role}
                  setFieldValue={setRole}
                  fieldPlaceholder='Введите Вашу текущую роль в команде'
                  submitButtonText='Установить роль'
                  onChange={handleMateRoleChange}
                  onSave={handleMateRoleSave}
                >
                  <Button>Установить роль</Button>
                </TeamActionModal>
              }
              {hasTeam && 
                <TeamActionModal
                  fieldName='email'
                  title='Пригласить игрока'
                  fieldValue={mateEmail}
                  setFieldValue={setMateEmail}
                  fieldType='email'
                  labelText='Электронная почта'
                  fieldPlaceholder='Введите электронную почту пользователя'
                  submitButtonText='Отправить приглашение'
                  onChange={handleTeamInviteChange}
                  onSave={handleTeamInvite}
                >
                  <Button>Пригласить в команду</Button>
                </TeamActionModal>
              }
              {hasTeam && 
                <TeamConfirmModal
                  title='Вы действительно хотите покинуть команду?'
                  submitButtonText='Покинуть'
                  isCaptainText={teamMates?.length == 1 ? 'Данное действие удалит команду' : ''}
                  onConfirm={handleTeamLeave}
                >
                  <Button variant='destructive'>Покинуть команду</Button>
                </TeamConfirmModal>
              }
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
        {hasTeam && teamInfo &&
         <div className={styles.teamContents}>
            <h3>Участники команды</h3>
            <div className={styles.membersContainer}>
              <div className={styles.teamMembers}>
                <div className={styles.members}>
                  {teamMates && teamMates?.length > 0 ? teamMates?.map((member: UserPartial) => (
                    <Link 
                      key={member.id} 
                      href={member.id === user.id ? '/profile' : `/user/${member.id}`}
                      className={styles.link}
                    >
                      <TeamMemberCard 
                        member={member} 
                        isCaptain={isCaptain}
                      /> 
                    </Link>
                    )) : <span className={styles.noMates}>В команде нет активных участников</span>}
                  </div>
                </div>
              <TeamSidebar
                team={teamInfo}
                teamMates={teamMates}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}