import React from 'react'
import styles from './TabSelect.module.scss'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@radix-ui/react-select'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { IoMdArrowDropdown } from 'react-icons/io'

interface SelectOption {
  value: string
  label: string
}

interface TabSelectProps {
  selectedValue: string | undefined
  handleSelect: (value: string) => void
  placeholder: string
  options: SelectOption[]
  disabled?: boolean
  position?: 'popper' | 'item-aligned'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  triggerClassName?: string
}

const TabSelect = (props: TabSelectProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const selectTriggerStyles = clsx(
    styles.selectTrigger,
    props.triggerClassName,
    {
      [styles.mobile]: isMobile,
      [styles.tablet]: isTablet,
      [styles.desktop]: isDesktop,
      [styles.mediumDesktop]: isMediumDesktop,
      [styles.disabled]: props.disabled,
    },
  )

  const selectedOption = props.options.find(
    opt => opt.value === props.selectedValue,
  )

  const handleValueChange = (value: string) => {
    if (props.disabled) return
    if (value !== props.selectedValue) {
      props.handleSelect(value)
    }
  }

  return (
    <Select
      value={props.selectedValue || ''}
      onValueChange={handleValueChange}
      disabled={props.disabled}
    >
      <SelectTrigger className={selectTriggerStyles}>
        <SelectValue
          className={styles.selectValue}
          placeholder={props.placeholder}
        >
          {selectedOption?.label}
        </SelectValue>
        <IoMdArrowDropdown />
      </SelectTrigger>
      <SelectContent
        className={styles.selectContent}
        position={props.position || 'item-aligned'}
        sideOffset={props.sideOffset || 8}
        align={props.align || 'start'}
        side={props.side || 'bottom'}
      >
        <SelectGroup className={styles.selectGroup}>
          {props.options.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={styles.selectItem}
              disabled={props.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TabSelect
