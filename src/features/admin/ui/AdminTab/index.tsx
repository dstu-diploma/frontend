import React from 'react'
import { Accordion } from '@/shared/ui/shadcn/accordion'
import { useAdmin } from '@/features/admin/hooks/useAdmin'
import { type User } from '@/features/user'
import UserCardSkeleton from '@/shared/ui/custom/UserCardSkeleton'
import AdminAccordionBlock from '../AdminTabAccordionBlock'
import AdminTabFilter from '../AdminTabFilter'
import { TeamInfo } from '@/features/team/model/types'
import { useAdminTabSearch } from '../../hooks/useAdminTabSearch'
import styles from './AdminTab.module.scss'

type AdminTabType = 'users' | 'brandTeams' | 'hackathonTeams' | 'hackathons'
type AdminEntityType = User | TeamInfo

interface AdminTabProps {
  tab: AdminTabType
}

const AdminTab: React.FC<AdminTabProps> = ({ tab }) => {
  const { users, isUsersLoading, isTeamsLoading, teams } = useAdmin()

  const { searchedUsers, searchedTeams, searchTerms, updateSearchTerm } =
    useAdminTabSearch({ users, teams })

  const getTabData = () => {
    switch (tab) {
      case 'users':
        return {
          items: searchedUsers,
          isLoading: isUsersLoading,
          searchTerm: searchTerms.users,
        }
      case 'brandTeams':
        return {
          items: searchedTeams,
          isLoading: isTeamsLoading,
          searchTerm: searchTerms.brandTeams,
        }
      case 'hackathons':
        return {
          items: [],
          isLoading: false,
          searchTerm: searchTerms.hackathons,
        }
      default:
        return {
          items: [],
          isLoading: false,
          searchTerm: '',
        }
    }
  }

  const { items, isLoading, searchTerm } = getTabData()

  const handleSearchTermChange = (term: string) => {
    updateSearchTerm(tab, term)
  }

  return (
    <div className={styles.adminTabManagementTab}>
      <AdminTabFilter
        searchInputValue={searchTerm}
        setSearchInputValue={handleSearchTermChange}
      />
      <Accordion type='single' collapsible className={styles.adminTabAccordion}>
        {isLoading && (
          <div className={styles.skeletonContainer}>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        )}
        {!isLoading && items.length > 0 && (
          <div className={styles.adminTabContainer}>
            {items.map((item: AdminEntityType) => (
              <AdminAccordionBlock
                key={item.id}
                entity={item}
                className={styles.adminTabBlock}
                valueKey={item.id.toString()}
              />
            ))}
          </div>
        )}
      </Accordion>
    </div>
  )
}

export default AdminTab
