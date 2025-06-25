import React from 'react'
import { TeamInfo } from '@/features/team/model/types'
import { User } from '@/features/user'
import AdminContentUserForm from './AdminContentUserForm'
import AdminContentBrandTeamForm from './AdminContentBrandTeamForm'
import { isTeam, isUser } from '@/features/admin/model/guards'
import {
  AdminUserFormData,
  AdminTeamFormData,
} from '@/features/admin/model/schemas'
import styles from './AccordionBlockContent.module.scss'
import MediaQuery from 'react-responsive'
import { ActionModal } from '@/shared/ui/custom/modals/ActionModal'
import { Button } from '@/shared/ui/shadcn/button'
import { useAdminSingleUser } from '@/features/admin/hooks/tabs/users/useAdminSingleUser'
import { FieldErrors } from 'react-hook-form'

interface AccordionBlockContentProps {
  entity: User | TeamInfo | undefined
}

// Компонент для мобильной формы пользователя
const MobileUserForm = ({
  entity,
  onSubmit,
}: {
  entity: User
  onSubmit: (data: AdminUserFormData) => Promise<void>
}) => {
  const {
    handleSubmit,
    submitHandler,
    isSubmitting,
    handleBanUser,
    handleDeleteUser,
  } = useAdminSingleUser(entity)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Используем handleSubmit из хука для валидации и получения данных
    const result = await new Promise<boolean>(resolve => {
      handleSubmit(
        (data: AdminUserFormData) => {
          // Вызываем оригинальный submitHandler
          submitHandler(data)
          // Вызываем переданный onSubmit
          onSubmit(data)
          resolve(true) // Закрыть модалку при успехе
        },
        (errors: FieldErrors<AdminUserFormData>) => {
          console.error('Form validation errors:', errors)
          resolve(false) // Не закрывать модалку при ошибках валидации
        },
      )(e)
    })

    return result
  }

  return (
    <ActionModal
      title='Редактирование пользователя'
      submitButtonText='Сохранить изменения'
      onSave={handleFormSubmit}
      isSubmitting={isSubmitting}
      contentClassName={`${styles.mobileFormContainer} ${styles.mobile}`}
      trigger={
        <Button style={{ width: '100%' }}>Редактировать пользователя</Button>
      }
      footerActions={
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            width: '100%',
          }}
        >
          <Button
            type='submit'
            variant='default'
            disabled={isSubmitting}
            style={{ flex: 1 }}
          >
            {isSubmitting ? 'Отправка...' : 'Сохранить изменения'}
          </Button>
          {entity.role !== 'admin' && (
            <>
              <Button
                type='button'
                variant='destructive'
                disabled={isSubmitting}
                onClick={handleDeleteUser}
                style={{ flex: 1 }}
              >
                Удалить пользователя
              </Button>
              <Button
                type='button'
                variant={entity.is_banned ? 'default' : 'destructive'}
                disabled={isSubmitting}
                onClick={handleBanUser}
                style={{ flex: 1 }}
              >
                {entity.is_banned ? 'Разблокировать' : 'Заблокировать'}
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className={styles.mobileFormContent}>
        <AdminContentUserForm
          entity={entity}
          onSubmit={onSubmit}
          hideButtons={true}
        />
      </div>
    </ActionModal>
  )
}

export const AccordionBlockContent = ({
  entity,
}: AccordionBlockContentProps) => {
  const editUserSubmit = async (data: AdminUserFormData) => {
    console.log(data)
  }

  const editBrandTeamSubmit = async (data: AdminTeamFormData) => {
    // TODO: edit brand team
  }

  return (
    <div className={styles.accordionBlockContent}>
      {isUser(entity) && (
        <>
          {/* Десктопная версия */}
          <MediaQuery minWidth={1024}>
            <AdminContentUserForm
              entity={entity as User}
              onSubmit={editUserSubmit}
            />
          </MediaQuery>

          {/* Мобильная версия с модальным окном */}
          <MediaQuery maxWidth={767}>
            <MobileUserForm entity={entity as User} onSubmit={editUserSubmit} />
          </MediaQuery>
        </>
      )}
      {isTeam(entity) && (
        <AdminContentBrandTeamForm
          entity={entity as TeamInfo}
          onSubmit={editBrandTeamSubmit}
        />
      )}
    </div>
  )
}
