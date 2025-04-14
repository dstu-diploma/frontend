'use client';

import { useProfile } from '@/features/user/hooks/useProfile';
// import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar/';
import { Button } from '@/shared/ui/shadcn/button/';
import { Input } from '@/shared/ui/shadcn/input/';
import { Label } from '@/shared/ui/shadcn/label/';
import { Textarea } from '@/shared/ui/shadcn/textarea/';
import styles from '@/features/user/styles/ProfilePage.module.css';

export const ProfilePage = () => {
  const { profile, isLoading, error, updateProfile, updateAvatar } = useProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      bio: formData.get('bio') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
    };

    await updateProfile(updatedProfile);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await updateAvatar(file);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>Профиль не найден</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <h1 className={styles.profileTitle}>Профиль</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            {/* <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar> */}
            {/* <div>
              <Label htmlFor="avatar">Изменить аватар</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-1"
              />
            </div> */}
          </div>
          <div className={styles.profileFormItem}>
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              name="name"
              defaultValue={profile.name}
            />
          </div>
          <div className={styles.profileFormItem}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile.email}
            />
          </div>

          <div className={styles.profileFormItem}>
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={profile.bio}
            />
          </div>
          <div className={styles.profileFormItem}>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={profile.phone}
            />
          </div>
          <div className={styles.profileFormItem}>
            <Label htmlFor="location">Местоположение</Label>
            <Input
              id="location"
              name="location"
              defaultValue={profile.location}
            />
          </div>

          <Button type="submit" className={styles.formSubmit}>Сохранить изменения</Button>
        </form>
      </div>
    </div>
  );
}; 