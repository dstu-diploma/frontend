import React from 'react'
import clsx from 'clsx'
import { type User } from '@/features/user'
import { type TeamInfo } from '@/features/team/model/types'
import { isTeam, isUser } from '@/features/admin/model/guards'
import { AccordionTrigger } from '@/shared/ui/shadcn/accordion'
import { mapRole } from '@/shared/lib/helpers/roleMapping'
import styles from './AccordionBlockTrigger.module.scss'
import { useAdmin } from '@/features/admin/hooks/useAdmin'
interface AccordionBlockTriggerProps {
  entity: User | TeamInfo | undefined
  className?: string
}

const AccordionBlockTrigger = ({
  entity,
  className,
}: AccordionBlockTriggerProps) => {
  return (
    <AccordionTrigger className={clsx(styles.card, className)}>
      <div className={styles.infoContainer}>
        {isUser(entity) ? (
          <div className={styles.info}>
            <h5 className={styles.name}>
              {entity.first_name} {entity.last_name}
            </h5>
            <span className={styles.param}>Почта:&nbsp;{entity.email}</span>
            <span className={styles.param}>
              Роль:&nbsp;{mapRole(entity.role)}
            </span>
          </div>
        ) : isTeam(entity) ? (
          <div className={styles.info}>
            <h5 className={styles.name}>{entity.name}</h5>
            <span className={styles.param}>Хакатон:&nbsp;Не указан</span>
            <span className={styles.param}>
              Участников:&nbsp;{entity.mates?.length || 0}
            </span>
          </div>
        ) : (
          <span>Неизвестная сущность</span>
        )}
      </div>
    </AccordionTrigger>
  )
}

export default AccordionBlockTrigger
