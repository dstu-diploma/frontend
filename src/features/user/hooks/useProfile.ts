import { useState, useEffect } from 'react';
import { UserProfile } from '../model/types';
import { userApi } from '../api/userApi';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const data = await userApi.getProfile();
      setProfile(data);
    } catch (err) {
      setError('Не удалось загрузить профиль');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (newProfile: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      const updatedProfile = await userApi.updateProfile(newProfile);
      setProfile(prev => ({ ...prev, ...updatedProfile } as UserProfile));
    } catch (err) {
      setError('Не удалось обновить профиль');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAvatar = async (file: File) => {
    try {
      setIsLoading(true);
      const avatarUrl = await userApi.updateAvatar(file);
      setProfile(prev => ({ ...prev, avatar: avatarUrl } as UserProfile));
    } catch (err) {
      setError('Не удалось обновить аватар');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    updateAvatar,
  };
}; 