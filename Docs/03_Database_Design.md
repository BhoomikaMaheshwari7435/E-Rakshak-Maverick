Database Design For The Project....

## 3 Q.s To Ask Every Time...
1. Do we really need it in V1?
2. Can the project work without it?
3. If we add it later, will it break the architecture?


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



### Table 2: Sessions (V.2.0, We Are Not Using It Now.)

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



### Table 2: Analysis_History

| Column | Type | Required | Unique | Description |
|---------|------|----------|--------|-------------|
| analysis_id | UUID | Yes | Yes | Primary Key |
| user_id | UUID | Yes | No | References Users table |
| analysis_type | VARCHAR(30) | Yes | No | SMS, WhatsApp, Audio, QR, Image |
| input_text | TEXT | No | No | Original text or transcript |
| file_id | UUID | No | No | References Files table |
| analysis_status | VARCHAR(20) | Yes | No | Pending, Processing, Completed, Failed |
| analyzed_at | TIMESTAMP | Yes | No | Analysis Completion Time |
| created_at | TIMESTAMP | Yes | No | Analysis Request Time |

### Table 3: Files

| Column | Type | Required | Unique | Description |
|---------|------|----------|--------|-------------|
| file_id | UUID | Yes | Yes | Primary Key |
| user_id | UUID | Yes | No | References Users table |
| file_name | VARCHAR(255) | Yes | No | Original File Name |
| file_type | VARCHAR(30) | Yes | No | AUDIO, IMAGE, PDF |
| file_size | BIGINT | Yes | No | File Size in Bytes |
| file_url | TEXT | Yes | Yes | Cloud Storage URL |
| upload_status | VARCHAR(20) | Yes | No | UPLOADING, UPLOADED, FAILED |
| uploaded_at | TIMESTAMP | Yes | No | Upload Time |
| file_hash | VARCHAR(64) | No | Yes | SHA-256 hash of the file |

### Table 4: AI_Results

| Column | Type | V1 | Unique | Description |
|---------|------|----|--------|-------------|
| ai_result_id | UUID | 🟢 Core | Yes | Primary Key |
| analysis_id | UUID | 🟢 Core | No | References Analysis_History |
| risk_score | INTEGER | 🟢 Core | No | Risk Score (0–100) |
| danger_level | ENUM | 🟢 Core | No | SAFE, BE_CAREFUL, DANGER |
| scam_category | ENUM | 🟢 Core | No | OTP Scam, Phishing, QR Scam, Fake Banking, UPI Fraud, etc. |
| detailed_analysis | TEXT | 🟢 Core | No | Complete AI analysis of the uploaded content |
| explanation | TEXT | 🟢 Core | No | Explains why the content is considered risky or safe |
| safe_next_steps | TEXT | 🟢 Core | No | Recommended actions for the user |
| detected_indicators | JSON | 🟢 Core | No | AI detected indicators like suspicious URL, OTP request, urgency, fake sender, etc. |
| preferred_output_language | ENUM | 🟢 Core | No | Gujarati, Hindi, English |
| created_at | TIMESTAMP | 🟢 Core | No | AI analysis completion time |

### Table 5: Reports

| Column | Type | V1 | Unique | Description |
|---------|------|----|--------|-------------|
| report_id | UUID | 🟢 Core | Yes | Primary Key |
| analysis_id | UUID | 🟢 Core | No | References Analysis_History |
| report_title | VARCHAR(150) | 🟢 Core | No | Auto-generated report title |
| report_format | ENUM | 🟢 Core | No | WEB, PDF |
| report_url | TEXT | 🟢 Core | No | URL of generated report |
| report_status | ENUM | 🟢 Core | No | GENERATED, FAILED |
| generated_at | TIMESTAMP | 🟢 Core | No | Report generation time |

### Table 6: Settings

| Column | Type | V1 | Unique | Description |
|---------|------|----|--------|-------------|
| setting_id | UUID | 🟢 Core | Yes | Primary Key |
| user_id | UUID | 🟢 Core | Yes | References Users table |
| language | ENUM | 🟢 Core | No | Gujarati, Hindi, English |
| theme | ENUM | 🟢 Core | No | Light, Dark, System |
| browser_notifications | BOOLEAN | 🟢 Core | No | Enable or Disable browser notifications |
| email_notifications | BOOLEAN | 🟢 Core | No | Enable or Disable email notifications |
| voice_explanation | BOOLEAN | 🟢 Core | No | Enable or Disable voice explanation |
| created_at | TIMESTAMP | 🟢 Core | No | Record creation time |
| updated_at | TIMESTAMP | 🟢 Core | No | Last updated time |

## Step 3 - Database Relationships
### Relationship 1

**Users (1) → Analysis_History (Many)**

- Primary Key: `Users.user_id`
- Foreign Key: `Analysis_History.user_id`
- Relationship: One-to-Many (1:N)

**Reason:**
A single user can perform multiple scam analyses throughout their usage of the platform.

### Relationship 2

**Users (1) → Files (Many)**

- Primary Key: `Users.user_id`
- Foreign Key: `Files.user_id`
- Relationship: One-to-Many (1:N)

**Reason:**
A single user can upload multiple files for scam analysis.

### Relationship 3

**Analysis_History (1) → AI_Results (1)**

- Primary Key: `Analysis_History.analysis_id`
- Foreign Key: `AI_Results.analysis_id`
- Relationship: One-to-One (1:1)

**Reason:**
Each analysis request generates one AI analysis result.

### Relationship 4

**Analysis_History (1) → Reports (Many)**

- Primary Key: `Analysis_History.analysis_id`
- Foreign Key: `Reports.analysis_id`
- Relationship: One-to-Many (1:N)

**Reason:**
A single analysis can generate multiple reports, such as a web report, PDF report, or reports in different languages.

### Relationship 5

**Users (1) → Settings (1)**

- Primary Key: `Users.user_id`
- Foreign Key: `Settings.user_id`
- Relationship: One-to-One (1:1)

**Reason:**
Each user has one settings profile containing language preference, theme, notification preferences, and voice explanation settings.

### Relationship 6

**Files (1) → Analysis_History (Many)**

- Primary Key: `Files.file_id`
- Foreign Key: `Analysis_History.file_id`
- Relationship: One-to-Many (1:N)

**Reason:**
A single uploaded file can be analyzed multiple times without requiring the user to upload it again.

