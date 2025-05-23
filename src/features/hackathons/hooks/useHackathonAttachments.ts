import {
  Attachment,
  DeleteHackathonAttachmentRequestBody,
  UploadHackathonAttachmentRequestBody,
} from '@/features/hackathons/model/types'
import {
  isAllowedMimeType,
  MimeType,
} from '@/shared/lib/helpers/attachmentMapping'
import { useEffect } from 'react'
import { hackathonApi } from '../api'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useHackathonAttachments = (page_id: number) => {
  const { showToastSuccess, showToastError, showRawToastError } =
    useCustomToast()
  const hackathonId = Number(page_id)
  const { data: attachments, error: attachmentsLoadError } =
    hackathonApi.useGetHackathonAttachments(hackathonId)
  const { mutate: uploadHackathonAttachment } =
    hackathonApi.useUploadHackathonAttachment(hackathonId)
  const { mutate: deleteHackathonAttachment } =
    hackathonApi.useDeleteHackathonAttachment(hackathonId)

  const hackathon_id = Number(page_id)

  // Вывод ошибок при получении списка жюри
  useEffect(() => {
    if (attachmentsLoadError) {
      showToastError(
        attachmentsLoadError,
        `Ошибка при получении cписка приложений к хакатону`,
      )
    }
  }, [attachmentsLoadError])

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
      showRawToastError(
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
        showToastSuccess(`Приложение "${fileName}" успешно загружено`),
      onError: error => showToastError(error, `Ошибка загрузки приложения`),
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
        showToastSuccess(`Приложение "${attachment.name}" успешно удалено`),
      onError: error =>
        showToastError(error, `Ошибка при удалении приложения к хакатону`),
    })
  }

  return {
    attachments,
    handleUpload,
    handleDelete,
  }
}
