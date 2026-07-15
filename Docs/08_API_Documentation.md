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
  "id_token": "string"
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


## API 2 - User Logout

### Endpoint

**POST** `/auth/logout`

---

### Purpose

Logs out the currently authenticated user by invalidating the active session on the client and removing authentication credentials.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Request Body

```json
{}
```

---

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Logout successful."
}
```

---

### Error Responses

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Logout failed."
}
```
---
### Database Tables Used
- None
---
### External Services
- Supabase Authentication
---
### API Flow

```text
User
   │
   ▼
Click Logout
   │
   ▼
Frontend
   │
   ▼
POST /auth/logout
   │
   ▼
Backend
   │
   ▼
Validate JWT Token
   │
   ▼
Clear Authentication
   │
   ▼
Return Success
   │
   ▼
Redirect to Login Page
```
---
### Status
🟢 Frozen (Version 1.0)

## API 3 - Create Scam Analysis

### Endpoint

**POST** `/analysis`

---

### Purpose

Creates a new scam analysis request by accepting user input such as an SMS, WhatsApp message, QR code image, screenshot, document, or audio recording. The backend processes the content using AI, stores the analysis, and returns the final analysis result.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Request Body

```json
{
  "analysis_type": "SMS | WHATSAPP | AUDIO | IMAGE | QR | DOCUMENT",
  "response_language": "Gujarati | Hindi | English",
  "input_text": "string",
  "file": "binary"
}
```

**Notes:**

- `analysis_type` specifies the type of content to analyze.
- `response_language` specifies the language in which the AI should return the explanation and voice output.
- `input_text` is required for SMS and WhatsApp analysis.
- `file` is required for Audio, Image, QR, and Document analysis.
- Only one type of input is expected per request.

---

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Analysis completed successfully.",
  "analysis_id": "uuid",
  "ai_result": {
    "risk_score": 92,
    "danger_level": "DANGER",
    "scam_category": "Phishing",
    "detailed_analysis": "The message attempts to impersonate a trusted bank and creates urgency to steal sensitive information.",
    "explanation": "This message contains a suspicious link and requests confidential information such as your OTP.",
    "safe_next_steps": [
      "Do not click the link.",
      "Do not share your OTP.",
      "Contact your bank using the official customer care number."
    ],
    "detected_indicators": [
      "Suspicious URL",
      "Requests OTP",
      "Creates Urgency",
      "Fake Bank Name"
    ],
    "response_language": "Gujarati"
  }
}
```

---

### Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid or incomplete request."
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 413 Payload Too Large

```json
{
  "success": false,
  "message": "Uploaded file exceeds the maximum allowed size."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Analysis failed. Please try again."
}
```

---

### Database Tables Used

- Analysis_History
- Files *(Only when a file is uploaded.)*
- AI_Results

---
### External Services
- OpenAI API
- OCR Service *(Image / QR / Document Analysis)*
- Speech-to-Text Service *(Audio Transcription)*
---

### API Flow

```text
User
   │
   ▼
Select Analysis Type
   │
   ▼
Choose Response Language
   │
   ▼
Enter Text / Upload File
   │
   ▼
POST /analysis
   │
   ▼
Backend Validation
   │
   ▼
Save Analysis_History
   │
   ▼
Store File (If Uploaded)
   │
   ▼
Extract Text (OCR / Speech-to-Text)
   │
   ▼
AI Scam Analysis
   │
   ▼
Save AI_Results
   │
   ▼
Return Final Result
   │
   ▼
Display Result & Voice Explanation
```
---
### Status
🟢 Frozen (Version 1.0)

## API 4 - Get Analysis History

### Endpoint

**GET** `/analysis/history?page=1&limit=10`

---

### Purpose

Retrieves the complete analysis history of the authenticated user. The API returns a list of all previous scam analyses along with summary information, allowing users to review their past analysis records.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | Integer | No | Page number (Default: 1) |
| limit | Integer | No | Number of records per page (Default: 10) |

---

### Success Response (200 OK)

```json
{
  "success": true,
  "history": [
    {
      "analysis_id": "uuid",
      "analysis_type": "SMS",
      "risk_score": 92,
      "danger_level": "DANGER",
      "scam_category": "Phishing",
      "created_at": "2026-07-15T10:30:00Z"
    },
    {
      "analysis_id": "uuid",
      "analysis_type": "QR",
      "risk_score": 18,
      "danger_level": "SAFE",
      "scam_category": "Safe QR",
      "created_at": "2026-07-14T08:10:00Z"
    }
  ]
}
```

---

### Error Responses

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to retrieve analysis history."
}
```
---
### Database Tables Used
- Analysis_History
- AI_Results
---
### External Services
- None
---
### API Flow
```text
User
   │
   ▼
Open History Page
   │
   ▼
GET /analysis/history
   │
   ▼
Validate User
   │
   ▼
Fetch Analysis_History
   │
   ▼
Fetch AI_Results
   │
   ▼
Merge Summary Data
   │
   ▼
Return History List
   │
   ▼
Display History
```
---
### Status
🟢 Frozen (Version 1.0)

## API 5 - Get Analysis Details

### Endpoint

**GET** `/analysis/{analysis_id}`

---

### Purpose

Retrieves the complete details of a specific scam analysis, including the original input, uploaded file (if available), AI results, explanation, detected indicators, and recommended safe next steps.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| analysis_id | UUID | Yes | Unique ID of the analysis record |

---

### Success Response (200 OK)

```json
{
  "success": true,
  "analysis": {
    "analysis_id": "uuid",
    "analysis_type": "SMS",
    "original_input": "Your bank account has been blocked. Click the link below to verify your account.",
    "file_url": "https://...",
    "created_at": "2026-07-15T10:30:00Z",
    "risk_score": 92,
    "danger_level": "DANGER",
    "scam_category": "Phishing",
    "detailed_analysis": "The message attempts to impersonate a trusted bank and creates urgency to steal sensitive information.",
    "explanation": "The message contains a suspicious link and requests your OTP, which legitimate banks never ask for through SMS.",
    "safe_next_steps": [
      "Do not click the link.",
      "Do not share your OTP.",
      "Contact your bank using the official customer care number."
    ],
    "detected_indicators": [
      "Suspicious URL",
      "Requests OTP",
      "Creates Urgency",
      "Fake Bank Name"
    ],
    "response_language": "Gujarati"
  }
}
```

> **Note:**
> - `original_input` is returned for SMS and WhatsApp analyses.
> - `file_url` is returned only for Audio, Image, QR, and Document analyses.

---

### Error Responses

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 404 Not Found

```json
{
  "success": false,
  "message": "Analysis not found."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to retrieve analysis details."
}
```

---

### Database Tables Used

- Analysis_History
- AI_Results
- Files *(Only if the analysis contains an uploaded file.)*

---

### External Services

- None

---

### API Flow

```text
User
   │
   ▼
Select Analysis from History
   │
   ▼
GET /analysis/{analysis_id}
   │
   ▼
Validate User
   │
   ▼
Fetch Analysis_History
   │
   ▼
Fetch AI_Results
   │
   ▼
Fetch File Information (If Available)
   │
   ▼
Merge Complete Analysis
   │
   ▼
Return Analysis Details
   │
   ▼
Display Complete Analysis
```
---
### Status
🟢 Frozen (Version 1.0)

## API 6 - Get Analysis Report

### Endpoint

**GET** `/analysis/{analysis_id}/report`

---

### Purpose

Retrieves the generated report for a specific scam analysis. The report includes a complete summary of the AI analysis and is displayed within the web application.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| analysis_id | UUID | Yes | Unique ID of the analysis record |

---

### Success Response (200 OK)

```json
{
  "success": true,
  "report": {
    "report_id": "uuid",
    "report_title": "SMS Scam Analysis Report",
    "report_format": "WEB",
    "generated_at": "2026-07-15T10:35:00Z",
    "risk_score": 92,
    "danger_level": "DANGER",
    "scam_category": "Phishing",
    "detailed_analysis": "The message attempts to impersonate a trusted bank and creates urgency to steal sensitive information.",
    "explanation": "The message contains a suspicious link and requests your OTP.",
    "safe_next_steps": [
      "Do not click the link.",
      "Do not share your OTP.",
      "Contact your bank using the official customer care number."
    ],
    "detected_indicators": [
      "Suspicious URL",
      "Requests OTP",
      "Creates Urgency",
      "Fake Bank Name"
    ]
  }
}
```

---

### Error Responses

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 404 Not Found

```json
{
  "success": false,
  "message": "Report not found."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to retrieve report."
}
```

---

### Database Tables Used

- Reports
- Analysis_History
- AI_Results

---

### External Services

- None

---

### API Flow

```text
User
   │
   ▼
Open Report
   │
   ▼
GET /analysis/{analysis_id}/report
   │
   ▼
Validate User
   │
   ▼
Fetch Report
   │
   ▼
Fetch Analysis Data
   │
   ▼
Fetch AI Results
   │
   ▼
Return Web Report
   │
   ▼
Display Report
```

---

### Status

🟢 Frozen (Version 1.0)
**Status:** 

## API 7 - Download Analysis Report

### Endpoint

**GET** `/analysis/{analysis_id}/report/download`

---
### Purpose
Downloads the scam analysis report as a PDF document for offline viewing, sharing, or future reference.

---

### Authentication Required
✅ Yes

---

### Request Header
```http
Authorization: Bearer <access_token>
```

---

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| analysis_id | UUID | Yes | Unique ID of the analysis record |

---

### Success Response (200 OK)

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="Scam_Analysis_Report.pdf"
```

> The API returns the generated PDF report for download.

---

### Error Responses

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 404 Not Found

```json
{
  "success": false,
  "message": "Report not found."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to generate the report."
}
```

---

### Database Tables Used

- Reports
- Analysis_History
- AI_Results

---

### External Services

- PDF Generation Service

---

### API Flow

```text
User
   │
   ▼
Click Download Report
   │
   ▼
GET /analysis/{analysis_id}/report/download
   │
   ▼
Validate User
   │
   ▼
Fetch Analysis Data
   │
   ▼
Generate PDF Report
   │
   ▼
Return PDF File
   │
   ▼
Download Starts
```
---
### Status
🟢 Frozen (Version 1.0)

## API 8 - Get User Settings

### Endpoint

**GET** `/settings`

---

### Purpose

Retrieves the current settings and preferences of the authenticated user, including language, theme, notification preferences, and voice explanation settings.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Request Parameters

None

---

### Success Response (200 OK)

```json
{
  "success": true,
  "settings": {
    "preferred_language": "Gujarati",
    "theme": "Light",
    "browser_notifications": true,
    "email_notifications": false,
    "voice_explanation": true
  }
}
```

---

### Error Responses

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 404 Not Found

```json
{
  "success": false,
  "message": "Settings not found."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to retrieve user settings."
}
```

---

### Database Tables Used

- Settings

---

### External Services

- None

---

### API Flow

```text
User
   │
   ▼
Open Settings Page
   │
   ▼
GET /settings
   │
   ▼
Validate User
   │
   ▼
Fetch Settings
   │
   ▼
Return Settings
   │
   ▼
Display Settings
```

---

### Status

🟢 Frozen (Version 1.0)

## API 9 - Update User Settings

### Endpoint

**PATCH** `/settings`

---

### Purpose

Updates the authenticated user's application preferences, including language, theme, notification preferences, and voice explanation settings.

---

### Authentication Required

✅ Yes

---

### Request Header

```http
Authorization: Bearer <access_token>
```

---

### Request Body

```json
{
  "preferred_language": "Gujarati",
  "theme": "Light",
  "browser_notifications": true,
  "email_notifications": false,
  "voice_explanation": true
}
```

> **Note:**
> The user may update one or more settings in a single request.

---

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Settings updated successfully.",
  "settings": {
    "preferred_language": "Gujarati",
    "theme": "Light",
    "browser_notifications": true,
    "email_notifications": false,
    "voice_explanation": true
  }
}
```

---

### Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid settings data."
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized access."
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to update user settings."
}
```

---

### Database Tables Used

- Settings

---

### External Services

- None

---

### API Flow

```text
User
   │
   ▼
Modify Settings
   │
   ▼
PATCH /settings
   │
   ▼
Validate User
   │
   ▼
Validate Input
   │
   ▼
Update Settings Table
   │
   ▼
Return Updated Settings
   │
   ▼
Display Success Message
```

---

### Status
🟢 Frozen (Version 1.0)

🟡 In Progress
