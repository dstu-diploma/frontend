import { useState, useMemo } from 'react'
import { FilterType } from '../model/types'

// Интерфейс для состояния фильтров
interface FilterState {
  role: string
  status: string
}

export const useAdminSelect = (filterType: FilterType) => {
  const [selectedValue, setSelectedValue] = useState('all')

  const options = useMemo(() => {
    switch (filterType) {
      case 'role':
        return [
          { value: 'all', label: 'Все роли' },
          { value: 'admin', label: 'Администратор' },
          { value: 'user', label: 'Участник' },
          { value: 'organizer', label: 'Организатор' },
          { value: 'helper', label: 'Техническая поддержка' },
          { value: 'judge', label: 'Член жюри' },
        ]
      case 'status':
        return [
          { value: 'all', label: 'Все статусы' },
          { value: 'active', label: 'Активный' },
          { value: 'inactive', label: 'Заблокирован' },
        ]
      default:
        return []
    }
  }, [filterType])

  const placeholder = useMemo(() => {
    switch (filterType) {
      case 'role':
        return 'Выберите роль'
      case 'status':
        return 'Выберите статус'
      default:
        return 'Выберите значение'
    }
  }, [filterType])

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
  }

  const filterUsers = (users: any[]) => {
    if (selectedValue === 'all') return users

    return users.filter(user => {
      if (filterType === 'role') {
        return user.role === selectedValue
      }
      if (filterType === 'status') {
        if (selectedValue === 'active') {
          return user.is_banned === false
        }
        if (selectedValue === 'inactive') {
          return user.is_banned === true
        }
      }
      return true
    })
  }

  return {
    selectedValue,
    options,
    placeholder,
    handleSelectChange,
    filterUsers,
  }
}

export const useAdminFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    role: 'all',
    status: 'all',
  })

  const roleOptions = useMemo(
    () => [
      { value: 'all', label: 'Все роли' },
      { value: 'admin', label: 'Администратор' },
      { value: 'user', label: 'Участник' },
      { value: 'organizer', label: 'Организатор' },
      { value: 'helper', label: 'Техническая поддержка' },
      { value: 'judge', label: 'Член жюри' },
    ],
    [],
  )

  const statusOptions = useMemo(
    () => [
      { value: 'all', label: 'Все статусы' },
      { value: 'active', label: 'Активный' },
      { value: 'inactive', label: 'Заблокирован' },
    ],
    [],
  )

  const handleRoleChange = (value: string) => {
    setFilters(prev => ({ ...prev, role: value }))
  }

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({ ...prev, status: value }))
  }

  const filterUsers = (users: any[]) => {
    return users.filter(user => {
      // Фильтрация по роли
      const roleMatch = filters.role === 'all' || user.role === filters.role

      // Фильтрация по статусу
      let statusMatch = true
      if (filters.status === 'active') {
        statusMatch = user.is_banned === false
      } else if (filters.status === 'inactive') {
        statusMatch = user.is_banned === true
      }

      return roleMatch && statusMatch
    })
  }

  return {
    filters,
    roleOptions,
    statusOptions,
    handleRoleChange,
    handleStatusChange,
    filterUsers,
  }
}
