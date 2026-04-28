# 📝 Quiz Builder Application

## 📌 Project Overview

**Quiz Builder** — це full-stack веб-додаток для створення та управління кастомними тестами (quizzes).
Проєкт реалізований як технічне завдання для позиції **Full-Stack JavaScript Engineer**.

Додаток дозволяє створювати динамічні тести з різними типами питань, проходити їх у інтерактивному режимі та керувати збереженими квізами.

---

## 🚀 Key Features

### 🧩 Dynamic Quiz Constructor

* Створення квізів з **необмеженою кількістю питань**
* Гнучка структура для різних типів питань
* Динамічне додавання та редагування

---

### ❓ Supported Question Types

* **BOOLEAN**

    * Класичний вибір True / False

* **INPUT**

    * Коротка текстова відповідь (ручна перевірка)

* **CHECKBOX**

    * Множинний вибір
    * Можливість декількох правильних відповідей

---

### ✅ Smart Validation

* Перевірка всіх полів перед відправкою
* Кожне питання повинно містити:

    * заголовок
    * хоча б одну правильну відповідь

---

### 🔄 Dual-View Detail Page

* **Structure Mode (ТЗ)**

    * Read-only перегляд структури квізу

* **Solve Mode (Bonus)**

    * Інтерактивне проходження тесту
    * Підрахунок результатів

---

### 🎨 Modern UI

* Темна тема (Dark Mode)
* Повністю адаптивний дизайн
* Побудовано з використанням **Tailwind CSS**

---

## 🛠 Tech Stack

### 🎨 Frontend

* **Next.js 14** (Pages Router)
* **TypeScript**
* **Tailwind CSS**
* **Axios**

---

### ⚙️ Backend

* **Node.js & Express**
* **TypeScript**
* **Prisma ORM**
* **SQLite**

📌 Архітектура:

* Service Layer
* Repository Pattern

---

## 🏗 Project Structure

```text
quiz-builder/
├── backend/
│   ├── prisma/             # Database schema + SQLite (dev.db)
│   ├── src/
│   │   ├── quizzes/        # Controller, Service, Repository, Router
│   │   ├── middleware/     # Error handling & logging
│   │   ├── validator/      # Quiz validation logic
│   │   ├── interfaces/     # TypeScript interfaces
│   │   └── index.ts        # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI Components (QuizCard, QuestionField)
│   │   ├── pages/          # Next.js pages (create, quizzes, results)
│   │   ├── services/       # API layer (Axios)
│   │   └── types/          # Shared types
│
└── README.md
```

---

## 🚀 Setup & Installation

### 🔧 1. Backend Setup

Перейди в папку backend:

```bash
cd backend
```

Встанови залежності:

```bash
npm install
```

Створи `.env` файл:

```env
DATABASE_URL="file:./dev.db"
PORT=3002
```

Ініціалізуй базу даних:

```bash
npx prisma migrate dev --name init
```

Запусти сервер:

```bash
npm run dev
```

---

### 🎨 2. Frontend Setup

Перейди в папку frontend:

```bash
cd frontend
```

Встанови залежності:

```bash
npm install
```

Створи `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

Запусти додаток:

```bash
npm run dev
```

📍 Додаток буде доступний:

```
http://localhost:3000
```

---

## 📖 Usage Guide

### 🧪 Creating a Quiz

1. Перейди на сторінку **Create Quiz**
2. Введи назву (наприклад: *Full-Stack Development Basics*)
3. Натисни **+ Add Question**

---

### 📌 Examples

#### CHECKBOX

* Введи: `React, Vue, Node.js, HTML`
* Познач правильні: `React`, `Vue`

#### BOOLEAN

* Питання:
  *Is JavaScript single-threaded?*
* Відповідь: **True**

---

### 📊 Management

* **Quiz List**

    * Відображає всі квізи
    * Показує кількість питань

* **Delete**

    * Наведи на картку
    * Натисни 🗑

* **Detailed View**

    * Перегляд структури
    * Перехід у Solve Mode

---

## ✅ Compliance Checklist

* ✅ API Endpoints:

    * POST
    * GET
    * DELETE

* ✅ Архітектура:

    * Service Layer
    * Repository Pattern

* ✅ Валідація:

    * Client-side
    * Server-side

* ✅ Стилізація:

    * Responsive дизайн
    * Tailwind CSS
    * ESLint + Prettier

---

## 📌 Final Notes

Проєкт демонструє:

* чисту архітектуру
* розділення відповідальностей
* сучасний стек технологій

🚀 Готовий до масштабування та подальшого розвитку
