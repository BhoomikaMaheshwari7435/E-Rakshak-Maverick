## Authentication Controller

### File

backend/src/controllers/authController.js

### Responsibilities

- Receives authentication requests from authentication routes.
- Extracts the Google ID Token from the request body.
- Validates required request data.
- Calls the Google Authentication Service.
- Returns HTTP responses to the client.
- Handles unexpected server errors.

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Authentication successful |
| 400 | Missing or invalid Google ID Token |
| 500 | Internal server error |

### Architecture Flow

Frontend
↓
Authentication Route
↓
Authentication Controller
↓
Google Authentication Service
↓
Supabase Database
