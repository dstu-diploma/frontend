'use client';

import { useState } from 'react' 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/shared/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar/';
import { Button } from '@/shared/ui/shadcn/button/';
import { Input } from '@/shared/ui/shadcn/input/';
import { Label } from '@/shared/ui/shadcn/label/';
import { Textarea } from '@/shared/ui/shadcn/textarea/';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown/';
import { Camera, Trash2 } from 'lucide-react';
import { profileSchema } from '../model/schemas';
import { ProfileFormData } from '@/features/user/';
import { getAuthCookies } from '@/shared/lib/helpers/cookies';
import { formatDate, ISOStringToDateString } from '@/shared/lib/helpers/date';
import LoadingSpinner from '@/shared/ui/custom/LoadingSpinner/LoadingSpinner';
import styles from '@/features/user/styles/profileForm.module.css';

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  handleAvatarChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteAvatar?: () => void;
}

const ProfileForm = ({ onSubmit, handleAvatarChange, handleDeleteAvatar }: ProfileFormProps) => {
  const cookies = getAuthCookies();
  const profile = cookies.user;
  const { toast, dismiss } = useToast()
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...profile,
      birthday: ISOStringToDateString(profile.birthday),
    }
  });

  const submitHandler = handleSubmit(async (data) => {
    setIsLocalLoading(true);
    dismiss();
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      await onSubmit(data);
      toast({ variant: 'defaultBlueSuccess', description: "Данные успешно сохранены!" });
      reset(data);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", description: "Ошибка при сохранении" });
    } finally {
      setIsLocalLoading(false);
    }
  });

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
              <div className={styles.profileDropdownContainer}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className={styles.profileAvatarTrigger}>
                    <button className={styles.profileAvatarTriggerButton}>
                      <Avatar className={styles.profileAvatarBlock}>
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback 
                          className={styles.profileAvatarFallback}
                        >
                          {profile.first_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild className={styles.dropdownMenuItem}>
                      <label className={styles.dropdownMenuItemLabel}>
                        <Camera className={styles.dropdownMenuIcon} />
                        <span>Добавить фото</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className={styles.dropdownFileInput}
                        />
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteAvatar}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Удалить фото</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
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
                      defaultValue={profile.role || ''}
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