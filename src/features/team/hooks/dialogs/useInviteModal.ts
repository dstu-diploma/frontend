import { useToast } from "@/shared/hooks/use-toast";
import { teamApi } from "../../api/teamApi";
import { useState } from "react";
import { userApi } from "@/features/user";
import { UserByEmail } from "@/features/user/model/types";
import { AxiosError } from "axios";

export const useInviteModal = () => {
  const [mateEmail, setMateEmail] = useState('')
  const { mutate: searchByEmail } = userApi.searchByEmail()
  const { mutate: sendInvite } = teamApi.sendInvite()
  const { toast, dismiss } = useToast()

  const handleTeamInviteChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMateEmail(newValue)
  }

  const sendInvintation = async (user_id: number, first_name: string, last_name: string) => {
    sendInvite(user_id, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Заявка отправлена пользователю ${first_name} ${last_name}`
        })
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string };
          console.error('Ошибка отправки приглашения: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка отправки приглашения',
            description: data.detail
          })
        }     
      }
    })
  }
  
  const handleTeamInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    searchByEmail(mateEmail, {
      onSuccess: (data: UserByEmail) => {
        sendInvintation(data.id, data.first_name, data.last_name)
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при поиске участника'
        })
        console.error('Ошибка при поиске участника: ', error)
      }
    })
  }

  return {
    mateEmail,
    setMateEmail,
    handleTeamInviteChange,
    handleTeamInvite,
  }
}