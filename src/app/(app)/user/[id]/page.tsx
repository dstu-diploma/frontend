'use client'

import { userApi } from '@/features/user'
import styles from './userpage.module.scss'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { User } from '@/features/user/model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { adminApi } from '@/features/admin/api'
import { mapRole } from '@/shared/lib/helpers/roleMapping'

const generateGradient = () => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B59B6',
    '#3498DB',
    '#E67E22',
    '#2ECC71',
  ]

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
  const color1 = getRandomColor()
  const color2 = getRandomColor()
  const angle = Math.floor(Math.random() * 360)

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`
}

export default function UserPage() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [gradient] = useState(generateGradient())
  const { mutate: getParticularUser } = adminApi.getParticularUser()
  const { toast, dismiss } = useToast()
  const avatarPath = userApi.getAvatar(Number(id))

  useEffect(() => {
    getParticularUser(Number(id), {
      onSuccess: user => {
        setUser(user)
        console.log(user)
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as {
            detail: string
          }
          toast({
            variant: 'destructive',
            title: 'Ошибка при получении данных пользователя',
            description: errorData.detail,
          })
        }
      },
    })
  }, [id])

  if (!user) {
    return (
      <Toolbar>
        Данный пользователь не найден или его учётные данные удалены
        администратором
      </Toolbar>
    )
  }

  const getInitials = () => {
    return `${user.first_name[0]}${user.last_name[0]}`
  }

  return (
    <>
      <div className={styles.coverSection} style={{ background: gradient }} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {avatarPath ? (
                <img className={styles.avatarImage} src={avatarPath} />
              ) : (
                getInitials()
              )}
            </div>
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.name}>
              {user.last_name} {user.first_name} {user.patronymic}
            </h1>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.role}>{mapRole(user.role)}</div>
            {user.is_banned && (
              <div className={styles.banned}>Пользователь заблокирован</div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>О пользователе</h2>
          <p className={styles.about}>{user.about || 'Нет информации'}</p>
        </div>

        <div className={styles.details}>
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
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>ID пользователя</div>
            <div className={styles.detailValue}>{user.id}</div>
          </div>
        </div>
      </div>
    </>
  )
}
