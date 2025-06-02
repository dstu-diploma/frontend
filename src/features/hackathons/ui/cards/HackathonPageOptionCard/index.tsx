import { memo, useMemo } from 'react'
import styles from './HackathonPageOptionCard.module.scss'
import { Criterion, Judge } from '@/features/hackathons/model/types'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { isJudge } from '@/features/hackathons/model/guards'
import clsx from 'clsx'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonPageOptionCardProps {
  item: Judge | Criterion
  children?: React.ReactNode
  className?: string
  avatarClassName?: string
  titleBlockClassName?: string
}

interface AvatarSectionProps {
  item: Judge
  className?: string
}

const AvatarSection = memo(({ item, className }: AvatarSectionProps) => {
  const avatarLink = useMemo(() => {
    const avatarUpload = item.user_uploads.find(
      upload => upload.type === 'avatar',
    )
    return avatarUpload?.url || ''
  }, [item.user_uploads])

  const [firstName, lastName] = useMemo(
    () => item.user_name.split(' '),
    [item.user_name],
  )

  return (
    <Avatar
      key={avatarLink || 'fallback'}
      className={clsx(styles.avatar, className)}
    >
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

const TitleSection = memo(
  ({ title, className }: { title: string; className?: string }) => (
    <div className={clsx(styles.titleBlock, className)}>
      <h5 className={styles.personName}>{title}</h5>
    </div>
  ),
)

TitleSection.displayName = 'TitleSection'

export const HackathonPageOptionCard = memo(
  ({
    item,
    children,
    className,
    avatarClassName,
    titleBlockClassName,
  }: HackathonPageOptionCardProps) => {
    const isAvatar = isJudge(item)
    const title = useMemo(
      () => (isJudge(item) ? item.user_name : item.name),
      [item],
    )

    const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
    const optionCardStyles = clsx(styles.item, {
      [styles.mobile]: isMobile,
      [styles.tablet]: isTablet,
      [styles.desktop]: isDesktop,
      [styles.mediumDesktop]: isMediumDesktop,
    })

    return (
      <div className={clsx(optionCardStyles, className)}>
        <div className={styles.header}>
          {isAvatar && (
            <AvatarSection item={item} className={avatarClassName} />
          )}
          <TitleSection title={title} className={titleBlockClassName} />
        </div>
        {children}
      </div>
    )
  },
)

HackathonPageOptionCard.displayName = 'HackathonPageOptionCard'
