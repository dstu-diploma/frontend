# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Этап продакшена
FROM node:18-alpine AS runner

WORKDIR /app

# Установка только production зависимостей
COPY package*.json ./
RUN npm install --production

# Копирование собранного приложения
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Настройки для продакшена
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Запуск в режиме продакшена
CMD ["npm", "start"]
