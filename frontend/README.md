# Frontend: QA Sandbox UI

## 🇷🇺 Русская версия

### Назначение фронтенда
Этот фронтенд нужен для визуальной отработки QA-сценариев вместе с API.
Он дополняет Postman-практику: можно проверить, как API-операции отображаются в интерфейсе (логин, список товаров, создание, редактирование, удаление).

Полное описание всего проекта: [../README.md](../README.md)

### Технологии
- ⚛️ React 19
- 🔷 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 Axios
- 🧩 Lucide React (иконки)

### Структура фронтенда (кратко)
- `src/app` — корневое приложение
- `src/pages` — страницы
- `src/widgets` — крупные UI-блоки
- `src/features` — пользовательские сценарии
- `src/entities` — предметные сущности
- `src/shared` — переиспользуемые компоненты, стили и утилиты

### Локальный запуск
Из папки `frontend`:

```bash
npm install
npm run dev
```

Доступ:
- Dev UI: `http://localhost:5173` (по умолчанию Vite)
- Через docker+nginx: `http://localhost:8080`

### Сборка и предпросмотр
```bash
npm run build
npm run preview
```

---

## 🇬🇧 English Version

### Frontend Purpose
This frontend provides a visual layer for QA practice alongside API testing in Postman.
It helps validate how API behavior appears in UI flows (login, product list, create, update, delete).

Full project overview: [../README.md](../README.md)

### Tech Stack
- ⚛️ React 19
- 🔷 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 Axios
- 🧩 Lucide React (icons)

### Frontend Structure (brief)
- `src/app` — application root
- `src/pages` — pages
- `src/widgets` — larger UI blocks
- `src/features` — user scenarios
- `src/entities` — domain entities
- `src/shared` — reusable UI, styles, and utilities

### Run Locally
From the `frontend` folder:

```bash
npm install
npm run dev
```

Access:
- Dev UI: `http://localhost:5173` (default Vite port)
- Via docker+nginx: `http://localhost:8080`

### Build and Preview
```bash
npm run build
npm run preview
```
