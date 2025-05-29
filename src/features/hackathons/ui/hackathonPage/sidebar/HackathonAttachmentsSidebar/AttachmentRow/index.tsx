import React from 'react'
import {
  allowedMimeTypes,
  MimeTypeItem,
} from '@/shared/lib/helpers/attachmentMapping'
import { IoTrashOutline } from 'react-icons/io5'
import styles from './AttachmentRow.module.scss'
import { ConfirmModal } from '@/features/team'
import Link from 'next/link'

interface AttachmentRowProps {
  fileName: string
  mimeType: string
  link: string
  onDelete: () => void
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

  return (
    <div className={styles.attachmentRow}>
      <Link href={link} className={styles.attachmentInfo}>
        <div className={styles.iconWrapper}>{icon}</div>
        <span className={styles.fileName}>{fileName}</span>
      </Link>
      <ConfirmModal
        title={`Вы действительно хотите удалить приложение "${fileName.slice(0, 30)}..."?`}
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
    </div>
  )
}

export default AttachmentRow
