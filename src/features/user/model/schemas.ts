import { z } from "zod";

// Валидация формы логина
export const loginSchema = z.object({
  username: z.string().email("Некорректный email").min(1, "Обязательное поле"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

// Валидация формы регистрации
export const registerSchema = z
  .object({
    last_name: z
      .string()
      .min(3, { message: "Фамилия должна содержать минимум 3 символа" })
      .max(30, { message: "Фамилия не должна превышать 30 символов" }),
    first_name: z
      .string()
      .min(3, { message: "Имя должно содержать минимум 3 символа" })
      .max(30, { message: "Имя не должно превышать 30 символов" }),
    patronymic: z
      .string()
      .min(3, { message: "Отчество должно содержать минимум 3 символа" })
      .max(30, { message: "Отчество не должно превышать 30 символов" })
      .optional(),
    email: z
      .string()
      .email({ message: "Некорректный email адрес" })
      .min(4, { message: "Email должен содержать минимум 4 символа" })
      .max(60, { message: "Email не должен превышать 60 символов" }),
    password: z
      .string()
      .min(8, { message: "Пароль должен содержать минимум 8 символов" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

// Валидация формы профиля
export const profileSchema = z.object({
    first_name: z
      .string()
      .min(3, { message: "Имя должно содержать минимум 3 символа" })
      .max(30, { message: "Имя не должно превышать 30 символов" }),
    last_name: z
      .string()
      .min(3, { message: "Фамилия должна содержать минимум 3 символа" })
      .max(30, { message: "Фамилия не должна превышать 30 символов" }),
    patronymic: z
      .string()
      .min(3, { message: "Отчество должно содержать минимум 3 символа" })
      .max(30, { message: "Отчество не должно превышать 30 символов" })
      .optional(),
    email: z
      .string()
      .email({ message: "Некорректный email адрес" })
      .min(4, { message: "Email должен содержать минимум 4 символа" })
      .max(60, { message: "Email не должен превышать 60 символов" }),
    about: z
      .string()
      .max(100, { message: "Информация о себе не должна превышать 100 символов" })
      .optional(),
    birthday: z
      .string()
      .min(10, { message: "Дата рождения должна содержать минимум 10 символов" })
      .optional(),
    role: z.string().optional(),
    registerDate: z.string().optional()
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;