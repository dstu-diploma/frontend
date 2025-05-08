import React from 'react'
import {
  dateStringToISO,
  formatDate,
  ISOStringToDateString,
} from '@/shared/lib/helpers/date'
import { mapRole, mapRoleKey } from '@/shared/lib/helpers/roleMapping'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { Textarea } from '@/shared/ui/shadcn/textarea'
import { User } from '@/features/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  adminUserFormSchema,
  type AdminUserFormData,
} from '@/features/admin/model/schemas'
import styles from './AdminContentUserForm.module.scss'
import { adminApi } from '@/features/admin/api'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'

interface AdminContentUserFormProps {
  entity: User
  onSubmit: (data: AdminUserFormData) => void
}

const AdminContentUserForm = ({
  entity,
  onSubmit,
}: AdminContentUserFormProps) => {
  const { mutate: updateUser, isPending: isUpdating } =
    adminApi.updateUserInfo()
  const { mutate: deleteUser, isPending: isDeleting } = adminApi.deleteUser()
  const { toast, dismiss } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      first_name: entity.first_name,
      last_name: entity.last_name,
      patronymic: entity.patronymic ?? '',
      email: entity.email,
      about: entity.about ?? '',
      birthday: entity.birthday ? ISOStringToDateString(entity.birthday) : '',
      role: mapRole(entity.role),
      password: '',
      confirmPassword: '',
    },
  })

  const handleDeleteUser = async () => {
    deleteUser(entity.id, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          title: `Пользователь ${entity.first_name} ${entity.last_name} успешно удален`,
        })
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: `Ошибка при удалении пользователя`,
        })
      },
    })
  }

  const submitHandler = (data: AdminUserFormData) => {
    const { confirmPassword, ...restData } = data
    const transformedData = {
      ...restData,
      birthday: data.birthday ? dateStringToISO(data.birthday) : null,
      role: mapRoleKey(data.role),
    }
    console.log(transformedData)
    const requestBody = { user_id: entity.id, data: transformedData }
    updateUser(requestBody, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          title: `Пользователь ${entity.first_name} ${entity.last_name} успешно обновлен`,
        })
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          console.error('Ошибка при обновлении пользователя', errorData.detail)
          toast({
            variant: 'destructive',
            title: `Ошибка при обновлении пользователя`,
            description: errorData.detail,
          })
        }
      },
    })
  }

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
          <Button
            type='button'
            variant='destructive'
            disabled={isSubmitting}
            onClick={handleDeleteUser}
          >
            Удалить пользователя
          </Button>
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
