import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '../../model/schemas'
import { userApi } from '../../api'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useRouter } from 'next/navigation'
import { mapRole } from '@/shared/lib/helpers/roleMapping'
import { useUsername } from '@/providers/UsernameProvider'

export const useProfileForm = () => {
  const router = useRouter()
  const profile = cookiesApi.getUser()
  const { setUsername } = useUsername()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      patronymic: profile?.patronymic || '',
      email: profile?.email || '',
      about: profile?.about || '',
      birthday: profile?.birthday || null,
      role: mapRole(profile?.role) || '',
      registerDate: profile?.register_date || '',
    },
  })

  const { mutate: updateProfile } = userApi.useUpdateProfile()

  const submitHandler = handleSubmit(async data => {
    try {
      updateProfile(data, {
        onSuccess: response => {
          if (response) {
            // Get the current user data from cookies
            const currentUser = cookiesApi.getUser()
            if (currentUser) {
              // Update the user data with the new profile data
              const updatedUser = {
                ...currentUser,
                ...response,
              }
              cookiesApi.setUserCookie(updatedUser)
              // Update username in the provider
              setUsername({
                first_name: response.first_name,
                last_name: response.last_name,
              })
              notificationService.success('Профиль успешно обновлен')
              router.refresh()
            }
          }
        },
        onError: error => {
          notificationService.error(error, 'Ошибка при обновлении профиля')
        },
      })
    } catch (error) {
      notificationService.error(error, 'Ошибка при обновлении профиля')
    }
  })

  return {
    submitHandler,
    register,
    watch,
    setValue,
    errors,
    isSubmitting,
    profile,
  }
}
