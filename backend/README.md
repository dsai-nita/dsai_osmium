# DSAI Club — Backend API

Node.js + Express + MongoDB backend for the DSAI Club Management & Community Platform.
Covers Auth, Events, Projects/Innovations, Members (DSAI Squad), Quizzes + Leaderboard,
Gallery, Developers & Contributors, and Founders — with Cloudinary-backed image uploads.

## 1. Setup

```bash
cd dsai-backend
npm install
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, CLOUDINARY_* etc.
npm run dev             # nodemon, http://localhost:5000
```

Create your first admin account:

```bash
npm run seed
```

This reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` from `.env` (falls back to
`admin@dsaiclub.com` / `Admin@12345` if unset). Log in with those credentials, then
change the password.

## 2. Folder structure

```
config/       MongoDB connection
models/       Mongoose schemas (User, Event, Project, Member, Quiz, QuizAttempt,
              Gallery, Developer, Founder)
controllers/  Business logic per resource
routes/       Express routers, wired to middleware + controllers
middleware/   auth, admin, upload (multer), validation, centralized error handler
utils/        JWT helpers, Cloudinary helpers, ApiError/asyncHandler, seed script
app.js        Express app (middleware + route mounting)
server.js     Entry point (loads env, connects DB, starts server)
```

## 3. Auth flow

- `POST /api/auth/register` and `POST /api/auth/login` set an **HTTP-only JWT cookie**
  (`token`). The same JWT is also accepted via `Authorization: Bearer <token>` for
  non-browser clients.
- `protect` middleware verifies the JWT and loads `req.user`.
- `adminOnly` middleware (runs after `protect`) restricts a route to `role === "admin"`.

## 4. API reference

All responses follow:

```json
{ "success": true, "message": "...", "data": {} }
{ "success": false, "message": "...", "errors": [] }
```

### Auth
| Method | Route | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/logout | Private |
| GET | /api/auth/me | Private |
| PATCH | /api/auth/me | Private |

### Events
| Method | Route | Access |
|---|---|---|
| GET | /api/events?category=&year=&page=&limit= | Public |
| GET | /api/events/:id | Public |
| POST | /api/events (multipart: coverImage, photos[]) | Admin |
| PUT | /api/events/:id | Admin |
| DELETE | /api/events/:id | Admin |

### Projects
| Method | Route | Access |
|---|---|---|
| GET | /api/projects?year=&tech=&category=&page=&limit= | Public |
| GET | /api/projects/:id | Public |
| POST | /api/projects (multipart: coverImage) | Admin |
| PUT | /api/projects/:id | Admin |
| DELETE | /api/projects/:id | Admin |

### Members
| Method | Route | Access |
|---|---|---|
| GET | /api/members?current=&branch=&page=&limit= | Public |
| GET | /api/members/:id | Public |
| POST | /api/members (multipart: image) | Admin |
| PUT | /api/members/:id | Admin |
| DELETE | /api/members/:id | Admin |

### Quizzes
| Method | Route | Access |
|---|---|---|
| GET | /api/quizzes?category=&difficulty=&page=&limit= | Public (published only) |
| GET | /api/quizzes/:id | Public (answers hidden) |
| POST | /api/quizzes | Admin |
| PUT | /api/quizzes/:id | Admin |
| DELETE | /api/quizzes/:id | Admin |
| POST | /api/quizzes/:id/submit | Private (User) |
| GET | /api/users/leaderboard?limit= | Public |

Submit body:
```json
{ "answers": [{ "questionId": "...", "selectedOption": 1 }], "timeTaken": 120 }
```
Scoring, `QuizAttempt` record, and `User.points` update all happen server-side.

### Gallery
| Method | Route | Access |
|---|---|---|
| GET | /api/gallery?category=&page=&limit= | Public |
| GET | /api/gallery/:id | Public |
| POST | /api/gallery (multipart: photos[], up to 20) | Admin |
| PUT | /api/gallery/:id | Admin |
| DELETE | /api/gallery/:id | Admin |

### Developers
| Method | Route | Access |
|---|---|---|
| GET | /api/developers?type=core\|contributor | Public |
| GET/POST/PUT/DELETE | /api/developers/:id | Public / Admin |

### Founders
| Method | Route | Access |
|---|---|---|
| GET | /api/founders | Public (sorted by `order`) |
| GET/POST/PUT/DELETE | /api/founders/:id | Public / Admin |

## 5. Image uploads

Images never touch MongoDB directly. Flow: `multipart/form-data` → Multer (in-memory
buffer) → Cloudinary → `{ url, publicId }` stored on the document. Deleting a document
also deletes its Cloudinary assets.

## 6. Notes

- `runValidators: true` is applied on every `save()`/update path so Mongoose validation
  (required, enum, min/max, match, etc.) is enforced on updates too, not just creates.
- Rate limiting (`express-rate-limit`) is applied globally under `/api`.
- Centralized error handling normalizes Mongoose `CastError`, `ValidationError`,
  duplicate-key (`11000`), JWT errors, and Multer errors into the standard error shape.
