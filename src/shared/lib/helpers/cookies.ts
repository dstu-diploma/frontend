import Cookies from 'js-cookie';
import { BaseUserType, TokensObject } from '@/features/user/model/types';

const COOKIE_OPTIONS = {
  expires: 7,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

export const setAccessToken = (accessToken: string) => {
  Cookies.set('access_token', accessToken, COOKIE_OPTIONS);
}

export const setUserCookie = (user: BaseUserType) => {
  Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
}

export const setTokensCookie = (tokens: TokensObject) => {
  Cookies.set('access_token', tokens.accessToken)
  Cookies.set('refresh_token', tokens.refreshToken)
}

export const setAuthCookies = (user: BaseUserType, accessToken: string, refreshToken: string) => {
  Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
  Cookies.set('access_token', accessToken, COOKIE_OPTIONS);
  Cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS);
};

export const getAuthCookies = () => {
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  
  return {
    user,
    accessToken: Cookies.get('access_token'),
    refreshToken: Cookies.get('refresh_token'),
  };
};

export const removeAuthCookies = () => {
  Cookies.remove('user', { path: '/' });
  Cookies.remove('access_token', { path: '/' });
  Cookies.remove('refresh_token', { path: '/' });
};

export const isAuthenticated = () => {
  return !!Cookies.get('access_token');
}; 