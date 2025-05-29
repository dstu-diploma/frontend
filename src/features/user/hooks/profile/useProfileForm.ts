import { useUsername } from '@/providers/UsernameProvider'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import {
  dateStringToISO,
  ISOStringToDateString,
} from '@/shared/lib/helpers/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ProfileFormData, profileSchema } from '../../model/schemas'
import { mapRole } from '@/shared/lib/helpers/roleMapping'
import { userApi } from '../../api'
import { FullUser } from '../../model/types'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useProfileForm = () => {
  const profile = cookiesApi.getUser()
  const { setUsername } = useUsername()
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  const defaultValues = useMemo(() => {
    if (!profile) {
      return {
        role: '',
        birthday: '',
      }
    }
    return {
      ...profile,
      role: mapRole(profile.role || ''),
      birthday: ISOStringToDateString(profile.birthday || ''),
    }
  }, [profile])

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  const { mutate: updateProfile } = userApi.useUpdateProfile()

  const handleProfileFormSubmit = async (data: ProfileFormData) => {
    updateProfile(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        patronymic: data.patronymic,
        email: data.email,
        about: data.about,
        birthday: dateStringToISO(data.birthday) || '',
      },
      {
        onSuccess: (data: FullUser) => {
          cookiesApi.setUserCookie(data)
        },
        onError: error => {
          console.error('Ошибка при обновлении профиля:', error)
        },
      },
    )
  }

  const submitHandler = handleSubmit(async data => {
    setIsLocalLoading(true)
    try {
      console.log('Submitting form data:', data)
      await handleProfileFormSubmit(data)
      notificationService.success('Данные успешно сохранены!')
      setUsername({
        first_name: data.first_name,
        last_name: data.last_name,
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      notificationService.error(error, `Ошибка при сохранении данных`)
    } finally {
      setIsLocalLoading(false)
    }
  })

  return {
    profile,
    watch,
    setValue,
    isLocalLoading,
    submitHandler,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
