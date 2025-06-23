import { Input } from '@/shared/ui/shadcn/input'
import React, { useState } from 'react'
import styles from './RequestListSearch.module.scss'

interface RequestListSearchProps {
  onSearch: (value: string) => void
}

const RequestListSearch: React.FC<RequestListSearchProps> = ({ onSearch }) => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    onSearch(value)
  }

  return (
    <div className={styles.requestsSearchInputWrapper}>
       <Input
        type='text'
        placeholder='Поиск...'
        value={searchInputValue}
        onChange={handleSearch}
        className={styles.adminTabFilterInput}
      />
    </div>
  )
}

export default RequestListSearch 