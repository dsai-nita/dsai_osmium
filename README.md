# 🧠 DSAI Osmium

### DSAI Club Management & Community Platform

**DSAI Osmium** is a full-stack management and community platform built for the **DSAI Club**. It provides a centralized ecosystem for managing members, events, projects, quizzes, galleries, developers, founders, authentication, and administrative operations.

The repository contains a **React + TypeScript frontend**, a **Node.js + Express + MongoDB backend**, and an independent **Go/Gin API service** under `apps/api`.

---

## 🚀 Tech Stack

<p align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
<img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" />
<img src="https://img.shields.io/badge/Gin-008ECF?style=for-the-badge&logo=go&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/REST_API-02569B?style=for-the-badge&logo=fastapi&logoColor=white" />
<img src="https://img.shields.io/badge/Git-GF05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />

</p>

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* HTTP-only JWT authentication
* Bearer token support for non-browser clients
* Secure logout
* Current-user session management
* Role-based authorization
* Admin-protected operations

### 📅 Events Management

* Create and manage club events
* Event cover image uploads
* Featured events
* Upcoming and past event organization
* Event filtering and discovery

### 💡 Projects & Innovations

* Showcase DSAI Club projects
* Project descriptions and metadata
* Featured project support
* Innovation/project management

### 👥 Members — DSAI Squad

* Member profiles
* Public member directory
* Profile information
* Role-based member management
* Public leaderboard support

### 🧠 Quizzes & Leaderboard

* Create and publish quizzes
* Quiz submissions
* Score tracking
* Public leaderboard

### 🖼️ Gallery

* Gallery management
* Multiple photos per gallery entry
* Category-based filtering
* Cloudinary-powered image storage

### 👨‍💻 Developers & Contributors

* Developer profiles
* Contributor information
* Club development team showcase

### 🏛️ Founders

* Founder profiles
* Founder information management

### ☁️ Media Management

Images are uploaded using **Multer** and stored on **Cloudinary**, keeping media storage separate from the application server.

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      DSAI Osmium     │
                    │   Club Platform      │
                    └──────────┬───────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
    ┌───────────────────┐             ┌───────────────────┐
    │ React Frontend    │             │   Go API Service  │
    │ Vite + TypeScript │             │     Gin + Go      │
    └─────────┬─────────┘             └───────────────────┘
              │
              │ REST API
              ▼
    ┌───────────────────┐
    │ Node.js Backend   │
    │ Express.js        │
    └─────────┬─────────┘
              │
       ┌──────┴───────┐
       │              │
       ▼              ▼
┌─────────────┐  ┌──────────────┐
│  MongoDB    │  │  Cloudinary  │
│  Database   │  │    Media     │
└─────────────┘  └──────────────┘
```

### Current Application Flow

```text
React Frontend
      │
      │ HTTP / REST
      ▼
Node.js + Express
      │
      ├── Authentication
      ├── Events
      ├── Projects
      ├── Members
      ├── Quizzes
      ├── Gallery
      ├── Developers
      └── Founders
      │
      ├──────────────► MongoDB
      │
      └──────────────► Cloudinary
```

> **Note:** `apps/api` is an independent Go/Gin service and is not required to run the current React frontend.

---

# 📁 Repository Structure

```text
dsai-osmium/
│
├── apps/
│   │
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── Context/
│   │   │   ├── lib/
│   │   │   ├── styles/
│   │   │   ├── utility/
│   │   │   ├── App.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   │
│   ├── api/
│   │   ├── cmd/
│   │   ├── config/
│   │   ├── handlers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── go.mod
│   │
│   └── mobile/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── package.json
├── Contributing.md
└── README.md
```

---

# ⚙️ Prerequisites

Before running the project locally, make sure you have:

* **Node.js 18+**
* **npm**
* **MongoDB**
* **Go 1.25.4+** *(only if working with `apps/api`)*
* **Cloudinary account**
* **Resend account/API key** for email-related functionality

---

# 🖥️ Frontend Setup

The main web application is located at:

```text
apps/frontend
```

### 1. Navigate to frontend

```bash
cd apps/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
apps/frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

### Frontend Commands

```bash
npm run dev
npm run build
npm run lint
```

---

# 🛠️ Backend Setup

The Node.js backend is located outside the `apps` directory:

```text
backend/
```

### 1. Navigate to backend

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env
```

Configure the required variables:

```env
PORT=5000

MONGO_URI=<your-mongodb-connection-string>

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d

NODE_ENV=development

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

COOKIE_EXPIRES_DAYS=7

RESEND_API_KEY=<your-resend-api-key>
```

### 4. Start development server

```bash
npm run dev
```

### Production

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

Health check:

```text
GET /
```

---

# 👤 Seed Admin Account

To create an initial admin account, configure the following variables in `backend/.env`:

```env
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
ADMIN_NAME=<admin-name>
```

Then run:

```bash
npm run seed
```

> ⚠️ Never commit `.env` files, passwords, API keys, JWT secrets, or other credentials.

---

# 🔌 Backend API

All REST endpoints are mounted under:

```text
/api
```

| Route             | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `/api/auth`       | Registration, login, logout, current user |
| `/api/events`     | Events and event uploads                  |
| `/api/projects`   | Projects and innovations                  |
| `/api/members`    | DSAI squad/member records                 |
| `/api/quizzes`    | Published quizzes and submissions         |
| `/api/users`      | Profiles and public leaderboard           |
| `/api/gallery`    | Gallery entries and photos                |
| `/api/developers` | Developers and contributors               |
| `/api/founders`   | Founder management                        |

---

# 🔐 Authentication

DSAI Osmium uses **JWT-based authentication**.

### Browser Clients

Authentication is primarily handled through an:

```text
HTTP-only JWT cookie
```

### Non-browser Clients

The backend also supports:

```http
Authorization: Bearer <token>
```

This allows external clients and services to authenticate without relying on browser cookies.

---

# 🖼️ Image Uploads

Image uploads use:

```text
Frontend
   │
   ▼
Multer
   │
   ▼
Node.js Backend
   │
   ▼
Cloudinary
   │
   ▼
Image URL
```

Cloudinary is used for:

* Event images
* Gallery photos
* Profile images
* Other platform media

---

# 🏃 Running the Complete Application

From the repository root, open **two terminals**.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Make sure the frontend API URL and backend `CLIENT_URL` are configured consistently:

```env
# Frontend
VITE_API_URL=http://localhost:5000/api

# Backend
CLIENT_URL=http://localhost:5173
```

This is especially important because authentication relies on credentialed requests and HTTP-only cookies.

---

# 🐹 Go API

The Go application is maintained as a **separate service**.

Location:

```text
apps/api
```

### Install dependencies

```bash
cd apps/api
go mod download
```

### Run the service

```bash
go run ./cmd
```

The Go API has its own:

* Configuration
* Routes
* Handlers
* Models
* Services
* Dependencies

It is **not required** for the current React + Node application.

---

# 🧹 Development Guidelines

### Frontend

Keep frontend API communication inside:

```text
apps/frontend/src/lib/
```

Use the shared request client and API adapters instead of duplicating request logic across components.

### Backend

Keep:

```text
controllers/
```

for resource business logic.

Keep:

```text
routes/
```

for REST route definitions and middleware wiring.

### General Rules

* Do not commit `.env` files
* Do not commit API keys or credentials
* Do not commit `node_modules`
* Do not commit generated build output
* Keep API logic separated from UI components
* Reuse existing utilities and shared request clients
* Follow the existing project structure when adding new features

---

# 📦 Important Files

| File                           | Description                            |
| ------------------------------ | -------------------------------------- |
| `apps/frontend/package.json`   | Frontend dependencies and scripts      |
| `apps/frontend/vite.config.ts` | Vite configuration                     |
| `backend/package.json`         | Backend dependencies and scripts       |
| `backend/app.js`               | Express application and route mounting |
| `backend/server.js`            | Server startup and database connection |
| `backend/.env.example`         | Backend environment template           |
| `apps/api/go.mod`              | Go API dependencies                    |
| `Contributing.md`              | Contribution guidelines                |

---

# 🔒 Environment & Security

The following files must **never** be committed:

```text
.env
.env.local
.env.production
node_modules/
dist/
```

Use `.env.example` files to document required environment variables without exposing real secrets.

---

# 🤝 Contributing

Contributions are welcome.

Before contributing:

1. Create a new branch.
2. Make your changes.
3. Test the frontend and backend.
4. Run lint/build checks.
5. Commit your changes with a meaningful message.
6. Open a Pull Request.

Example:

```bash
git checkout -b feature/new-feature

git add .

git commit -m "feat: add new feature"

git push origin feature/new-feature
```

Then open a Pull Request against the appropriate branch.

For more details, see:

```text
Contributing.md
```

---

# 📌 Project Status

DSAI Osmium is actively developed as the **DSAI Club's management and community platform**.

The current production architecture primarily uses:

```text
React + TypeScript
        ↓
Node.js + Express
        ↓
MongoDB
        +
Cloudinary
```

The Go/Gin service under `apps/api` is maintained independently for future/current service requirements.

---

## ⭐ Support

If you find the project useful, consider giving the repository a ⭐ on GitHub.

Built with ❤️ for the **DSAI Club**.
