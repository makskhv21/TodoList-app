# Використовуємо офіційний Node.js образ для фронтенду
FROM node:18 AS build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і package-lock.json для встановлення залежностей
COPY frontend/package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли фронтенду в контейнер
COPY frontend/ ./

# Створюємо production build для фронтенду
RUN npm run build

# Встановлюємо сервер для обслуговування статичних файлів
FROM nginx:alpine

# Копіюємо створений build з попереднього кроку в nginx
COPY --from=build /app/build /usr/share/nginx/html

# Відкриваємо порт для Nginx
EXPOSE 80

# Запускаємо Nginx сервер
CMD ["nginx", "-g", "daemon off;"]
