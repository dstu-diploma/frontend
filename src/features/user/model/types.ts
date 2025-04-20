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

export interface UserProfile extends Omit<User, 'id'> {
  role: 'user' | 'admin'
} 

export type BaseUserType = {
  id: number,
  first_name: string,
  last_name: string,
  patronymic: string,
  register_date: string,
  email: string,
  about: string | null,
  birthday: string | null
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


