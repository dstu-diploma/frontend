import { createContext, useContext, useState, ReactNode } from 'react';
import { cookiesApi } from '@/shared/lib/helpers/cookies';

export interface Username {
  first_name: string;
  last_name: string;
}

interface UsernameContextType {
  username: Username | null;
  setUsername: (user: Username | null) => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<Username | null>(() => {
    const user = cookiesApi.getUser()
    return user 
      ? { 
        first_name: user.first_name, 
        last_name:user.last_name 
      } : null;
  });

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error('useUsername must be used within a UsernameProvider');
  }
  return context;
};