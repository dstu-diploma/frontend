import { TeamInfo } from '@/features/team/model/types'
import { User } from '@/features/user'
import { useMemo, useState } from 'react'

interface FilterConfig<T> {
  items: T[]
  searchTerm: string
  searchFields: (keyof T)[]
}

const filterItems = <T,>({
  items,
  searchTerm,
  searchFields,
}: FilterConfig<T>) => {
  if (!searchTerm.trim()) return items

  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    }),
  )
}

interface useAdminTabSearchProps {
  users: User[]
  teams: TeamInfo[]
}

export const useAdminTabSearch = ({ users, teams }: useAdminTabSearchProps) => {
  const [searchTerms, setSearchTerms] = useState({
    users: '',
    brandTeams: '',
    hackathonTeams: '',
    hackathons: '',
  })

  // Обновление поискового запроса
  const updateSearchTerm = (tab: keyof typeof searchTerms, value: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [tab]: value,
    }))
  }

  // Поисковая фильтрация всех сущностей
  const searchedUsers = useMemo(() => {
    return filterItems({
      items: users,
      searchTerm: searchTerms.users,
      searchFields: ['first_name', 'last_name', 'email'],
    })
  }, [users, searchTerms.users])

  const searchedTeams = useMemo(() => {
    return filterItems({
      items: teams,
      searchTerm: searchTerms.brandTeams,
      searchFields: ['name'],
    })
  }, [teams, searchTerms.brandTeams])

  return { searchedUsers, searchedTeams, searchTerms, updateSearchTerm }
}
