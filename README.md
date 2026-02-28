# QA Sandbox: API + Frontend Training Project

## 🇷🇺 Русская версия

### О проекте
Этот проект создан как учебная песочница для тестировщиков, чтобы практиковать работу с API в Postman.

Внутри развёрнуты:
- Backend API с авторизацией и CRUD-операциями
- Swagger UI для ручного тестирования и изучения контрактов
- Frontend-приложение для визуальной проверки сценариев
- Nginx как единая точка входа

Основная цель: отработка базовых и средних QA-сценариев через реальные API-запросы.

### Что можно тренировать
- Регистрация и логин пользователя
- Получение JWT токена
- Авторизованные запросы через Bearer token
- Полный CRUD для товаров:
1. `GET /products/`
2. `POST /products/`
3. `GET /products/{id}`
4. `PUT /products/{id}`
5. `DELETE /products/{id}`
- Валидации, негативные сценарии и коды ошибок

### Технологии проекта
- 🐍 Backend: FastAPI + SQLAlchemy + Pydantic + JWT + SQLite
- ⚛️ Frontend: React + TypeScript + Vite + Tailwind CSS + Axios
- 🌐 Infra: Nginx + Docker + Docker Compose
- 🧪 QA tools: Postman + Swagger UI

### Архитектура (кратко)
- `backend/` — API, модели, схемы, роуты, БД
- `frontend/` — UI-приложение (feature/entity/widget структура)
- `docker-compose.yaml` — общий запуск сервисов
- `nginx.local.conf` / `nginx-stage.conf` — конфиги проксирования

### Как запустить (локально, через Docker)
Из корня проекта:

```bash
docker compose up --build
```

После запуска:
- Frontend: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/api/docs`
- API base: `http://localhost:8080/api`

### Базовый сценарий для Postman
1. Создать пользователя: `POST /api/auth/register`
2. Получить токен: `POST /api/auth/login` (form-data: `username`, `password`)
3. Добавить Bearer token в Postman
4. Выполнить CRUD для `/api/products`

---

## 🇬🇧 English Version

### About
This repository is a training sandbox for QA engineers to practice API testing with Postman.

It includes:
- Backend API with auth and CRUD operations
- Swagger UI for contract exploration and manual testing
- Frontend app for visual validation of flows
- Nginx as a single entry point

Main goal: practice real-world API test scenarios end-to-end.

### What You Can Practice
- User registration and login
- JWT token retrieval
- Authorized requests with Bearer token
- Full product CRUD:
1. `GET /products/`
2. `POST /products/`
3. `GET /products/{id}`
4. `PUT /products/{id}`
5. `DELETE /products/{id}`
- Validation, negative testing, and error handling

### Tech Stack
- 🐍 Backend: FastAPI + SQLAlchemy + Pydantic + JWT + SQLite
- ⚛️ Frontend: React + TypeScript + Vite + Tailwind CSS + Axios
- 🌐 Infrastructure: Nginx + Docker + Docker Compose
- 🧪 QA tools: Postman + Swagger UI

### Architecture (brief)
- `backend/` — API, models, schemas, routes, DB
- `frontend/` — UI application (feature/entity/widget structure)
- `docker-compose.yaml` — service orchestration
- `nginx.local.conf` / `nginx-stage.conf` — reverse proxy configs

### Run Locally (Docker)
From the project root:

```bash
docker compose up --build
```

After startup:
- Frontend: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/api/docs`
- API base: `http://localhost:8080/api`

### Quick Postman Flow
1. Create user: `POST /api/auth/register`
2. Get token: `POST /api/auth/login` (form-data: `username`, `password`)
3. Add Bearer token in Postman
4. Execute CRUD requests for `/api/products`
