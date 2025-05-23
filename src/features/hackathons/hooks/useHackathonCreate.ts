"use client"

import { useCustomToast } from "@/shared/lib/helpers/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { hackathonApi } from "../api"
import { HackathonFormData, hackathonFormSchema } from "../model/schemas"

export const useHackathonCreate = () => {
  const { showToastSuccess, showToastError } = useCustomToast()
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
        showToastSuccess(`Хакатон «${hackathon.name}» успешно создан`)
      },
      onError: error => {
        showToastError(error, `Ошибка при создании хакатона`)
      },
    })
  }

  return {
    createForm,
    hackathonCreationHandler,
  }
}