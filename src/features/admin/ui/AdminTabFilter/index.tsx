import React from 'react'
import styles from './AdminTabFilter.module.scss'
import { Input } from '@/shared/ui/shadcn/input'
import { useAdminSelect } from '@/features/admin/hooks/useAdminSelect'
import { FilterType } from '@/features/admin/hooks/useAdminSelect'
import TabSelect from './TabSelect/TabSelect'

interface AdminTabFilterProps {
  className?: string
  searchInputValue: string
  setSearchInputValue: (value: string) => void
  filterTypes: FilterType[]
  onFilterChange: (type: FilterType, value: string) => void
}

export const AdminTabFilter = ({
  className,
  searchInputValue,
  setSearchInputValue,
  filterTypes,
  onFilterChange,
}: AdminTabFilterProps) => {
  const filterStates = filterTypes.map(type => useAdminSelect(type))

  const filterSelects = filterStates.map(
    ({ selectedValue, options, placeholder, handleSelectChange }, index) => {
      const type = filterTypes[index]
      return (
        <TabSelect
          key={type}
          selectedValue={selectedValue}
          handleSelect={handleSelectChange}
          placeholder={placeholder}
          options={options}
        />
      )
    },
  )

  return (
    <div className={`${styles.adminTabFilter} ${className ?? ''}`}>
      <div className={styles.adminTabFilterInputs}>
        <Input
          type='text'
          placeholder='Поиск...'
          value={searchInputValue}
          onChange={e => setSearchInputValue(e.target.value)}
          className={styles.adminTabFilterInput}
        />
        {filterSelects}
      </div>
    </div>
  )
}

export default AdminTabFilter
