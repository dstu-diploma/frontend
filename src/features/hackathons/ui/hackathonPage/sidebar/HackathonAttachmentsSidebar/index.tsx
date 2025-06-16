import React from 'react'
import {
  isAdminOrOrganizer,
  isPrivilegedRole,
} from '@/shared/lib/helpers/roleMapping'
import { Button } from '@/shared/ui/shadcn/button'
import HackathonPageSidebar from '../HackathonPageSidebar'
import styles from './HackathonAttachmentsSidebar.module.scss'
import AttachmentRow from './AttachmentRow'
import { useHackathonAttachments } from '@/features/hackathons/hooks/useHackathonAttachments'
import { useParams } from 'next/navigation'
import { UserUpload } from '@/features/user/model/types'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

interface HackathonAttachmentsSidebarProps {
  attachments: UserUpload[] | undefined
}

const HackathonAttachmentsSidebar = ({
  attachments,
}: HackathonAttachmentsSidebarProps) => {
  const { id } = useParams()
  const hackathon_id = Number(id)
  const { handleUpload, handleDelete } = useHackathonAttachments(hackathon_id)

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonAttachmentsStyles = clsx(styles.hackathonAttachments, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })
  const sidebarActionsStyles = clsx(styles.sidebarActions, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <HackathonPageSidebar
      title='Приложения к хакатону'
      actions={
        isAdminOrOrganizer() && (
          <div className={sidebarActionsStyles}>
            <div
              style={{ position: 'relative' }}
              className={styles.sidebarAction}
            >
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
      <div className={hackathonAttachmentsStyles}>
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
