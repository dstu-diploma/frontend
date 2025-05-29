import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import styles from './AuthFormGroup.module.scss'
import { RegisterFormData } from '@/features/user/model/schemas'

interface AuthFormGroupProps {
  label: string
  fieldKey: keyof RegisterFormData
  fieldType?: string
  placeholder: string
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
}

const AuthFormGroup = ({
  label,
  fieldKey,
  fieldType,
  placeholder,
  register,
  errors,
}: AuthFormGroupProps) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={fieldKey}>{label}</label>
      <input
        type={fieldType || 'text'}
        id={fieldKey}
        placeholder={placeholder}
        {...register(fieldKey)}
        className={errors[fieldKey] ? styles.errorInput : ''}
      />
      {errors[fieldKey] && (
        <span className={styles.errorText}>{errors[fieldKey]?.message}</span>
      )}
    </div>
  )
}

export default AuthFormGroup
