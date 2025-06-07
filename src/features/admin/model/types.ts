import { RoleMapValues } from '@/shared/lib/helpers/roleMapping'

type AdminUserFormData = {
  email: string
  first_name: string
  last_name: string
  patronymic: string
  about: string
  birthday: string | null
  password: string
  role: RoleMapValues
}

export type AdminUserData = Partial<AdminUserFormData>

export type SelectOption = {
  value: string
  label: string
}

export type FilterType = 'role' | 'status'
