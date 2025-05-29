import React from 'react'
import styles from './TabSelect.module.scss'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
} from '@radix-ui/react-select'
import { SelectOption } from '@/features/admin/hooks/useAdminSelect'

interface TabSelectProps {
  selectedValue: string
  handleSelect: (value: string) => void
  placeholder: string
  options: SelectOption[]
}

const TabSelect = (props: TabSelectProps) => {
  const selectedOption = props.options.find(
    option => option.value === props.selectedValue,
  )

  return (
    <Select value={props.selectedValue} onValueChange={props.handleSelect}>
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue
          placeholder={props.placeholder}
          className={styles.selectValue}
        >
          Роль:&nbsp;{selectedOption?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          className={styles.selectContent}
          position='popper'
          sideOffset={4}
          align='start'
        >
          <SelectGroup className={styles.selectGroup}>
            {props.options.map(option => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={styles.selectItem}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

export default TabSelect
