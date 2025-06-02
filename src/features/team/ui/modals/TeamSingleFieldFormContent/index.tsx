import React from 'react'
import styles from './TeamSingleFieldFormContent.module.scss'
import { Label } from '@/shared/ui/shadcn/label'
import { Input } from '@/shared/ui/shadcn/input'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

interface TeamSingleFieldFormContentProps {
  fieldName: string
  fieldType: 'text' | 'email'
  labelText?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | undefined
  redText?: boolean
  placeholder: string
}

const TeamSingleFieldFormContent = (props: TeamSingleFieldFormContentProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const teamSingleFieldFormContentStyles = clsx(styles.dialogFormContentItem, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={teamSingleFieldFormContentStyles}>
      <Label htmlFor={props.fieldName}>{props.labelText}</Label>
      <Input
        id={props.fieldName}
        type={props.fieldType}
        className={styles.dialogFormInput}
        value={props.value || ''}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default TeamSingleFieldFormContent
