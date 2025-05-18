import React from 'react'
import styles from './HackathonInfoSidebar.module.scss'
import { DetailedHackathon } from '../../model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { Button } from '@/shared/ui/shadcn/button'
import { ActionModal } from '@/shared/ui/custom/ActionModal'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import HackathonEditFormContent from '../modal-form-contents/HackathonEditFormContent'
import { UseFormReturn } from 'react-hook-form'
import { HackathonFormData } from '../../model/schemas'
import { useHackathonPage } from '../../hooks/useHackathonPage'

interface HackathonInfoSidebarProps {
  hackathon: DetailedHackathon | null
  editForm: UseFormReturn<HackathonFormData>
  style?: React.CSSProperties
}

const HackathonInfoSidebar = ({
  hackathon,
  editForm,
  style,
}: HackathonInfoSidebarProps) => {
  if (!hackathon) return null

  const { handleHackathonUpdate } = useHackathonPage(hackathon.id)

  return (
    <div className={styles.sidebar} style={style}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <h4>Информация о хакатоне</h4>
          <div className={styles.sidebarInfo}>
            <div className={styles.sidebarInfoItem}>
              <span className={styles.sidebarInfoLabel}>Дата начала:</span>
              <span className={styles.sidebarInfoValue}>
                {ISOStringToDateString(hackathon.start_date)}
              </span>
            </div>
            <div className={styles.sidebarInfoItem}>
              <span className={styles.sidebarInfoLabel}>
                Дата начала оценок:
              </span>
              <span className={styles.sidebarInfoValue}>
                {ISOStringToDateString(hackathon.score_start_date)}
              </span>
            </div>
            <div className={styles.sidebarInfoItem}>
              <span className={styles.sidebarInfoLabel}>Дата окончания:</span>
              <span className={styles.sidebarInfoValue}>
                {ISOStringToDateString(hackathon.end_date)}
              </span>
            </div>
            <div className={styles.sidebarInfoItem}>
              <span className={styles.sidebarInfoLabel}>
                Макс. количество участников:
              </span>
              <span className={styles.sidebarInfoValue}>
                {hackathon.max_participant_count}
              </span>
            </div>
            <div className={styles.sidebarInfoItem}>
              <span className={styles.sidebarInfoLabel}>
                Макс. размер команды:
              </span>
              <span className={styles.sidebarInfoValue}>
                {hackathon.max_team_mates_count}
              </span>
            </div>
          </div>
        </div>
        {isPrivilegedRole() && (
          <div className={styles.sidebarActions}>
            <ActionModal
              title='Редактирование хакатона'
              trigger={<Button>Редактировать</Button>}
              submitButtonText='Сохранить'
              onSave={e => {
                e.preventDefault()
                editForm.handleSubmit(handleHackathonUpdate)(e)
              }}
              contentClassName={styles.editHackathonModal}
            >
              <HackathonEditFormContent form={editForm} />
            </ActionModal>
          </div>
        )}
      </div>
    </div>
  )
}

export default HackathonInfoSidebar
