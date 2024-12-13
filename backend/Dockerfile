# Використовуємо офіційний Node.js образ для бекенду
FROM node:18

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json для встановлення залежностей
COPY backend/package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли бекенду в контейнер
COPY backend/ ./

# Відкриваємо порт для API (наприклад, 5000)
EXPOSE 5000

# Запускаємо сервер (якщо використовуєш Express)
CMD ["node", "server.js"]
