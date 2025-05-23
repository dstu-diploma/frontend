import { useUsername } from '@/providers/UsernameContext'
import { useToast } from '@/shared/hooks/use-toast'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ProfileFormData, profileSchema } from '../../model/schemas'
import { mapRole } from '@/shared/lib/helpers/roleMapping'

interface useProfileFormProps {
  onSubmit: (data: ProfileFormData) => void
}

export const useProfileForm = ({ onSubmit }: useProfileFormProps) => {
  const profile = cookiesApi.getUser()
  const { toast, dismiss } = useToast()
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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  const submitHandler = handleSubmit(async data => {
    setIsLocalLoading(true)
    dismiss()
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      await onSubmit(data)
      toast({
        variant: 'defaultBlueSuccess',
        description: 'Данные успешно сохранены!',
      })
      setUsername({
        first_name: data.first_name,
        last_name: data.last_name,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Ошибка при сохранении',
      })
    } finally {
      setIsLocalLoading(false)
    }
  })

  return {
    profile,
    isLocalLoading,
    submitHandler,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
