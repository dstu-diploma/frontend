'use client'

import { useMemo, useState } from 'react'
import {
  dateTimeLocalToIso,
  formatDate,
  isoToDateTimeLocal,
} from '@/shared/lib/helpers/date'
import { mapRole } from '@/shared/lib/helpers/roleMapping'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import { useProfileForm } from '@/features/user/hooks/profile/useProfileForm'
import { Label } from '@/shared/ui/shadcn/label'
import { Input } from '@/shared/ui/shadcn/input'
import { ProfileAvatar } from '@/features/user'
import CustomMDEditor from '@/shared/ui/custom/misc/CustomMDEditor/CustomMDEditor'
import { Button } from '@/shared/ui/shadcn/button'
import { generateGradient } from '@/shared/lib/helpers/gradient'
import styles from './profile.module.scss'
import { useProfileCover } from '@/features/user/hooks/profile/useProfileCover'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import MediaQuery from 'react-responsive'

export default function ProfilePage() {
  const [gradient] = useState(generateGradient())
  const {
    fileInputRef,
    handleCoverChange,
    handleCoverClick,
    handleCoverDelete,
    coverUrl,
    isLoading,
  } = useProfileCover()

  const {
    submitHandler,
    register,
    watch,
    setValue,
    errors,
    isSubmitting,
    profile,
  } = useProfileForm()

  const defaultProfileData = useMemo(() => {
    return {
      register_date: '',
      role: '',
      birthday: '',
      about: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      email: '',
    }
  }, [])

  const profileData = useMemo(() => {
    return profile || defaultProfileData
  }, [profile, defaultProfileData])

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const profileStyles = clsx(styles.profileContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })
  const registerDateStyles = clsx(styles.registerDate, {
    [styles.mobile]: styles.detailItem,
  })

  if (!profile) {
    return <LayoutFallback text='Загрузка профиля...' />
  }

  return (
    <div className={profileStyles}>
      <h1>Профиль</h1>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleCoverChange}
        accept='image/*'
        style={{ display: 'none' }}
      />
      <div
        className={styles.coverSection}
        style={{
          background: coverUrl ? `url(${coverUrl}) center/cover` : gradient,
        }}
        onClick={handleCoverClick}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.avatarContainer}>
              <ProfileAvatar profile={profile} />
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.name}>
                <MediaQuery maxWidth={767}>
                  {profile.last_name} {profile.first_name}
                </MediaQuery>
                <MediaQuery minWidth={768}>
                  {profile.last_name} {profile.first_name} {profile.patronymic}
                </MediaQuery>
              </h1>
              <p className={registerDateStyles}>
                Дата регистрации&nbsp;
                <span>
                  {formatDate(profileData.register_date) || 'Не указана'}
                </span>
              </p>
            </div>
          </div>
          {coverUrl && (
            <div className={styles.deleteButtonWrapper}>
              <Button
                variant='destructive'
                onClick={handleCoverDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Загрузка...' : 'Удалить обложку'}
              </Button>
            </div>
          )}
          {!coverUrl && (
            <MediaQuery maxWidth={767}>
              <div className={styles.deleteButtonWrapper}>
                <Button onClick={handleCoverClick} disabled={isLoading}>
                  {isLoading ? 'Загрузка...' : 'Установить обложку'}
                </Button>
              </div>
            </MediaQuery>
          )}
        </div>
        <form onSubmit={submitHandler} className={styles.profileForm}>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>Роль</Label>
              <div className={styles.detailValue}>
                <Input
                  id='role'
                  {...register('role')}
                  defaultValue={mapRole(profileData.role) || ''}
                  disabled={true}
                  className={styles.profileFormInput}
                />
              </div>
            </div>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>Дата рождения</Label>
              <div className={styles.detailValue}>
                <Input
                  type='datetime-local'
                  id='birthday'
                  value={isoToDateTimeLocal(watch('birthday')) || ''}
                  onChange={e => {
                    setValue('birthday', dateTimeLocalToIso(e.target.value))
                  }}
                  className={styles.profileFormInput}
                />
              </div>
              {errors.birthday && (
                <span className={styles.errorText}>
                  {errors.birthday.message}
                </span>
              )}
            </div>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>Email</Label>
              <div className={styles.detailValue}>
                <Input
                  id='email'
                  {...register('email')}
                  defaultValue={profileData.email || ''}
                  className={styles.profileFormInput}
                />
              </div>
              {errors.email && (
                <span className={styles.errorText}>{errors.email.message}</span>
              )}
            </div>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>Фамилия</Label>
              <div className={styles.detailValue}>
                <Input
                  id='last_name'
                  {...register('last_name')}
                  defaultValue={profileData.last_name || ''}
                  className={styles.profileFormInput}
                />
              </div>
              {errors.last_name && (
                <span className={styles.errorText}>
                  {errors.last_name.message}
                </span>
              )}
            </div>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>Имя</Label>
              <div className={styles.detailValue}>
                <Input
                  id='first_name'
                  {...register('first_name')}
                  defaultValue={profileData.first_name || ''}
                  className={styles.profileFormInput}
                />
              </div>
              {errors.first_name && (
                <span className={styles.errorText}>
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>Отчество</Label>
              <div className={styles.detailValue}>
                <Input
                  id='patronymic'
                  {...register('patronymic')}
                  defaultValue={profileData.patronymic || ''}
                  className={styles.profileFormInput}
                />
              </div>
              {errors.patronymic && (
                <span className={styles.errorText}>
                  {errors.patronymic.message}
                </span>
              )}
            </div>
            <div className={styles.detailItem}>
              <Label className={styles.detailLabel}>О себе</Label>
              <div className={styles.detailValue}>
                <CustomMDEditor
                  value={
                    typeof watch('about') === 'string' ? watch('about') : ''
                  }
                  onChange={value => {
                    setValue('about', value || '')
                  }}
                  height={300}
                  preview='edit'
                />
              </div>
            </div>
            {errors.about && (
              <span className={styles.errorText}>{errors.about.message}</span>
            )}
          </div>
          <Button
            type='submit'
            className={styles.formSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </form>
      </div>
    </div>
  )
}
