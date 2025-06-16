import React from 'react'
import {
  allowedMimeTypes,
  MimeTypeItem,
} from '@/shared/lib/helpers/attachmentMapping'
import { IoTrashOutline } from 'react-icons/io5'
import styles from './AttachmentRow.module.scss'
import { ConfirmModal } from '@/features/team'
import Link from 'next/link'
import { isAdminOrOrganizer } from '@/shared/lib/helpers/roleMapping'

interface AttachmentRowProps {
  fileName: string
  mimeType: string
  link: string
  onDelete?: () => void
}

const AttachmentRow: React.FC<AttachmentRowProps> = ({
  fileName,
  mimeType,
  onDelete,
  link,
}) => {
  const icon = allowedMimeTypes.find(
    (mime: MimeTypeItem) => mime.type === mimeType,
  )?.icon

  const proccessedFileName =
    fileName.length > 30 ? `${fileName.slice(0, 50)}...` : fileName

  const displayableFileName =
    fileName.length > 50 ? `${fileName.slice(0, 50)}...` : fileName

  return (
    <div className={styles.attachmentRow}>
      <Link href={link} className={styles.attachmentInfo}>
        <div className={styles.iconWrapper}>{icon}</div>
        <span className={styles.fileName}>{displayableFileName}</span>
      </Link>
      {isAdminOrOrganizer() && onDelete && (
        <ConfirmModal
          title={`Вы действительно хотите удалить приложение "${proccessedFileName}..."?`}
          submitButtonText='Удалить'
          onConfirm={onDelete}
        >
          <div
            onClick={e => e.stopPropagation()}
            className={styles.deleteButtonWrapper}
          >
            <button className={styles.deleteButton}>
              <IoTrashOutline className={styles.deleteIcon} />
            </button>
          </div>
        </ConfirmModal>
      )}
    </div>
  )
}

export default AttachmentRow
