import { roleMap } from '@/shared/lib/helpers/roleMapping'
import { z } from 'zod'

// Валидация формы профиля
export const adminUserFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: 'Имя должно содержать минимум 3 символа' })
      .max(30, { message: 'Имя не должно превышать 30 символов' }),
    last_name: z
      .string()
      .min(3, { message: 'Фамилия должна содержать минимум 3 символа' })
      .max(30, { message: 'Фамилия не должна превышать 30 символов' }),
    patronymic: z
      .string()
      .min(3, { message: 'Отчество должно содержать минимум 3 символа' })
      .max(30, { message: 'Отчество не должно превышать 30 символов' })
      .optional(),
    email: z
      .string()
      .email({ message: 'Некорректный email адрес' })
      .min(4, { message: 'Email должен содержать минимум 4 символа' })
      .max(60, { message: 'Email не должен превышать 60 символов' }),
    about: z
      .string()
      .max(100, {
        message: 'Информация о себе не должна превышать 100 символов',
      })
      .optional(),
    birthday: z
      .string()
      .refine(
        val => {
          if (!val) return true
          return val.length >= 10
        },
        { message: 'Дата рождения должна содержать минимум 10 символов' },
      )
      .optional(),
    role: z.enum(Object.values(roleMap) as [string, ...string[]], {
      message:
        'Доступные роли: Администратор, Тех.поддержка, Участник, Организатор, Член жюри',
    }),
    password: z
      .string()
      .refine(
        val => {
          if (!val) return true
          return val.length >= 8
        },
        { message: 'Пароль должен содержать минимум 8 символов' },
      )
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['password'],
  })

// Валидация формы команды
export const adminTeamFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Название команды должно содержать минимум 3 символа',
    })
    .max(50, { message: 'Название команды не должно превышать 50 символов' }),
})

export type AdminUserFormData = z.infer<typeof adminUserFormSchema>
export type AdminTeamFormData = z.infer<typeof adminTeamFormSchema>
