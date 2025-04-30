'use client';

import { profileApiMutations, ProfileFormData } from '@/features/user';
import { setUserCookie } from '@/shared/lib/helpers/cookies';
import { dateStringToISO } from '@/shared/lib/helpers/date';
import { BaseUserType } from '@/features/user/model/types';
import ProfileForm from '@/features/user/ui/ProfileForm';
import styles from './profile.module.css'

const ProfilePage = () => {
  const { 
    mutate: updateProfile, 
    isPending: isUpdatingProfile, 
    error: updateProfileError 
  } = profileApiMutations.updateProfile();

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
        setUserCookie(data)
      },
      onError: (error) => {
        console.error('Ошибка при обновлении профиля:', error);
      },
    }
    );
  };

  if (isUpdatingProfile) {
    return <div>Загрузка...</div>;
  }

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