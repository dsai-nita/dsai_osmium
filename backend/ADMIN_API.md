# DSAI Club - Admin Dashboard API Integration

## ✅ Implemented Backend Endpoints

### User Management API
**Base URL:** `/api/users`

| Method | Endpoint | Protection | Description |
|--------|----------|-----------|-------------|
| GET | `/users` | Admin/President | List all users with filters (role, isVerified, pagination) |
| GET | `/users/:id` | Admin/President | Get specific user details |
| PUT | `/users/:id` | Admin/President | Update user information |
| DELETE | `/users/:id` | Admin/President | Delete a user |
| POST | `/users/:id/verify` | Admin/President | Verify a user account |
| GET | `/users/leaderboard` | Public | Get top users by points |

### Admin Events API
**Base URL:** `/api/admin`

| Method | Endpoint | Protection | Description |
|--------|----------|-----------|-------------|
| GET | `/admin/events` | Admin/President | List all events |
| POST | `/admin/events` | Admin/President | Create new event with cover & photos |
| PUT | `/admin/events/:id` | Admin/President | Update event details |
| DELETE | `/admin/events/:id` | Admin/President | Delete event |

### Admin Projects API
| Method | Endpoint | Protection | Description |
|--------|----------|-----------|-------------|
| GET | `/admin/projects` | Admin/President | List all projects |
| POST | `/admin/projects` | Admin/President | Create new project with cover image |
| PUT | `/admin/projects/:id` | Admin/President | Update project |
| DELETE | `/admin/projects/:id` | Admin/President | Delete project |

### Admin Gallery API
| Method | Endpoint | Protection | Description |
|--------|----------|-----------|-------------|
| GET | `/admin/gallery` | Admin/President | List all gallery items |
| POST | `/admin/gallery` | Admin/President | Create new gallery entry with photos (up to 20) |
| PUT | `/admin/gallery/:id` | Admin/President | Update gallery item |
| DELETE | `/admin/gallery/:id` | Admin/President | Delete gallery item |

## 🔐 Role-Based Access Control

### Admin Dashboard Access Levels:

**1. President / Admin**
- ✅ View Statistics
- ✅ Manage Users (Create, Read, Update, Delete)
- ✅ Verify Users
- ✅ Manage Events (Create, Read, Update, Delete)
- ✅ Manage Projects (Create, Read, Update, Delete)
- ✅ Manage Gallery (Create, Read, Update, Delete)

**2. General Secretary**
- ✅ View Statistics
- ✅ Cannot Manage Users (No create, update, delete)
- ✅ Verify Users
- ✅ Manage Events (Create, Read, Update, Delete)
- ✅ Manage Projects (Create, Read, Update, Delete)
- ✅ Manage Gallery (Create, Read, Update, Delete)

**3. Assistant General Secretary**
- Same permissions as General Secretary

## 📋 Request/Response Format

All API responses follow this standard format:

```json
{
  "success": true/false,
  "message": "descriptive message",
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## 📝 Example Requests

### List All Users
```bash
GET /api/users?role=admin&isVerified=true&page=1&limit=20
Authorization: Bearer <token>
```

### Verify a User
```bash
POST /api/users/:id/verify
Authorization: Bearer <token>
Content-Type: application/json
```

### Update User
```bash
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "isVerified": true,
  "points": 100
}
```

### Create Event (with file upload)
```bash
POST /api/admin/events
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "AI Workshop",
  "description": "Learn AI basics",
  "category": "workshop",
  "date": "2026-09-15",
  "coverImage": <file>,
  "photos[]": [<file1>, <file2>]
}
```

## 🔄 Middleware Stack

1. **Authentication Middleware (`protect`)**
   - Verifies JWT token from cookie or Authorization header
   - Loads user from database
   - Checks if user is active
   - Attaches `req.user` to request

2. **Admin Authorization Middleware (`adminOnly`)**
   - Requires user role to be "admin" or "president"
   - Returns 403 Forbidden if unauthorized

3. **Upload Middleware**
   - Handles multipart/form-data
   - Processes images and uploads to Cloudinary
   - Returns file URLs and public IDs

4. **Validation Middleware**
   - Validates request body against defined rules
   - Returns validation errors if any

## 📂 File Structure

```
dsai/
├── controllers/
│   └── userController.js      # User CRUD + admin operations
├── routes/
│   ├── userRoutes.js          # User routes with auth
│   ├── adminRoutes.js         # Admin-only routes (NEW)
│   └── ...                    # Existing routes
├── middleware/
│   ├── authMiddleware.js      # JWT verification
│   ├── adminMiddleware.js     # Role-based authorization (UPDATED)
│   └── ...
└── app.js                      # Express app with route mounting (UPDATED)
```

## 🚀 Frontend Integration

The frontend AdminDashboard uses these API endpoints:

```typescript
// User Management
usersApi.listAll()              // GET /api/users
usersApi.getById(id)            // GET /api/users/:id
usersApi.updateById(id, data)   // PUT /api/users/:id
usersApi.deleteById(id)         // DELETE /api/users/:id
usersApi.verifyUser(id)         // POST /api/users/:id/verify

// Events Management
adminEventsApi.list()           // GET /api/admin/events
adminEventsApi.create(data)     // POST /api/admin/events
adminEventsApi.update(id, data) // PUT /api/admin/events/:id
adminEventsApi.delete(id)       // DELETE /api/admin/events/:id

// Projects Management
adminProjectsApi.list()         // GET /api/admin/projects
adminProjectsApi.create(data)   // POST /api/admin/projects
adminProjectsApi.update(id, data) // PUT /api/admin/projects/:id
adminProjectsApi.delete(id)     // DELETE /api/admin/projects/:id

// Gallery Management
adminGalleryApi.list()          // GET /api/admin/gallery
adminGalleryApi.create(data)    // POST /api/admin/gallery
adminGalleryApi.update(id, data) // PUT /api/admin/gallery/:id
adminGalleryApi.delete(id)      // DELETE /api/admin/gallery/:id
```

## ⚙️ Testing the API

```bash
# Start the backend
cd dsai
npm run dev

# The API will be available at http://localhost:5000

# Create an admin user (if not already done)
npm run seed

# Login to get JWT token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dsaiclub.com","password":"Admin@12345"}'

# Test user listing
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer <your_token>"
```

## 🔍 Notes

- All admin endpoints require `Authorization` header with valid JWT
- Roles are normalized (spaces removed, lowercase) for comparison
- Image uploads are handled via Cloudinary with automatic deletion on record delete
- Pagination defaults to page 1, limit 20
- All timestamps are stored in UTC
- User passwords are never returned in API responses
