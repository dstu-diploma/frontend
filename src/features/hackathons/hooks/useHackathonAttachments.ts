import { adminApi } from '@/features/admin/api'
import {
  Attachment,
  DeleteHackathonAttachmentRequestBody,
  UploadHackathonAttachmentRequestBody,
} from '@/features/hackathons/model/types'
import { useToast } from '@/shared/hooks/use-toast'
import {
  isAllowedMimeType,
  MimeType,
} from '@/shared/lib/helpers/attachmentMapping'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

export const useHackathonAttachments = (page_id: number) => {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const { mutate: getHackathonAttachmentsList } =
    adminApi.getAllHackathonAttachments()
  const { mutate: uploadHackathonAttachment } =
    adminApi.uploadHackathonAttachment()
  const { mutate: deleteHackathonAttachment } =
    adminApi.deleteHackathonAttachment()

  const hackathon_id = Number(page_id)
  const { toast, dismiss } = useToast()

  // Функция для получения списка документов хакатона
  const getHackathonAttachments = async () => {
    getHackathonAttachmentsList(hackathon_id, {
      onSuccess: data => {
        setAttachments(data)
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при получении документов хакатона',
            description: errorData.detail,
          })
        }
      },
    })
  }

  // Получение списка документов хакатона при открытии страницы
  useEffect(() => {
    getHackathonAttachments()
  }, [page_id])

  // Проверка на длину имени файла
  const isFileNameLong = (fileName: string | undefined) => {
    return fileName?.length && fileName.length > 20
  }

  // Обработчик загрузки файла
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const fileName = isFileNameLong(file?.name)
      ? file?.name.slice(0, 20) + '...'
      : file?.name

    if (!isAllowedMimeType(file.type as MimeType)) {
      toast({
        variant: 'destructive',
        title: 'Ошибка при загрузке приложения',
        description: 'Разрешенные форматы: doc, docx, ppt, pptx, txt, jpg, png',
      })
      return
    }

    const requestBody: UploadHackathonAttachmentRequestBody = {
      hackathon_id,
      file,
    }

    uploadHackathonAttachment(requestBody, {
      onSuccess: async () => {
        toast({
          variant: 'defaultBlueSuccess',
          description: `Приложение "${fileName}" успешно загружено`,
        })
        await getHackathonAttachments()
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка загрузки приложения',
            description: errorData.detail,
          })
        }
      },
    })
  }

  // Обработка удаления документа из хакатона
  const handleDelete = async (attachment: Attachment) => {
    const requestBody: DeleteHackathonAttachmentRequestBody = {
      hackathon_id,
      file_id: attachment.id,
    }
    deleteHackathonAttachment(requestBody, {
      onSuccess: async () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Приложение "${attachment.name}" успешно удалено`,
        })
        await getHackathonAttachments()
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при удалении приложения к хакатону',
            description: errorData.detail,
          })
        }
      },
    })
  }

  return {
    attachments,
    getHackathonAttachments,
    handleUpload,
    handleDelete,
  }
}
