export interface User {
    id: string;
    first_name: string;
    last_name: string;
    patronymic: string;
    register_date: string;
    email: string;
    about: string | null;
    birthday: string | null;
    role: 'user' | 'admin';
  }
  
  export interface UserPartial {
    id: number,
    first_name: string,
    last_name: string,
    patronymic: string,
    register_date: string
    is_captain: boolean
    role_desc: string
  }
  
  export interface UserByEmail extends Omit<UserPartial, 'is_captain'> {
    
  }
  
  export interface UserProfile extends Omit<User, 'id'> {
    role: 'user' | 'admin'
  } 
  
  export type BaseUserType = {
    first_name: string;
    last_name: string;
    email: string;
    patronymic?: string | undefined;
    about?: string | undefined;
    birthday?: string | undefined;
    role?: string | undefined;
    registerDate?: Date | undefined;
  }
  
  export interface RegisterRequestBody {
    email: string;
    first_name: string;
    last_name: string;
    patronymic: string;
    password: string;
  }
  
  export interface AuthResponseBody {
    user: BaseUserType,
    access_token: string,
    refresh_token: string
  }
  
  export interface LoginRequestBody {
    username: string;
    password: string;
  }
  
  export interface RefreshResponseBody {
    access_token: string;
  }
  
  export interface TokensObject {
    accessToken: string
    refreshToken: string
  }
  
  
  