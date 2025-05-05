import { useToast } from "@/shared/hooks/use-toast";
import { teamApi } from "../../api";
import { useState } from "react";

interface useCreateModalProps {
  refreshTeamInfo: (success_message: string) => Promise<void>
}

export const useCreateModal = ({ refreshTeamInfo }: useCreateModalProps) => {
  const [newTeamName, setNewTeamName] = useState('')
  const { mutate: createTeam } = teamApi.createTeam()
  const { toast, dismiss } = useToast()

  const handleTeamCreateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewTeamName(newValue)
  }
  
  const handleTeamCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { name: newTeamName }
    createTeam(requestBody, {
      onSuccess: async () => {
        dismiss()
        await refreshTeamInfo(`Команда ${newTeamName} успешно создана`)
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при создании команды'
        })
        console.error('Ошибка при создании команды: ', error)
      }
    })
  }

  return {
    setNewTeamName,
    newTeamName,
    handleTeamCreateChange,
    handleTeamCreate,
  }
}