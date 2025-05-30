import React from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import styles from './HackathonTeamSubmissionSidebar.module.scss'
import { useParams } from 'next/navigation'
import HackathonPageSidebar from '@/features/hackathons/ui/hackathonPage/sidebar/HackathonPageSidebar'
import AttachmentRow from '@/features/hackathons/ui/hackathonPage/sidebar/HackathonAttachmentsSidebar/AttachmentRow'
import { useHackathonTeamSubmission } from '@/features/team/hooks/hackathonTeam/useHackathonTeamSubmission'
import { HackathonTeamSubmission } from '@/features/team/model/types'

interface HackathonTeamSubmissionSidebarProps {
  submission: HackathonTeamSubmission | undefined
}

const HackathonAttachmentsSidebar = ({
  submission,
}: HackathonTeamSubmissionSidebarProps) => {
  const { id } = useParams()
  const hackathon_id = Number(id)
  const { handleUploadSubmission } = useHackathonTeamSubmission(hackathon_id)

  return (
    <HackathonPageSidebar
      title='Вложение команды'
      actions={
        !submission && (
          <div className={styles.sidebarActions}>
            <div style={{ position: 'relative' }}>
              <input
                type='file'
                style={{ display: 'none' }}
                id='file-upload'
                onChange={handleUploadSubmission}
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
        {submission ? (
          <div className={styles.attachmentsList}>
            <AttachmentRow
              key={submission.id}
              fileName={submission.name}
              mimeType={submission.content_type}
              link={submission.url}
            />
          </div>
        ) : (
          <div className={styles.noAttachments}>Нет загруженного вложения</div>
        )}
      </div>
    </HackathonPageSidebar>
  )
}

export default HackathonAttachmentsSidebar
