# API Documentation (Version 1.0)

## Objective

This document defines all API endpoints used by the E-Rakshak Maverick platform. It serves as the communication contract between the frontend, backend, AI services, and the database.

Each API endpoint specifies its purpose, request structure, response format, authentication requirements, HTTP methods, status codes, and error handling. Defining the APIs before development ensures consistency across the system, minimizes integration issues, and enables parallel frontend and backend development.

---

## Scope

The API documentation covers:

- User Authentication
- Scam Analysis
- File Upload
- AI Analysis Results
- Report Generation
- User History
- User Settings
- Error Responses

---

## API Categories

1. Authentication APIs
2. Analysis APIs
3. Report APIs
4. Settings APIs
5. System APIs

---

# API List (Version 1.0)

## Authentication APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/google` | Authenticate user using Google OAuth |
| POST | `/auth/logout` | Logout the current user |

---

## Analysis APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/analysis` | Create a new scam analysis request |
| GET | `/analysis/history` | Retrieve all previous analyses |
| GET | `/analysis/{analysis_id}` | Retrieve a specific analysis |

---

## Report APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/analysis/{analysis_id}/report` | Retrieve the generated report |
| GET | `/analysis/{analysis_id}/report/download` | Download the report as PDF |

---

## Settings APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/settings` | Retrieve user settings |
| PATCH | `/settings` | Update user settings |

---

## System APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Check API health status |


# Architecture And Inside Work Of Every API.

## API 1 - Google Authentication

### Endpoint

**POST** `/auth/google`

---

### Purpose

Authenticates a user using Google OAuth. If the user logs in for the first time, a new account is created. Otherwise, the existing account is used and the user is logged into the platform.

---

### Authentication Required

❌ No

---

### Request Body

```json
{
  "google_token": "string"
}
```

---

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "user_id": "uuid",
    "display_name": "Bhoomi Maheshwari",
    "email": "user@example.com",
    "profile_picture": "https://..."
  },
  "access_token": "jwt_token"
}
```

---

### Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "message": "Google token is required."
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid Google token."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Authentication failed."
}
```

---

### Database Tables Used

- Users
- Settings *(Create default settings for new users only.)*

---

### External Services

- Google OAuth
- Supabase Authentication

---

### API Flow

```text
User
   │
   ▼
Google Login
   │
   ▼
Frontend
   │
   ▼
POST /auth/google
   │
   ▼
Backend
   │
   ▼
Verify Google Token
   │
   ▼
Check Users Table
   │
 ┌─Yes──────────────┐
 │ Existing User    │
 └──────────────────┘
        │
        ▼
Return JWT Token
        │
        ▼
Frontend Dashboard

OR

 ┌─No───────────────┐
 │ New User         │
 └──────────────────┘
        │
        ▼
Create User
        │
        ▼
Create Default Settings
        │
        ▼
Return JWT Token
        │
        ▼
Frontend Dashboard
```

---

### Status

🟢 Frozen (Version 1.0)

**Status:** 🟡 In Progress