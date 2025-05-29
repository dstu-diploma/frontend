import {
  Attachment,
  DeleteHackathonAttachmentRequestBody,
  UploadHackathonAttachmentRequestBody,
} from '@/features/hackathons/model/types'
import {
  isAllowedMimeType,
  MimeType,
} from '@/shared/lib/helpers/attachmentMapping'
import { hackathonApi } from '../api'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useHackathonAttachments = (page_id: number) => {
  const hackathonId = Number(page_id)
  const { mutate: uploadHackathonAttachment } =
    hackathonApi.useUploadHackathonAttachment(hackathonId)
  const { mutate: deleteHackathonAttachment } =
    hackathonApi.useDeleteHackathonAttachment(hackathonId)

  const hackathon_id = Number(page_id)

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
      notificationService.errorRaw(
        'Ошибка при загрузке приложения',
        'Разрешенные форматы: doc, docx, ppt, pptx, txt, jpg, png',
      )
      return
    }

    const requestBody: UploadHackathonAttachmentRequestBody = {
      hackathon_id,
      file,
    }

    uploadHackathonAttachment(requestBody, {
      onSuccess: async () =>
        notificationService.success(
          `Приложение "${fileName}" успешно загружено`,
        ),
      onError: error =>
        notificationService.error(error, `Ошибка загрузки приложения`),
    })
  }

  // Обработка удаления документа из хакатона
  const handleDelete = async (attachment: Attachment) => {
    const requestBody: DeleteHackathonAttachmentRequestBody = {
      hackathon_id,
      file_id: attachment.id,
    }
    deleteHackathonAttachment(requestBody, {
      onSuccess: async () =>
        notificationService.success(
          `Приложение "${attachment.name}" успешно удалено`,
        ),
      onError: error =>
        notificationService.error(
          error,
          `Ошибка при удалении приложения к хакатону`,
        ),
    })
  }

  return {
    handleUpload,
    handleDelete,
  }
}
