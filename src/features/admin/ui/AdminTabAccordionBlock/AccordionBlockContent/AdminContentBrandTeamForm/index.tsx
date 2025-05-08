import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import React from 'react'
import styles from './AdminContentBrandTeamForm.module.scss'
import { TeamInfo } from '@/features/team'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  adminTeamFormSchema,
  type AdminTeamFormData,
} from '@/features/admin/model/schemas'

interface AdminContentBrandTeamFormProps {
  entity: TeamInfo
  onSubmit: (data: AdminTeamFormData) => void
}

const AdminContentBrandTeamForm = ({
  entity,
  onSubmit,
}: AdminContentBrandTeamFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminTeamFormData>({
    resolver: zodResolver(adminTeamFormSchema),
    defaultValues: {
      name: entity.name,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.accordionBlockForm}
    >
      <div className={styles.accordionBlockFormColumns}>
        <div className={styles.accordionBlockFormGroup}>
          <div className={styles.accordionBlockFormRow}>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='name' className={styles.formItemLabel}>
                Название команды
              </label>
              <Input
                id='name'
                {...register('name')}
                className={styles.accordionBlockFormInput}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className={styles.accordionBlockFormRow}>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='newPassword' className={styles.formItemLabel}>
                Новый пароль
              </label>
              <Input
                id='newPassword'
                type='password'
                {...register('newPassword')}
                className={styles.accordionBlockFormInput}
              />
              {errors.newPassword && (
                <span className={styles.errorText}>
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div className={styles.accordionBlockFormItem}>
              <label htmlFor='confirmPassword' className={styles.formItemLabel}>
                Подтвердить пароль
              </label>
              <Input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword')}
                className={styles.accordionBlockFormInput}
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.accordionBlockFormButtons}>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
        <Button variant='destructive' disabled={isSubmitting}>
          Удалить команду
        </Button>
      </div>
    </form>
  )
}

export default AdminContentBrandTeamForm
