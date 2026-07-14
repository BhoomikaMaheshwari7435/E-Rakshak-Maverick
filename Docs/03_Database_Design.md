Database Design For The Project....

Do we really need it in V1?
Can the project work without it?
If we add it later, will it break the architecture?


# Database Design (Version 1.0)

## Database Roadmap

1. Identify Entities (Tables)

2. Define Columns

3. Define Relationships

4. Create ER Diagram

5. Normalize Database

6. Create SQL Schema

7. Build in Supabase

---

## Step 1 - Identify Entities

Tables:

- Users
- Sessions
- Analysis_History
- Files
- AI_Results
- Reports
- Settings
- Notifications



## Step 2 - Define Columns


### Table 1: Users

| Column | Type | Required | Unique | Description |
|---------|------|----------|--------|-------------|
| user_id | UUID | Yes | Yes | Primary Key |
| full_name | VARCHAR(100) | Yes | No | User Name |
| email | VARCHAR(255) | Yes | Yes | Login Email |
| profile_picture | TEXT | No | No | Profile Image URL |
| auth_provider | VARCHAR(20) | Yes | No | Google / Email |
| created_at | TIMESTAMP | Yes | No | Creation Time |
| updated_at | TIMESTAMP | Yes | No | Last Updated |
| last_login | TIMESTAMP | No | No | Last Login |
| account_status | VARCHAR(20) | Yes | No | Active / Suspended |



### Table 2: Sessions

| Column | Type | Required | Unique | Description |
|---------|------|----------|--------|-------------|
| session_id | UUID | Yes | Yes | Primary Key |
| user_id | UUID | Yes | No | References Users table |
| access_token | TEXT | Yes | Yes | JWT Access Token |
| refresh_token | TEXT | Yes | Yes | Refresh Token |
| device_type | VARCHAR(50) | Yes | No | Desktop / Android / iPhone |
| browser | VARCHAR(50) | No | No | Browser Name |
| ip_address | VARCHAR(45) | No | No | User IP Address |
| expires_at | TIMESTAMP | Yes | No | Session Expiry Time |
| created_at | TIMESTAMP | Yes | No | Login Time |
| last_activity | TIMESTAMP | Yes | No | Last Activity |



3