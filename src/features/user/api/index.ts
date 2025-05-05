import { adminUserApi } from './adminUserApi';
import { profileApi } from './profileApi';
import { userBaseApi } from './userBaseApi';

export const userApi = {
  ...userBaseApi,
  ...profileApi,
  ...adminUserApi,
}