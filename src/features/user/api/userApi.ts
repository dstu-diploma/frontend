import { User, UserProfile } from '../model/types';

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    return {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      bio: 'Frontend разработчик',
      phone: '+7 (999) 123-45-67',
      location: 'Ростов-на-Дону',
    };
  },

  updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    console.log('Updating profile:', profile);
    return {
      name: profile.name || 'Иван Иванов',
      email: profile.email || 'ivan@example.com',
      bio: profile.bio || 'Frontend разработчик',
      phone: profile.phone || '+7 (999) 123-45-67',
      location: profile.location || 'Ростов-на-Дону',
      avatar: profile.avatar,
    };
  },

  updateAvatar: async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  },
}; 