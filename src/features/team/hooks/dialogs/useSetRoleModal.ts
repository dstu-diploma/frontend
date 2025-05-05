import { useState } from "react"
import { teamApi } from "../../api"
import { useToast } from "@/shared/hooks/use-toast"

interface useSetRoleModalProps {
    refreshTeamInfo: (success_message: string) => Promise<void>
}

export const useSetRoleModal = ({ refreshTeamInfo }: useSetRoleModalProps) => {
  const [role, setRole] = useState('')
  const { mutate: setTeamMateRole } = teamApi.setTeamMateRole()
  const { toast, dismiss } = useToast()

  const handleMateRoleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setRole(newValue)
  }
  
  const handleMateRoleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { role_desc: role }
    setTeamMateRole(requestBody, {
      onSuccess: async () => {
        dismiss()
        await refreshTeamInfo(`Ваша роль в команде успешно изменена`)
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при изменении роли'
        })
        console.error('Ошибка при изменении роли: ', error)
      }
    })
  }

  return {
    role,
    setRole,
    handleMateRoleChange,
    handleMateRoleSave,
  }
}