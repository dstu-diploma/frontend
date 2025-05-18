import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CriterionFormData,
  criterionFormSchema,
  JuryFormData,
  juryFormSchema,
  HackathonFormData,
  hackathonFormSchema,
} from '../model/schemas'
import { DetailedHackathon } from '../model/types'

function formatDateForInput(dateString?: string) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16)
}

export const useHackathonForms = (hackathonInfo: DetailedHackathon | null) => {
  const criterionForm = useForm<CriterionFormData>({
    resolver: zodResolver(criterionFormSchema),
    defaultValues: {
      name: '',
      weight: 0,
    },
  })

  const juryForm = useForm<JuryFormData>({
    resolver: zodResolver(juryFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const editForm = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonFormSchema),
    defaultValues: {
      name: hackathonInfo?.name || '',
      max_participant_count: hackathonInfo?.max_participant_count || 0,
      max_team_mates_count: hackathonInfo?.max_team_mates_count || 0,
      description: hackathonInfo?.description || '',
      start_date: formatDateForInput(hackathonInfo?.start_date || ''),
      score_start_date: formatDateForInput(
        hackathonInfo?.score_start_date || '',
      ),
      end_date: formatDateForInput(hackathonInfo?.end_date || ''),
    },
  })

  return {
    criterionForm,
    juryForm,
    editForm,
  }
}
