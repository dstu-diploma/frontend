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
import { useAdminSingleBrandTeam } from '@/features/admin/hooks/tabs/brandTeams/useAdminSingleBrandTeam'

interface AdminContentBrandTeamFormProps {
  entity: TeamInfo
  onSubmit: (data: AdminTeamFormData) => void
}

const AdminContentBrandTeamForm = ({
  entity,
  onSubmit,
}: AdminContentBrandTeamFormProps) => {
  const { handleDeleteBrandTeam } = useAdminSingleBrandTeam(entity)
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
    <div className={styles.brandTeamContent}>
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
                  <span className={styles.errorText}>
                    {typeof errors.name.message === 'string'
                      ? errors.name.message
                      : 'Ошибка валидации'}
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
          <Button
            variant='destructive'
            disabled={isSubmitting}
            onClick={handleDeleteBrandTeam}
          >
            Удалить команду
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminContentBrandTeamForm
