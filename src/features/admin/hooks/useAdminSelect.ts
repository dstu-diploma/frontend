import { useState } from 'react'

export type SelectOption = {
  value: string
  label: string
}

export type FilterType = 'role' | 'status' | 'team'

export const useAdminSelect = (filterType: FilterType) => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const getOptions = (): SelectOption[] => {
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
      case 'team':
        return [
          { value: 'all', label: 'Все команды' },
          { value: 'brand', label: 'Команда-бренд' },
          { value: 'hackathon', label: 'Хакатон' },
        ]
      default:
        return []
    }
  }

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
  }

  const getPlaceholder = (): string => {
    switch (filterType) {
      case 'role':
        return 'Сортировка по роли'
      case 'status':
        return 'Сортировка по статусу'
      case 'team':
        return 'Сортировка по типу команды'
      default:
        return 'Выберите значение'
    }
  }

  return {
    selectedValue,
    options: getOptions(),
    placeholder: getPlaceholder(),
    handleSelectChange,
  }
}
