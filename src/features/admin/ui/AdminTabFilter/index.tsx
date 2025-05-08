import React from 'react'
import clsx from 'clsx'
import { Input } from '@/shared/ui/shadcn/input'
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'
import styles from './AdminTabFilter.module.scss'

interface AdminTabFilterProps {
  className?: string
  searchInputValue: string
  setSearchInputValue: (value: string) => void
}

const AdminTabFilter = ({
  className,
  searchInputValue,
  setSearchInputValue,
}: AdminTabFilterProps) => {
  return (
    <div className={clsx(styles.adminTabFilter, className)}>
      <Input
        placeholder='Поиск по списку пользователей'
        className={styles.searchInput}
        value={searchInputValue}
        onChange={e => setSearchInputValue(e.target.value)}
      />
      <Select>
        <SelectTrigger className={styles.selectTrigger}>
          <SelectValue
            placeholder='Сортировка по роли'
            className={styles.selectValue}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='admin'>Администратор</SelectItem>
            <SelectItem value='user'>Участник</SelectItem>
            <SelectItem value='organizer'>Организатор</SelectItem>
            <SelectItem value='helper'>Техническая поддержка</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default AdminTabFilter
