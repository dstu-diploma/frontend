import { memo, useMemo } from 'react'
import styles from './HackathonPageOptionCard.module.scss'
import { Criterion, Judge } from '@/features/hackathons/model/types'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { isJudge } from '@/features/hackathons/model/guards'
import clsx from 'clsx'

interface HackathonPageOptionCardProps {
  item: Judge | Criterion
  children?: React.ReactNode
  className?: string
}

interface AvatarSectionProps {
  item: Judge
}

const AvatarSection = memo(({ item }: AvatarSectionProps) => {
  const avatarLink = useMemo(
    () => (item.user_uploads.length ? item.user_uploads[0].url : ''),
    [item.user_uploads],
  )

  const [firstName, lastName] = useMemo(
    () => item.user_name.split(' '),
    [item.user_name],
  )

  return (
    <Avatar key={avatarLink || 'fallback'} className={styles.avatar}>
      {avatarLink ? (
        <AvatarImage
          src={avatarLink}
          alt={`${item.user_name} avatar`}
          width={150}
          height={150}
          className={styles.avatarImage}
        />
      ) : (
        <AvatarFallback className={styles.avatarFallback}>
          {`${firstName.charAt(0)} ${lastName.charAt(0)}`}
        </AvatarFallback>
      )}
    </Avatar>
  )
})

AvatarSection.displayName = 'AvatarSection'

const TitleSection = memo(({ title }: { title: string }) => (
  <div className={styles.titleBlock}>
    <h5 className={styles.personName}>{title}</h5>
  </div>
))

TitleSection.displayName = 'TitleSection'

export const HackathonPageOptionCard = memo(
  ({ item, children, className }: HackathonPageOptionCardProps) => {
    const isAvatar = isJudge(item)
    const title = useMemo(
      () => (isJudge(item) ? item.user_name : item.name),
      [item],
    )

    return (
      <div className={clsx(styles.item, className)}>
        <div className={styles.header}>
          {isAvatar && <AvatarSection item={item} />}
          <TitleSection title={title} />
        </div>
        {children}
      </div>
    )
  },
)

HackathonPageOptionCard.displayName = 'HackathonPageOptionCard'
