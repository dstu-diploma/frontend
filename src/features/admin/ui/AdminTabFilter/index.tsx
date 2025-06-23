import React from 'react'
import styles from './AdminTabFilter.module.scss'
import { Input } from '@/shared/ui/shadcn/input'
import { useAdminFilters } from '@/features/admin/hooks/useAdminSelect'
import TabSelect from './TabSelect/TabSelect'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { AdminTabType } from '../AdminTab'

interface AdminTabFilterProps {
  tab: AdminTabType
  className?: string
  searchInputValue: string
  setSearchInputValue: (value: string) => void
  onFiltersChange?: (filters: { role: string; status: string }) => void
}

export const AdminTabFilter = ({
  className,
  searchInputValue,
  setSearchInputValue,
  onFiltersChange,
  tab,
}: AdminTabFilterProps) => {
  const {
    filters,
    roleOptions,
    statusOptions,
    handleRoleChange,
    handleStatusChange,
  } = useAdminFilters()

  React.useEffect(() => {
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  const filterSelects = [
    <TabSelect
      key='role'
      selectedValue={filters.role}
      handleSelect={handleRoleChange}
      placeholder='Выберите роль'
      options={roleOptions}
      triggerClassName={styles.adminSelectTrigger}
      position='popper'
      side='bottom'
      sideOffset={4}
      align='start'
    />,
    <TabSelect
      key='status'
      selectedValue={filters.status}
      handleSelect={handleStatusChange}
      placeholder='Выберите статус'
      options={statusOptions}
      triggerClassName={styles.adminSelectTrigger}
      position='popper'
      side='bottom'
      sideOffset={4}
      align='start'
    />,
  ]

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const adminTabFilterStyles = clsx(styles.adminTabFilter, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={`${adminTabFilterStyles} ${className ?? ''}`}>
      <div className={styles.adminTabFilterInputs}>
        <Input
          type='text'
          placeholder='Поиск...'
          value={searchInputValue}
          onChange={e => setSearchInputValue(e.target.value)}
          className={styles.adminTabFilterInput}
        />
        {tab === 'users' && (
          <div className={styles.filterSelects}>{filterSelects}</div>
        )}
      </div>
    </div>
  )
}

export default AdminTabFilter
