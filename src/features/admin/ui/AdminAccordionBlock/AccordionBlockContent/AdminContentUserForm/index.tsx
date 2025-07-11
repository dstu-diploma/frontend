import React from 'react'
import {
  dateTimeLocalToIso,
  formatDate,
  isoToDateTimeLocal,
} from '@/shared/lib/helpers/date'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { Textarea } from '@/shared/ui/shadcn/textarea'
import { User } from '@/features/user'
import { type AdminUserFormData } from '@/features/admin/model/schemas'
import { useAdminSingleUser } from '@/features/admin/hooks/tabs/users/useAdminSingleUser'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import TabSelect from '@/features/admin/ui/AdminTabFilter/TabSelect/TabSelect'
import { roleMap } from '@/shared/lib/helpers/roleMapping'
import styles from './AdminContentUserForm.module.scss'

interface AdminContentUserFormProps {
  entity: User
  onSubmit: (data: AdminUserFormData) => void
  hideButtons?: boolean
}

const AdminContentUserForm = ({
  entity,
  hideButtons = false,
}: AdminContentUserFormProps) => {
  const {
    handleSubmit,
    submitHandler,
    register,
    handleBanUser,
    handleDeleteUser,
    errors,
    isSubmitting,
    watch,
    setValue,
  } = useAdminSingleUser(entity)
  const user = cookiesApi.getUser()

  // Мобильные стили
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const accordionBlockFormStyles = clsx(styles.accordionBlockForm, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  const roleOptions = Object.entries(roleMap).map(([key, value]) => ({
    value: key,
    label: value,
  }))

  const roleValue = watch('role') || ''

  return (
    <form
      onSubmit={handleSubmit(submitHandler as any)}
      className={accordionBlockFormStyles}
    >
      <div className={styles.accordionBlockFormContainer}>
        <div className={styles.accordionBlockFormColumns}>
          <div className={styles.accordionBlockFormGroup}>
            <div className={styles.accordionBlockFormRow}>
              <div className={styles.accordionBlockFormItem}>
                <label htmlFor='registerDate' className={styles.formItemLabel}>
                  Дата регистрации
                </label>
                <Input
                  id='registerDate'
                  disabled={true}
                  value={formatDate(entity.register_date || '') || ''}
                  className={styles.accordionBlockFormInput}
                />
              </div>
              <div className={styles.accordionBlockFormItem}>
                <label htmlFor='role' className={styles.formItemLabel}>
                  Роль
                </label>
                <TabSelect
                  selectedValue={roleValue}
                  handleSelect={(value: string) => {
                    if (
                      Object.keys(roleMap).includes(value) &&
                      value !== roleValue
                    ) {
                      setValue('role', value as any, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                  }}
                  placeholder='Выберите роль'
                  options={roleOptions}
                  disabled={entity.id === user?.id}
                  position='popper'
                  side='bottom'
                  sideOffset={4}
                  align='start'
                />
              </div>
            </div>
            <div className={styles.accordionBlockFormRow}>
              <div className={styles.accordionBlockFormItem}>
                <label htmlFor='password' className={styles.formItemLabel}>
                  Новый пароль
                </label>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                  className={styles.accordionBlockFormInput}
                />
              </div>
              <div className={styles.accordionBlockFormItem}>
                <label
                  htmlFor='confirmPassword'
                  className={styles.formItemLabel}
                >
                  Подтвердить пароль
                </label>
                <Input
                  id='confirmPassword'
                  type='password'
                  {...register('confirmPassword')}
                  className={styles.accordionBlockFormInput}
                />
              </div>
            </div>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='about' className={styles.formItemLabel}>
                О себе
              </label>
              <Textarea
                id='about'
                {...register('about')}
                className={styles.accordionBlockFormAbout}
              />
            </div>
          </div>
          <div className={styles.accordionBlockFormGroup}>
            <div className={styles.accordionBlockFormRow}>
              <div className={styles.accordionBlockFormItem}>
                <label htmlFor='email' className={styles.formItemLabel}>
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  {...register('email')}
                  className={styles.accordionBlockFormInput}
                />
              </div>
              <div className={styles.accordionBlockFormItem}>
                <label htmlFor='birthday' className={styles.formItemLabel}>
                  Дата рождения
                </label>
                <Input
                  id='birthday'
                  type='datetime-local'
                  className={styles.accordionBlockFormInput}
                  value={
                    watch('birthday')
                      ? isoToDateTimeLocal(watch('birthday')!) || ''
                      : ''
                  }
                  onChange={e => {
                    const value = e.target.value
                    if (value) {
                      try {
                        const isoValue = dateTimeLocalToIso(value)
                        if (isoValue) {
                          setValue('birthday', isoValue)
                          console.log(
                            'AdminContentUserForm - setValue called with:',
                            isoValue,
                          )
                        }
                      } catch (error) {
                        console.error(
                          'AdminContentUserForm - Invalid date value:',
                          error,
                        )
                      }
                    } else {
                      console.log(
                        'AdminContentUserForm - clearing birthday value',
                      )
                      setValue('birthday', undefined)
                    }
                  }}
                />
              </div>
            </div>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='last_name' className={styles.formItemLabel}>
                Фамилия
              </label>
              <Input
                id='last_name'
                {...register('last_name')}
                className={styles.accordionBlockFormInput}
              />
            </div>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='first_name' className={styles.formItemLabel}>
                Имя
              </label>
              <Input
                id='first_name'
                {...register('first_name')}
                className={styles.accordionBlockFormInput}
              />
            </div>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='patronymic' className={styles.formItemLabel}>
                Отчество
              </label>
              <Input
                id='patronymic'
                {...register('patronymic')}
                className={styles.accordionBlockFormInput}
              />
            </div>
          </div>
        </div>
        <div className={styles.accordionBlockFormButtons}>
          {!hideButtons && (
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          )}
          {!hideButtons && entity.role !== 'admin' && (
            <div className={styles.adminButtons}>
              <Button
                type='button'
                variant='destructive'
                disabled={isSubmitting}
                onClick={handleDeleteUser}
              >
                Удалить
              </Button>
              <Button
                type='button'
                variant={entity.is_banned ? 'default' : 'destructive'}
                disabled={isSubmitting}
                onClick={handleBanUser}
              >
                {entity.is_banned ? 'Разблокировать' : 'Заблокировать'}
              </Button>
            </div>
          )}
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className={styles.accordionBlockFormErrors}>
          {Object.entries(errors).map(([fieldName, error]) => (
            <div key={fieldName} className={styles.errorBlock}>
              <span className={styles.errorText}>{error.message}</span>
            </div>
          ))}
        </div>
      )}
    </form>
  )
}

export default AdminContentUserForm
