import React from 'react'
import clsx from 'clsx'
import { type User } from '@/features/user'
import { type TeamInfo } from '@/features/team/model/types'
import { isTeam, isUser } from '@/features/admin/model/guards'
import { AccordionTrigger } from '@/shared/ui/shadcn/accordion'
import { mapRole } from '@/shared/lib/helpers/roleMapping'
import styles from './AccordionBlockTrigger.module.scss'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface AccordionBlockTriggerProps {
  entity: User | TeamInfo | undefined
  className?: string
}

const AccordionBlockTrigger = ({
  entity,
  className,
}: AccordionBlockTriggerProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const accordionBlockTriggerStyles = clsx(styles.card, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <AccordionTrigger className={clsx(accordionBlockTriggerStyles, className)}>
      <div className={styles.infoContainer}>
        {isUser(entity) ? (
          <div className={styles.info}>
            <h5 className={styles.name}>
              {entity.first_name} {entity.last_name}
            </h5>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>
                ID пользователя:&nbsp;
              </span>
              <span className={styles.defaultParamValue}>{entity.id}</span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Почта:&nbsp;</span>
              <span className={styles.defaultParamValue}>{entity.email}</span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Роль:&nbsp;</span>
              <span className={styles.defaultParamValue}>
                {mapRole(entity.role)}
              </span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Cтатус:&nbsp;</span>
              <span
                className={
                  entity.is_banned
                    ? styles.closedParamValue
                    : styles.successParamValue
                }
              >
                {entity.is_banned ? 'Заблокирован' : 'Активен'}
              </span>
            </div>
          </div>
        ) : isTeam(entity) ? (
          <div className={styles.info}>
            <h5 className={styles.name}>{entity.name}</h5>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Участников:&nbsp;</span>
              <span className={styles.defaultParamValue}>
                {entity.mates?.length || 0}
              </span>
            </div>
          </div>
        ) : (
          <span>Неизвестная сущность</span>
        )}
      </div>
    </AccordionTrigger>
  )
}

export default AccordionBlockTrigger
