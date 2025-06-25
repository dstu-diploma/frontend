'use client'

import React from 'react'
import { Accordion } from '@/shared/ui/shadcn/accordion'
import { type User } from '@/features/user'
import UserCardSkeleton from '@/shared/ui/custom/skeletons/UserCardSkeleton'
import AdminTabFilter from '../AdminTabFilter'
import { TeamInfo } from '@/features/team/model/types'
import { useAdminTabSearch } from '../../hooks/useAdminTabSearch'
import styles from './AdminTab.module.scss'
import AdminAccordionBlock from '../AdminAccordionBlock'
import { useAdminUsers } from '../../hooks/tabs/users/useAdminUsers'
import { useAdminBrandTeams } from '../../hooks/tabs/brandTeams/useAdminBrandTeams'
import { useAdminHackathonTeams } from '../../hooks/tabs/hackathonTeams/useAdminHackathonTeams'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

export type AdminTabType = 'users' | 'brandTeams'
type AdminEntityType = User | TeamInfo
type FilterType = 'role' | 'status' | 'team'

interface AdminTabProps {
  tab: AdminTabType
}

const AdminTab: React.FC<AdminTabProps> = ({ tab }) => {
  const { users, isUsersLoading } = useAdminUsers()
  const { brandTeams, isBrandTeamsLoading } = useAdminBrandTeams()
  const { hackathonTeams } = useAdminHackathonTeams()
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()

  const {
    searchedUsers,
    searchedBrandTeams,
    searchTerms,
    filterValues,
    updateSearchTerm,
    updateUserFilters,
  } = useAdminTabSearch({ users, brandTeams, hackathonTeams })

  const adminTabManagementTabStyles = clsx(styles.adminTabManagementTab, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  const getTabData = () => {
    switch (tab) {
      case 'users':
        return {
          items: searchedUsers,
          isLoading: isUsersLoading,
          searchTerm: searchTerms.users,
          filterValue: filterValues.users,
          filterType: 'role' as FilterType,
          isFilterActive: filterValues.users && filterValues.users !== 'all',
        }
      case 'brandTeams':
        return {
          items: searchedBrandTeams,
          isLoading: isBrandTeamsLoading,
          searchTerm: searchTerms.brandTeams,
          filterValue: filterValues.brandTeams,
          filterType: 'team' as FilterType,
          isFilterActive:
            filterValues.brandTeams && filterValues.brandTeams !== 'all',
        }
      default:
        return {
          items: [],
          isLoading: false,
          searchTerm: '',
          filterValue: '',
          filterType: 'role' as FilterType,
          isFilterActive: false,
        }
    }
  }

  const {
    items,
    isLoading,
    searchTerm,
    filterValue,
    filterType,
    isFilterActive,
  } = getTabData()

  const handleSearchTermChange = (term: string) => {
    updateSearchTerm(tab, term)
  }

  const handleFiltersChange = (filters: { role: string; status: string }) => {
    if (tab === 'users') {
      updateUserFilters(filters)
    }
  }

  const filteredItems =
    items?.filter(item => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if ('name' in item) {
          if (!item.name.toLowerCase().includes(searchLower)) {
            return false
          }
        } else if ('first_name' in item && 'last_name' in item) {
          const fullName = `${item.first_name} ${item.last_name}`.toLowerCase()
          if (!fullName.includes(searchLower)) {
            return false
          }
        } else {
          return false
        }
      }

      if (!isFilterActive) return true

      switch (filterType) {
        case 'role':
          return 'role' in item && item.role === filterValue
        case 'status':
          return 'is_banned' in item
            ? (filterValue === 'active' && !item.is_banned) ||
                (filterValue === 'blocked' && item.is_banned)
            : 'status' in item && item.status === filterValue
        case 'team':
          return 'type' in item && item.type === filterValue
        default:
          return true
      }
    }) ?? []

  return (
    <div className={adminTabManagementTabStyles}>
      <AdminTabFilter
        tab={tab}
        searchInputValue={searchTerm}
        setSearchInputValue={handleSearchTermChange}
        onFiltersChange={handleFiltersChange}
      />
      <Accordion type='single' collapsible className={styles.adminTabAccordion}>
        {isLoading ? (
          <div className={styles.skeletonContainer}>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={styles.adminTabContainer}>
            {filteredItems.map((item: AdminEntityType) => (
              <AdminAccordionBlock
                key={item.id}
                entity={item}
                className={styles.adminTabBlock}
                valueKey={item.id.toString()}
              />
            ))}
          </div>
        ) : (
          <span>Не найдено результатов</span>
        )}
      </Accordion>
    </div>
  )
}

export default AdminTab
