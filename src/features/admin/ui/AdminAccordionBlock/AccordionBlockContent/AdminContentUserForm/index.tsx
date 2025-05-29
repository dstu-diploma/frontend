import React from 'react'
import { formatDate } from '@/shared/lib/helpers/date'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { Textarea } from '@/shared/ui/shadcn/textarea'
import { User } from '@/features/user'
import { type AdminUserFormData } from '@/features/admin/model/schemas'
import styles from './AdminContentUserForm.module.scss'
import { useAdminSingleUser } from '@/features/admin/hooks/tabs/users/useAdminSingleUser'

interface AdminContentUserFormProps {
  entity: User
  onSubmit: (data: AdminUserFormData) => void
}

const AdminContentUserForm = ({ entity }: AdminContentUserFormProps) => {
  const {
    handleSubmit,
    submitHandler,
    register,
    handleBanUser,
    handleDeleteUser,
    errors,
    isSubmitting,
  } = useAdminSingleUser(entity)

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={styles.accordionBlockForm}
    >
      <div className={styles.accordionBlockFormСontainer}>
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
                  value={formatDate(entity.register_date)}
                  className={styles.accordionBlockFormInput}
                />
              </div>
              <div className={styles.accordionBlockFormItem}>
                <label htmlFor='role' className={styles.formItemLabel}>
                  Роль
                </label>
                <Input
                  id='role'
                  {...register('role')}
                  className={styles.accordionBlockFormInput}
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
                  {...register('birthday')}
                  className={styles.accordionBlockFormInput}
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
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
          {entity.role !== 'admin' && (
            <>
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
            </>
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
