import { useState, useEffect } from 'react';
import { UserProfile } from '../model/types';
import { profileApi } from '../api/profileApi';

export const useProfile = (): {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (newProfile: Partial<UserProfile>) => Promise<void>;
  updateAvatar: (file: File | null) => Promise<void>;
} => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = profileApi.getProfile();
    setProfile(data);
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

  const updateAvatar = async (file: File | null) => {
    try {
      setIsLoading(true);
      if (file) {
        const avatarUrl = await userApi.updateAvatar(file);
        setProfile(prev => ({ ...prev, avatar: avatarUrl } as UserProfile));
      } else {
        setProfile(prev => ({ ...prev, avatar: undefined } as UserProfile));
      }
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