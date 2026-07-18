Backend Architecture Of Model 

# Backend Project Initialization

## Objective

Initialize the backend environment for the E-Rakshak application using Node.js and Express.js.

## Completed Tasks

- Initialized Node.js project using `npm init -y`
- Installed required backend dependencies
- Installed Nodemon for development
- Configured project structure
- Added environment configuration files
- Configured `.gitignore`
- Created Express application (`app.js`)
- Created server entry point (`server.js`)
- Added basic health endpoint (`GET /`)
- Successfully started local development server on port 3000

## Installed Packages

### Production Dependencies

- express
- cors
- dotenv
- @supabase/supabase-js
- google-auth-library
- multer
- uuid
- helmet
- morgan

### Development Dependency

- nodemon

## Project Structure

backend/
└── src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
│ ├── ai/
│ ├── auth/
│ ├── storage/
│ └── notifications/
├── utils/
├── app.js
└── server.js

## Current Status

✅ Backend server successfully running on:

http://localhost:3000

Response:

```json
{
  "message": "Welcome to E-Rakshak Backend API 🚀"
}
```

The backend environment is now ready for Supabase integration and API development.


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



## Google Authentication Service

### File

backend/src/services/auth/googleAuthService.js

### Responsibilities

- Verify Google ID Tokens using Google's official OAuth2 library.
- Extract authenticated user information.
- Return verified user details to the Authentication Controller.
- Reject invalid or forged tokens.

### Security

Every authentication request is verified directly with Google's servers to prevent fake or modified login requests.
