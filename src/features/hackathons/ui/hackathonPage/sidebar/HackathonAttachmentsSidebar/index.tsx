import React from 'react'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import { Button } from '@/shared/ui/shadcn/button'
import HackathonPageSidebar from '../HackathonPageSidebar'
import styles from './HackathonAttachmentsSidebar.module.scss'
import AttachmentRow from './AttachmentRow'
import { useHackathonAttachments } from '@/features/hackathons/hooks/useHackathonAttachments'
import { useParams } from 'next/navigation'
import { UserUpload } from '@/features/user/model/types'

interface HackathonAttachmentsSidebarProps {
  attachments: UserUpload[] | undefined
}

const HackathonAttachmentsSidebar = ({
  attachments,
}: HackathonAttachmentsSidebarProps) => {
  const { id } = useParams()
  const hackathon_id = Number(id)
  const { handleUpload, handleDelete } = useHackathonAttachments(hackathon_id)

  return (
    <HackathonPageSidebar
      title='Приложения к хакатону'
      actions={
        isPrivilegedRole() && (
          <div className={styles.sidebarActions}>
            <div style={{ position: 'relative' }}>
              <input
                type='file'
                style={{ display: 'none' }}
                id='file-upload'
                onChange={handleUpload}
              />
              <Button
                onClick={() => {
                  document.getElementById('file-upload')?.click()
                }}
              >
                Загрузить вложение
              </Button>
            </div>
          </div>
        )
      }
    >
      <div className={styles.hackathonAttachments}>
        {attachments && attachments.length > 0 ? (
          <div className={styles.attachmentsList}>
            {attachments.map(attachment => (
              <AttachmentRow
                key={attachment.id}
                fileName={attachment.name}
                mimeType={attachment.content_type}
                link={attachment.link}
                onDelete={() => handleDelete(attachment)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noAttachments}>Нет загруженных приложений</div>
        )}
      </div>
    </HackathonPageSidebar>
  )
}

export default HackathonAttachmentsSidebar
