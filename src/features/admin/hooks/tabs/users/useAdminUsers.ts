'use client'

import { adminApi } from '../../../api'

export const useAdminUsers = () => {
  const { data: users, isPending: isUsersLoading } = adminApi.useGetAllUsers()

  return {
    users,
    isUsersLoading,
  }
}
