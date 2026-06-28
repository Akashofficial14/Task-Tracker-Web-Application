
# 🚀 Modern MERN Task & Profile Management System

A high-performance, full-stack application featuring **secure authentication**, **profile management**, and a dynamic **Kanban-style task dashboard**. This project implements complete **CRUD workflows** for tasks and user profiles while delivering a premium UI/UX experience using modern MERN technologies.

---

## ✨ Core Features

### 📋 Intelligent Task Management

* **Kanban Workflow** — Organize tasks across **Pending**, **In Progress**, and **Completed** columns.
* **Complete CRUD Operations** — Create, Read, Update, and Delete tasks effortlessly.
* **Real-time Updates** — Instant UI synchronization powered by TanStack Query without page refreshes.
* **Optimized Forms** — Robust task creation and editing with `react-hook-form`.
* **RESTful API** — Scalable Express backend integrated with MongoDB.

### 🔐 Advanced Authentication

* **Secure Signup & Login** — Validation-heavy authentication with protected sessions.
* **JWT & Cookie Security** — Session management using JSON Web Tokens and `cookie-parser`.
* **Password Protection** — Passwords securely hashed using `bcrypt` (10 salt rounds).
* **Email Services** — Automated welcome and verification emails powered by `nodemailer` and `EJS`.
* **Protected Routing** — Authenticated access to dashboard, tasks, and profile management.

### 👤 Profile Management (CRUD)

* **Real-time Data Sync** — Instant profile fetching and caching using `@tanstack/react-query`.
* **Profile Customization** — Update Full Name, City, Mobile Number, and other personal details.
* **Password Security** — Change password securely with current password verification.
* **Optimized Forms** — Smooth form handling using `react-hook-form`.

### 🎨 Premium UI/UX Design

* **Modern Kanban Dashboard** — Responsive three-column task management interface.
* **Glassmorphism UI** — Beautiful backdrop blurs, soft shadows, and vibrant gradients.
* **Zero-Scroll Experience** — Fixed viewport layout that feels like a native application.
* **Responsive Design** — Optimized for Mobile, Tablet, and Desktop with **Tailwind CSS 4**.
* **Instant Performance** — Fast data fetching and caching with TanStack Query.

---

## 🛠️ Tech Stack

### Frontend

| Technology           | Details                              |
| -------------------- | ------------------------------------ |
| **Framework**        | React 19 (Vite)                      |
| **Styling**          | Tailwind CSS 4 (`@tailwindcss/vite`) |
| **State Management** | TanStack Query v5                    |
| **Routing**          | React Router 7                       |
| **Forms**            | React Hook Form                      |
| **Icons**            | Lucide React                         |
| **Notifications**    | React Toastify                       |

### Backend

| Technology      | Details                    |
| --------------- | -------------------------- |
| **Server**      | Express 5                  |
| **Database**    | MongoDB & Mongoose         |
| **Security**    | JWT, Bcrypt, Cookie-Parser |
| **Email**       | Nodemailer & EJS           |
| **Development** | Nodemon, Dotenv, CORS      |

---

## 📦 Project Structure

```plaintext
├── frontend/                  # React application (Vite)
│   ├── src/
│   │   ├── apis/              # Axios services & TanStack Query hooks
│   │   ├── components/        # Reusable UI Components
│   │   ├── layouts/           # Dashboard & Profile Layouts
│   │   ├── pages/             # Authentication & Dashboard Pages
│   │   └── App.jsx            # Routing & Providers
│
├── backend/                   # Express server
│   ├── models/                # User & Task Schemas
│   ├── routes/                # Auth, Profile & Task APIs
│   ├── middleware/            # JWT Auth & Error Handling
│   ├── utils/                 # Email & Helper Functions
│   └── index.js               # Entry Point
```

---

## ⚙️ Setup & Installation

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `/backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_password

CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

---

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

## 📡 API Reference

### 🔐 Authentication

| Action   | Method | Endpoint             |
| -------- | ------ | -------------------- |
| Register | `POST` | `/api/auth/register` |
| Login    | `POST` | `/api/auth/login`    |

---

### 📋 Task Management

| Action             | Method   | Endpoint                       |
| ------------------ | -------- | ------------------------------ |
| Get All Tasks      | `GET`    | `/api/tasks/all`               |
| Create Task        | `POST`   | `/api/tasks/create`            |
| Update Task Status | `PUT`    | `/api/tasks/update-status/:id` |
| Delete Task        | `DELETE` | `/api/tasks/delete/:id`        |

---

### 👤 Profile Management

| Action          | Method | Endpoint                       |
| --------------- | ------ | ------------------------------ |
| Get Profile     | `GET`  | `/api/profile`                 |
| Update Profile  | `PUT`  | `/api/profile/update`          |
| Change Password | `PUT`  | `/api/profile/change-password` |

---

## 🚀 Highlights

* ✅ React 19 + Vite
* ✅ Express 5
* ✅ MongoDB & Mongoose
* ✅ JWT Authentication
* ✅ Secure Cookie Sessions
* ✅ Bcrypt Password Encryption
* ✅ Nodemailer Email Integration
* ✅ TanStack Query v5
* ✅ React Hook Form
* ✅ Kanban Task Management
* ✅ Full CRUD Operations
* ✅ Profile Management
* ✅ Responsive Glassmorphism UI
* ✅ Zero-Refresh Real-time Updates

---

## 📄 License

This project is licensed under the **MIT License**.

Created as a **Full-Stack MERN Task & Profile Management System** showcasing modern web development practices, scalable architecture, secure authentication, and a responsive user experience.
