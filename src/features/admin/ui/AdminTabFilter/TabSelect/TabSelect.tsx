import React, { useEffect, useState } from 'react'
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
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { IoMdArrowDropdown } from "react-icons/io";

interface SelectOption {
  value: string
  label: string
}

interface TabSelectProps {
  selectedValue: string
  handleSelect: (value: string) => void
  placeholder: string
  options: SelectOption[]
  disabled?: boolean
}

const TabSelect = (props: TabSelectProps) => {
  const [currentValue, setCurrentValue] = useState(props.selectedValue)
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const selectTriggerStyles = clsx(styles.selectTrigger, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
    [styles.disabled]: props.disabled,
  })

  useEffect(() => {
    if (props.selectedValue) {
      setCurrentValue(props.selectedValue)
    }
  }, [props.selectedValue])

  const selectedOption = props.options.find(opt => opt.value === currentValue)
  
  const handleValueChange = (value: string) => {
    if (props.disabled) return
    setCurrentValue(value)
    props.handleSelect(value)
  }

  return (
    <Select
      value={currentValue}
      onValueChange={handleValueChange}
      disabled={props.disabled}
    >
      <SelectTrigger className={selectTriggerStyles}>
        <SelectValue className={styles.selectValue}>
          <span>{selectedOption?.label || props.placeholder}</span>
          <IoMdArrowDropdown />
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
                disabled={props.disabled}
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
