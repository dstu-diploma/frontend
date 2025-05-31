'use client'

import Image from 'next/image'
import styles from './userpage.module.scss'
import { useParams } from 'next/navigation'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { getAxiosResponse } from '@/shared/lib/helpers/apiResponse'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import { useUserPage } from '@/features/user/hooks/userpage/useUserPage'
import CustomMDEditor from '@/shared/ui/custom/misc/CustomMDEditor/CustomMDEditor'
import { mapRole } from '@/shared/lib/helpers/roleMapping'

export default function UserPage() {
  const { id } = useParams()
  const page_id = Number(id)
  const {
    user,
    isUserLoading,
    getInitials,
    coverUrl,
    avatarUrl,
    gradient,
    userLoadError,
  } = useUserPage(page_id)

  if (isUserLoading) {
    return (
      <div className={styles.container}>
        <LayoutFallback text='Загрузка данных о пользователе...' />
      </div>
    )
  }

  if (!user) {
    return (
      <Toolbar className={styles.errorToolbar}>
        <div className={styles.errorBlock}>
          <h5>Ошибка при загрузке данных о пользователе</h5>
          <p>{getAxiosResponse(userLoadError)}</p>
        </div>
      </Toolbar>
    )
  }

  return (
    <>
      <div
        className={styles.coverSection}
        style={{
          background: coverUrl ? `url(${coverUrl}) center/cover` : gradient,
        }}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {avatarUrl ? (
                <Image
                  className={styles.avatarImage}
                  src={avatarUrl}
                  alt='Аватар пользователя'
                  width={200}
                  height={200}
                />
              ) : (
                getInitials()
              )}
            </div>
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.name}>
              {user.last_name} {user.first_name} {user.patronymic}
            </h1>
            {user.is_banned ? (
              <div className={styles.status}>
                Cтатус: <span className={styles.banned}>Заблокирован</span>
              </div>
            ) : (
              <div className={styles.status}>
                Cтатус: <span className={styles.active}>Активен</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <h2 className={styles.sectionTitle}>Информация о пользователе</h2>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>ID пользователя</div>
              <div className={styles.detailValue}>{user.id}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Роль</div>
              <div className={styles.detailValue}>{mapRole(user.role)}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Дата регистрации</div>
              <div className={styles.detailValue}>
                {ISOStringToDateString(user.register_date)}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Дата рождения</div>
              <div className={styles.detailValue}>
                {user.birthday
                  ? ISOStringToDateString(user.birthday)
                  : 'Не указана'}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Описание профиля</h2>
          <div className={styles.about}>
            {user.about ? (
              <CustomMDEditor
                value={user.about || ''}
                height={300}
                preview='preview'
                hideToolbar={true}
                visiableDragbar={false}
                mdClassName={styles.markdownEditor}
              />
            ) : (
              'Не предоставлено'
            )}
          </div>
        </div>
      </div>
    </>
  )
}
