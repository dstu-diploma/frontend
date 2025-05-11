import React from 'react'
import styles from './TeamSingleFieldFormContent.module.scss'
import { Label } from '@/shared/ui/shadcn/label'
import { Input } from '@/shared/ui/shadcn/input'

interface TeamSingleFieldFormContentProps {
  fieldName: string
  fieldType: 'text' | 'email'
  labelText?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  redText?: boolean
  placeholder: string
}

const TeamSingleFieldFormContent = (props: TeamSingleFieldFormContentProps) => {
  return (
    <div className={styles.dialogFormContentItem}>
      <Label htmlFor={props.fieldName}>{props.labelText}</Label>
      <Input
        id={props.fieldName}
        type={props.fieldType}
        className={styles.dialogFormInput}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default TeamSingleFieldFormContent
