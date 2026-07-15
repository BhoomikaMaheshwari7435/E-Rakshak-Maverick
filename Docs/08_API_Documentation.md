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

The APIs are grouped based on their functionality to maintain a clean and scalable backend architecture.

1. Authentication APIs
2. Analysis APIs
3. File APIs
4. Report APIs
5. Settings APIs
6. System APIs

## API List (Version 1.0)

### Authentication APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/google` | Authenticate user using Google OAuth |
| POST | `/auth/logout` | Logout the current user |

---

### Analysis APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/analysis` | Create a new scam analysis request |
| GET | `/analysis/history` | Retrieve all previous analyses |
| GET | `/analysis/{analysis_id}` | Retrieve a specific analysis |

---

### File APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/upload` | Upload an image, audio, or document |

---

### Report APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/reports/{report_id}` | Retrieve a generated report |
| GET | `/reports/{report_id}/download` | Download report as PDF |

---

### Settings APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/settings` | Retrieve user settings |
| PATCH | `/settings` | Update user settings |

---

### System APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Check API health status |




**Status:** 🟡 In Progress