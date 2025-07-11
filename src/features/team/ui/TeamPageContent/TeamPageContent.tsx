'use client'

import React from 'react'
import { TeamSidebar } from '../sidebar/TeamSidebar'
import TeamToolbar from '../teamPage/TeamToolbar/TeamToolbar'
import TeamInvitesList from '../teamPage/TeamInvitesList/TeamInvitesList'
import TeamMembersList from '../teamPage/TeamMembersList/TeamMembersList'
import { UserPartial } from '@/features/user/model/types'
import { useTeam } from '@/features/team/hooks/brandTeam/useTeam'
import { useHackathonTeam } from '@/features/team/hooks/hackathonTeam/useHackathonTeam'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import styles from './TeamPageContent.module.scss'
import HackathonTeamToolbar from '../hackathonPage/HackathonTeamToolbar/HackathonTeamToolbar'
import HackathonTeamMembersList from '../hackathonPage/HackathonTeamMembersList/HackathonTeamMembersList'
import HackathonTeamSubmissionSidebar from '../hackathonPage/HackathonTeamSubmissionSidebar'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { TeamInfo } from '@/features/team/model/types'
import { useAdminSingleBrandTeam } from '@/features/admin/hooks/tabs/brandTeams/useAdminSingleBrandTeam'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'

interface TeamPageContentProps {
  user: UserPartial
  path: string
}

interface BrandTeamContentProps {
  user: UserPartial
  teamInfo?: TeamInfo
  isAdmin?: boolean
}

export const BrandTeamContent = ({
  user,
  teamInfo: providedTeamInfo,
  isAdmin = false,
}: BrandTeamContentProps) => {
  const {
    isCaptain,
    isTeamLoading,
    isTeamMatesLoading,
    hasTeam,
    teamName,
    teamMates: fetchedTeamMates,
    teamInfo: fetchedTeamInfo,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
  } = useTeam()

  // Выбираем, какие у нас данные: либо страница моей команды, либо админка
  const teamInfo = providedTeamInfo ?? fetchedTeamInfo
  const hasTeamInfo = Boolean(providedTeamInfo) || hasTeam
  const teamMates = providedTeamInfo?.mates ?? fetchedTeamMates

  const {
    currentBrandTeamName,
    setNewBrandTeamName,
    currentNewCaptain,
    setCurrentNewCaptain,
    handleDeleteTeam,
    handleBrandTeamRename,
    handleBrandTeamNameChange,
    handleNewCaptainChange,
    handleChangeCaptainRights,
  } = useAdminSingleBrandTeam(teamInfo)

  const toolbarSettings = {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamName: teamInfo?.name ?? '',
    teamMates: teamMates ?? [],
    handleTeamLeave: (event: React.FormEvent) => {
      console.log('Toolbar - handleTeamLeave called')
      return handleTeamLeave(event)
    },
    handleChangeCaptain,
  }

  const adminSettings =
    isAdmin && teamInfo
      ? {
          currentBrandTeamName,
          setNewBrandTeamName,
          currentNewCaptain,
          setCurrentNewCaptain,
          handleDeleteTeam,
          handleBrandTeamRename,
          handleBrandTeamNameChange,
          handleTeamNameChange: handleBrandTeamNameChange,
          handleNewCaptainChange,
          handleChangeCaptainRights,
        }
      : undefined

  const membersListSettings = {
    isTeamMatesLoading: providedTeamInfo ? false : isTeamMatesLoading,
    teamMates: teamMates ?? [],
    isCaptain,
    handleTeamKick,
    handleChangeCaptain,
  }

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const teamStyles = clsx(styles.teamContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  if (isTeamLoading && !providedTeamInfo) {
    return <LayoutFallback text='Загрузка данных о команде...' />
  }

  return (
    <div className={teamStyles}>
      {!providedTeamInfo && (
        <h1
          className={clsx(styles.teamTitle, {
            [styles.smallTitle]: providedTeamInfo,
          })}
        >
          {providedTeamInfo
            ? `Команда «${providedTeamInfo.name}»`
            : 'Моя команда-бренд'}
        </h1>
      )}
      <div className={styles.teamContent}>
        <TeamToolbar
          user={user}
          settings={toolbarSettings}
          isAdmin={isAdmin}
          adminSettings={adminSettings}
        />
        {!hasTeamInfo && !isTeamLoading && <TeamInvitesList />}
        {hasTeamInfo && teamInfo && (
          <div className={styles.teamContents}>
            <div className={clsx(styles.membersContainer, styles.mobileBrand)}>
              <TeamSidebar team={teamInfo} teamName={teamInfo.name ?? ''} />
              <TeamMembersList
                className={styles.mobileTeamMembers}
                user={user}
                settings={membersListSettings}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const HackathonTeamContent = ({
  user,
  path,
}: {
  user: UserPartial
  path: string
}) => {
  const pageId = Number(path.split('/')[2])

  const {
    hackathonInfo,
    isHackathonLoading,
    isCaptain,
    isTeamLoading,
    hasTeam,
    teamName,
    teamMates,
    teamInfo,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
  } = useHackathonTeam(pageId)

  const toolbarSettings = {
    hasTeam,
    isCaptain,
    isTeamLoading,
    teamName: teamName ?? '',
    teamMates: teamMates ?? [],
    handleTeamLeave: (event: React.FormEvent) => {
      console.log('Toolbar - handleTeamLeave called')
      return handleTeamLeave(event)
    },
    handleChangeCaptain,
  }

  const membersListSettings = {
    isTeamMatesLoading: false,
    teamMates: teamMates ?? [],
    isCaptain,
    handleTeamKick,
    handleChangeCaptain,
  }

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const teamStyles = clsx(styles.teamContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  if (isTeamLoading || isHackathonLoading) {
    return <LayoutFallback text='Загрузка данных о команде...' />
  }

  return (
    <>
      {teamInfo ? (
        <div className={teamStyles}>
          <h1 className={styles.teamTitle}>Команда «{teamInfo?.name}»</h1>
          <div className={styles.teamContent}>
            <HackathonTeamToolbar
              hackathonInfo={hackathonInfo}
              user={user}
              settings={toolbarSettings}
            />
            {!hasTeam && !isTeamLoading && <TeamInvitesList />}
            {hasTeam && teamInfo && (
              <div className={styles.teamContents}>
                <div className={styles.membersContainer}>
                  <div className={styles.hackathonTeamSidebars}>
                    <TeamSidebar team={teamInfo} teamName={teamName ?? ''} />
                    <HackathonTeamSubmissionSidebar
                      hackathonInfo={hackathonInfo}
                      submission={teamInfo?.submission}
                    />
                  </div>
                  <div className={styles.members}>
                    <HackathonTeamMembersList
                      user={user}
                      className={styles.teamMates}
                      settings={membersListSettings}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Toolbar className={styles.noTeamToolbar}>
          Вы не записывали свою команду-бренд на данный хакатон
        </Toolbar>
      )}
    </>
  )
}

const TeamPageContent = ({ user, path }: TeamPageContentProps) => {
  const teamType = path.endsWith('/team') ? 'brand' : 'hackathon'

  return teamType === 'brand' ? (
    <BrandTeamContent user={user} />
  ) : (
    <HackathonTeamContent user={user} path={path} />
  )
}

export default TeamPageContent
