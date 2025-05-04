import { useToast } from "@/shared/hooks/use-toast";
import { teamApi } from "../../api/teamApi";

interface useRenameModalProps {
  teamName: string
  setTeamName: React.Dispatch<React.SetStateAction<string>>
}

export const useRenameModal = ({ teamName, setTeamName }: useRenameModalProps) => {
  const { mutate: renameTeam } = teamApi.renameTeam()
  const { toast, dismiss } = useToast()

  const handleTeamNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTeamName(newValue)
  }
  
  const handleTeamRename = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { name: teamName }
    renameTeam(requestBody, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Название команды изменено'
        })
      },
      onError: (error) => {
        dismiss()
        toast({
          variant: 'destructive',
          description: 'Ошибка при переименовании команды'
        })
        console.error('Ошибка при переименовании команды: ', error)
      }
    })
  }

  return {
    handleTeamRename,
    handleTeamNameChange,
  }
}