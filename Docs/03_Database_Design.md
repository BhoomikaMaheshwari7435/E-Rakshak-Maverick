Database Design For The Project....




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