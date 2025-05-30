import {
  Attachment,
  DeleteHackathonAttachmentRequestBody,
  UploadHackathonAttachmentRequestBody,
} from '@/features/hackathons/model/types'
import {
  isAllowedMimeType,
  MimeType,
} from '@/shared/lib/helpers/attachmentMapping'
import { notificationService } from '@/shared/lib/services/notification.service'
import { teamApi } from '../../api'

export const useHackathonTeamSubmission = (page_id: number) => {
  const hackathonId = Number(page_id)
  const { mutate: uploadSubmission } = teamApi.useUploadSubmission(hackathonId)
  const hackathon_id = Number(page_id)

  // Проверка на длину имени файла
  const isFileNameLong = (fileName: string | undefined) => {
    return fileName?.length && fileName.length > 20
  }

  // Обработчик загрузки файла
  const handleUploadSubmission = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const fileName = isFileNameLong(file?.name)
      ? file?.name.slice(0, 20) + '...'
      : file?.name

    if (!isAllowedMimeType(file.type as MimeType)) {
      notificationService.errorRaw(
        'Ошибка при загрузке вложения',
        'Разрешенные форматы: doc, docx, ppt, pptx, txt, jpg, png',
      )
      return
    }

    const requestBody: UploadHackathonAttachmentRequestBody = {
      hackathon_id,
      file,
    }

    uploadSubmission(requestBody, {
      onSuccess: async () =>
        notificationService.success(`Вложение "${fileName}" успешно загружено`),
      onError: error =>
        notificationService.error(error, `Ошибка загрузки вложения`),
    })
  }

  return {
    handleUploadSubmission,
  }
}
