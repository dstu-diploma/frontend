'use client'

import { HackathonTeam } from '@/features/hackathons/model/types'
import { TeamInfo } from '@/features/team/model/types'
import { User } from '@/features/user'
import { useMemo, useState } from 'react'

interface FilterConfig<T> {
  items: T[]
  searchTerm: string
  searchFields: (keyof T)[]
  filterValue?: string
  filterField?: keyof T
}

const filterItems = <T,>({
  items,
  searchTerm,
  searchFields,
  filterValue,
  filterField,
}: FilterConfig<T>) => {
  let filteredItems = items

  // Применяем поисковую фильтрацию
  if (searchTerm.trim()) {
    filteredItems = filteredItems.filter(item =>
      searchFields.some(field => {
        const value = item[field]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase())
        }
        return false
      }),
    )
  }

  // Применяем фильтрацию по селекту
  if (filterValue && filterField) {
    filteredItems = filteredItems.filter(item => {
      const value = item[filterField]
      return value === filterValue
    })
  }

  return filteredItems
}

interface useAdminTabSearchProps {
  users: User[]
  brandTeams: TeamInfo[]
  hackathonTeams: HackathonTeam[]
}

export const useAdminTabSearch = ({
  users,
  brandTeams,
  hackathonTeams,
}: useAdminTabSearchProps) => {
  const [searchTerms, setSearchTerms] = useState({
    users: '',
    brandTeams: '',
    hackathonTeams: '',
  })

  const [filterValues, setFilterValues] = useState({
    users: '',
    brandTeams: '',
    hackathonTeams: '',
  })

  // Обновление поискового запроса
  const updateSearchTerm = (tab: keyof typeof searchTerms, value: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [tab]: value,
    }))
  }

  // Обновление значения фильтра
  const updateFilterValue = (tab: keyof typeof filterValues, value: string) => {
    setFilterValues(prev => ({
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
      filterValue: filterValues.users,
      filterField: 'role',
    })
  }, [users, searchTerms.users, filterValues.users])

  const searchedBrandTeams = useMemo(() => {
    return filterItems({
      items: brandTeams,
      searchTerm: searchTerms.brandTeams,
      searchFields: ['name'],
      filterValue: filterValues.brandTeams,
      filterField: 'type',
    })
  }, [brandTeams, searchTerms.brandTeams, filterValues.brandTeams])

  const searchedHackathonTeams = useMemo(() => {
    return filterItems({
      items: hackathonTeams,
      searchTerm: searchTerms.hackathonTeams,
      searchFields: ['name'],
      filterValue: filterValues.hackathonTeams,
      filterField: 'type',
    })
  }, [hackathonTeams, searchTerms.hackathonTeams, filterValues.hackathonTeams])

  return {
    searchedUsers,
    searchedBrandTeams,
    searchedHackathonTeams,
    searchTerms,
    filterValues,
    updateSearchTerm,
    updateFilterValue,
  }
}
