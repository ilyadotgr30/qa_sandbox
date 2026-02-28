# ---------- BUILD STAGE ----------
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- NGINX STAGE ----------
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
