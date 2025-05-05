'use client';

import { userApi, ProfileFormData } from '@/features/user';
import { cookiesApi } from '@/shared/lib/helpers/cookies';
import { dateStringToISO } from '@/shared/lib/helpers/date';
import { BaseUserType } from '@/features/user/model/types';
import { ProfileForm } from '@/features/user/ui/profile/ProfileForm/ProfileForm';
import styles from './profile.module.css'

const ProfilePage = () => {
  const { mutate: updateProfile } = userApi.updateProfile();

  const handleSubmit = async (data: ProfileFormData) => {
    console.log("Обновление данных юзера...")
    updateProfile({
      first_name: data.first_name,
      last_name: data.last_name,
      patronymic: data.patronymic,
      email: data.email,
      about: data.about,
      birthday: dateStringToISO(data.birthday) || '',
    },
    {
      onSuccess: (data: BaseUserType) => {
        cookiesApi.setUserCookie(data)
      },
      onError: (error) => {
        console.error('Ошибка при обновлении профиля:', error);
      },
    }
    );
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <h1 className={styles.profileTitle}>Профиль</h1>
        <ProfileForm 
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}; 

export default ProfilePage;