'use client';

import { Button } from '@/shared/ui/shadcn/button/';
import { Input } from '@/shared/ui/shadcn/input/';
import { Label } from '@/shared/ui/shadcn/label/';
import { Textarea } from '@/shared/ui/shadcn/textarea/';
import { ProfileFormData } from '@/features/user/';
import { formatDate, ISOStringToDateString } from '@/shared/lib/helpers/date';
import { ProfileAvatar } from './ProfileAvatar';
import LoadingSpinner from '@/shared/ui/custom/LoadingSpinner/LoadingSpinner';
import styles from '@/features/user/styles/profileForm.module.css';
import { useProfileForm } from '../../hooks/useProfileForm';
import { mapRole } from '@/shared/lib/helpers/roleMapping';

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
}

const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const {
    isLocalLoading,
    submitHandler,
    register,
    errors,
    isSubmitting,
    profile,
  } = useProfileForm({ onSubmit })

  console.log(mapRole(profile.role))

  return (
    <div className={styles.profileFormContainer}>
      {isLocalLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner /> 
        </div>
      )}
        <form 
          onSubmit={submitHandler} 
          className={styles.profileForm}
        >
          <div className={styles.profileFormColumns}>
            <div className={styles.profileFormGroup}>
                <ProfileAvatar 
                  profile={profile}
                />
                <div className={styles.profileFormRow}>
                  <div className={styles.profileFormItem}>
                    <Label htmlFor="registerDate">Дата регистрации</Label>
                    <Input
                      id="registerDate"
                      {...register('registerDate')}
                      defaultValue={formatDate(profile.register_date) || ''}
                      disabled={true}
                      className={styles.profileFormInput}
                    />
                  </div>
                  <div className={styles.profileFormItem}>
                    <Label htmlFor="role">Роль</Label>
                    <Input
                      id="role"
                      {...register('role')}
                      defaultValue={mapRole(profile.role) || ''}
                      disabled={true}
                      className={styles.profileFormInput}
                    />
                  </div>
                </div>
                <div className={styles.profileFormItem}>
                  <Label htmlFor="about">О себе</Label>
                  <Textarea
                    id="about"
                    {...register("about")}
                    defaultValue={profile.about || ''}
                    className={styles.profileFormAbout}
                  />
                  {errors.about && (
                    <span className={styles.errorText}>{errors.about.message}</span>
                  )}
                </div>
            </div>
            <div className={styles.profileFormGroup}>
              <div className={styles.profileFormItem}>
                <Label htmlFor="last_name">Фамилия</Label>
                <Input
                  id="last_name"
                  {...register('last_name')}
                  defaultValue={profile.last_name}
                  className={styles.profileFormInput}
                />
                {errors.last_name && (
                  <span className={styles.errorText}>{errors.last_name.message}</span>
                )}
              </div>
              <div className={styles.profileFormItem}>
                <Label htmlFor="first_name">Имя</Label>
                <Input
                  id="first_name"
                  {...register('first_name')}
                  defaultValue={profile.first_name}
                  className={styles.profileFormInput}
                  {...errors.first_name && (
                    <span className={styles.errorText}>{errors.first_name.message}</span>
                  )}
                />
              </div>
              <div className={styles.profileFormItem}>
                <Label htmlFor="patronymic">Отчество</Label>
                <Input
                  id="patronymic"
                  {...register("patronymic")}
                  defaultValue={profile.patronymic}
                  className={styles.profileFormInput}
                />
                {errors.patronymic && (
                  <span className={styles.errorText}>{errors.patronymic.message}</span>
                )}
              </div>
              <div className={styles.profileFormItem}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  defaultValue={profile.email}
                  className={styles.profileFormInput}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email.message}</span>
                )}
              </div> 
              <div className={styles.profileFormItem}>
                <Label htmlFor="birthday">Дата рождения</Label>
                <Input
                  id="birthday"
                  {...register("birthday")}
                  defaultValue={ISOStringToDateString(profile.birthday) || ''}
                  className={styles.profileFormInput}
                />
                {errors.birthday && (
                  <span className={styles.errorText}>{errors.birthday.message}</span>
                )}
              </div>
            </div>
          </div>
          <Button 
            type="submit" 
            className={styles.formSubmit} 
            disabled={isSubmitting || isLocalLoading}
            >
              {(isSubmitting || isLocalLoading) 
              ? 'Сохранение...' 
              : 'Сохранить изменения'}
          </Button> 
        </form>
    </div>
  )
}

export default ProfileForm