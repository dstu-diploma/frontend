import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { hackathonApi } from '../api'
import { HackathonFormData, hackathonFormSchema } from '../model/schemas'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useHackathonCreate = () => {
  const { mutate: createHackathon } = hackathonApi.useCreateHackathon()

  const createForm = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonFormSchema),
    defaultValues: {
      name: '',
      max_participant_count: 0,
      max_team_mates_count: 0,
      description: '',
      start_date: '',
      score_start_date: '',
      end_date: '',
    },
  })

  const hackathonCreationHandler = (data: HackathonFormData) => {
    createHackathon(data, {
      onSuccess: async hackathon => {
        notificationService.success(
          `Хакатон «${hackathon.name}» успешно создан`,
        )
      },
      onError: error => {
        notificationService.error(error, `Ошибка при создании хакатона`)
      },
    })
  }

  return {
    createForm,
    hackathonCreationHandler,
  }
}
