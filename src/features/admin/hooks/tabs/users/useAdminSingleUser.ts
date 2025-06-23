import { isoToDateTimeLocal, dateStringToISO } from '@/shared/lib/helpers/date'
import { roleMap } from '@/shared/lib/helpers/roleMapping'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { adminApi } from '../../../api'
import { AdminUserFormData, adminUserFormSchema } from '../../../model/schemas'
import { User } from '@/features/user'
import { notificationService } from '@/shared/lib/services/notification.service'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

export const useAdminSingleUser = (entity: User) => {
  const { mutate: updateUser } = adminApi.useUpdateUserInfo()
  const { mutate: deleteUser } = adminApi.useDeleteUser()
  const { mutate: banUser } = adminApi.useBanUser()
  const user = cookiesApi.getUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      first_name: entity.first_name,
      last_name: entity.last_name,
      patronymic: entity.patronymic ?? '',
      email: entity.email,
      about: entity.about ?? '',
      birthday: entity.birthday
        ? isoToDateTimeLocal(entity.birthday) || undefined
        : undefined,
      role: entity.role ?? undefined,
      password: '',
      confirmPassword: '',
    },
  })

  // Блокировка пользователя
  const handleBanUser = async () => {
    const requestBody = { userId: entity.id, is_banned: !entity.is_banned }
    const actionType = !entity.is_banned ? 'заблокирован' : 'разблокирован'
    banUser(requestBody, {
      onSuccess: () => {
        notificationService.success(
          `Пользователь ${entity.first_name} ${entity.last_name} успешно ${actionType}`,
        )
      },
      onError: error => {
        notificationService.error(error, 'Ошибка при блокировке пользователя')
      },
    })
  }

  // Удаление пользователя
  const handleDeleteUser = async () => {
    deleteUser(entity.id, {
      onSuccess: () => {
        notificationService.success(
          `Пользователь ${entity.first_name} ${entity.last_name} успешно удален`,
        )
      },
      onError: error => {
        notificationService.error(error, 'Ошибка при удалении пользователя')
      },
    })
  }

  // Обновление данных о пользователе
  const submitHandler = (data: AdminUserFormData) => {
    console.log('useAdminSingleUser - submitHandler called with data:', data)
    console.log('useAdminSingleUser - birthday value:', data.birthday)
    console.log('useAdminSingleUser - birthday type:', typeof data.birthday)

    const { password, role, ...restData } = data
    const transformedData = {
      ...restData,
      birthday:
        data.birthday && data.birthday !== null ? data.birthday : undefined,
      ...(entity.id !== user?.id ? { role } : {}),
      ...(password && password.trim() !== '' ? { password } : {}),
    } as any

    console.log('useAdminSingleUser - transformedData:', transformedData)
    console.log(
      'useAdminSingleUser - birthday after transformation:',
      transformedData.birthday,
    )

    const requestBody = { userId: entity.id, data: transformedData }
    console.log('useAdminSingleUser - final requestBody:', requestBody)

    updateUser(requestBody, {
      onSuccess: () => {
        notificationService.success(
          `Пользователь ${entity.first_name} ${entity.last_name} успешно обновлен`,
        )
      },
      onError: error => {
        console.log('useAdminSingleUser - updateUser error:', error)
        notificationService.error(error, 'Ошибка при обновлении пользователя')
      },
    })
  }

  return {
    handleSubmit,
    submitHandler,
    register,
    handleBanUser,
    handleDeleteUser,
    errors,
    isSubmitting,
    watch,
    setValue,
  }
}
