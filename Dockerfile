# 1. Используем точную версию Node.js
FROM node:20.18.0-alpine AS builder

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# 4. Устанавливаем зависимости
RUN npm ci

# 5. Копируем исходный код проекта
COPY . .

# 6. Строим Next.js приложение
RUN npm run build

# --- Production stage ---
FROM node:20.18.0-alpine AS runner

# 7. Устанавливаем рабочую директорию
WORKDIR /app

# 8. Копируем собранное приложение и нужные файлы из builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

# 9. Указываем переменную окружения для продакшн-режима
ENV NODE_ENV=production

# 10. Запускаем приложение
CMD ["npm", "start"]
