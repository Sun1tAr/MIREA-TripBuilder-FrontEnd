# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json из trip-builder
COPY trip-builder/package*.json ./

RUN npm install

# Копируем исходный код из trip-builder
COPY trip-builder/ .

RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine

# Копируем nginx конфиг
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
