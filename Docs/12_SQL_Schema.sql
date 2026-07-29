-- =====================================================
-- E-Rakshak Maverick
-- SQL Schema (Version 1.0)
-- =====================================================

-- ==========================================
-- ENUM TYPES
-- ==========================================

-- Analysis Type
CREATE TYPE analysis_type_enum AS ENUM (
    'SMS',
    'WHATSAPP',
    'AUDIO',
    'IMAGE',
    'QR',
    'DOCUMENT'
);

-- File Type
CREATE TYPE file_type_enum AS ENUM (
    'AUDIO',
    'IMAGE',
    'PDF'
);

-- Upload Status
CREATE TYPE upload_status_enum AS ENUM (
    'UPLOADING',
    'UPLOADED',
    'FAILED'
);

-- Danger Level
CREATE TYPE danger_level_enum AS ENUM (
    'SAFE',
    'BE_CAREFUL',
    'DANGER'
);

-- Scam Category
CREATE TYPE scam_category_enum AS ENUM (
    'OTP_SCAM',
    'PHISHING',
    'QR_SCAM',
    'FAKE_BANKING',
    'UPI_FRAUD',
    'INVESTMENT_SCAM',
    'JOB_SCAM',
    'LOTTERY_SCAM',
    'OTHER'
);

-- Language
CREATE TYPE language_enum AS ENUM (
    'Gujarati',
    'Hindi',
    'English'
);

-- Theme
CREATE TYPE theme_enum AS ENUM (
    'Light',
    'Dark',
    'System'
);

-- Report Format
CREATE TYPE report_format_enum AS ENUM (
    'WEB',
    'PDF'
);

-- Report Status
CREATE TYPE report_status_enum AS ENUM (
    'GENERATED',
    'FAILED'
);

-- Account Status

CREATE TYPE account_status_enum AS ENUM (
    'ACTIVE',
    'SUSPENDED'
);
-- Analysis Status
CREATE TYPE analysis_status_enum AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);




-- ==========================================
-- TABLE: Users
-- ==========================================

CREATE TABLE users (

    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    profile_picture TEXT,

    auth_provider TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    last_login TIMESTAMP,

    account_status account_status_enum NOT NULL DEFAULT 'ACTIVE'

);



-- ==========================================
-- TABLE: Files
-- ==========================================

CREATE TABLE files (

    file_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    file_name VARCHAR(255) NOT NULL,

    file_type file_type_enum NOT NULL,

    file_size BIGINT NOT NULL,

    file_url TEXT NOT NULL UNIQUE,

    upload_status upload_status_enum NOT NULL DEFAULT 'UPLOADING',

    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),

    file_hash VARCHAR(64) UNIQUE,

    CONSTRAINT fk_files_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE

);



-- ==========================================
-- TABLE: Analysis_History
-- ==========================================

CREATE TABLE analysis_history (

    analysis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    analysis_type analysis_type_enum NOT NULL,

    input_text TEXT,

    file_id UUID,

    analysis_status analysis_status_enum NOT NULL DEFAULT 'PENDING',

    analyzed_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_analysis_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_analysis_file
        FOREIGN KEY (file_id)
        REFERENCES files(file_id)
        ON DELETE SET NULL

);




-- ==========================================
-- TABLE: AI_Results
-- ==========================================

CREATE TABLE ai_results (

    ai_result_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    analysis_id UUID NOT NULL UNIQUE,

    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),

    danger_level danger_level_enum NOT NULL,

    scam_category scam_category_enum NOT NULL,

    detailed_analysis TEXT NOT NULL,

    explanation TEXT NOT NULL,

    safe_next_steps TEXT NOT NULL,

    detected_indicators JSONB NOT NULL,

    response_language language_enum NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_ai_analysis
        FOREIGN KEY (analysis_id)
        REFERENCES analysis_history(analysis_id)
        ON DELETE CASCADE

);




-- ==========================================
-- TABLE: Reports
-- ==========================================

CREATE TABLE reports (

    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    analysis_id UUID NOT NULL,

    report_title VARCHAR(150) NOT NULL,

    report_format report_format_enum NOT NULL,

    report_url TEXT,

    report_status report_status_enum NOT NULL DEFAULT 'GENERATED',

    generated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_report_analysis
        FOREIGN KEY (analysis_id)
        REFERENCES analysis_history(analysis_id)
        ON DELETE CASCADE

);




-- ==========================================
-- TABLE: Settings
-- ==========================================

CREATE TABLE settings (

    setting_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL UNIQUE,

    language language_enum NOT NULL DEFAULT 'English',

    theme theme_enum NOT NULL DEFAULT 'System',

    browser_notifications BOOLEAN NOT NULL DEFAULT TRUE,

    email_notifications BOOLEAN NOT NULL DEFAULT FALSE,

    voice_explanation BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_settings_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE

);




-- Schema Changed From Here

ALTER TABLE users
ADD COLUMN google_id TEXT UNIQUE;

ALTER TYPE scam_category_enum ADD VALUE IF NOT EXISTS 'SUSPICIOUS';
ALTER TYPE scam_category_enum ADD VALUE IF NOT EXISTS 'UNKNOWN';

-- 1. Add Indexes
-- Users
CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_users_google_id
ON users(google_id);

-- Files
CREATE INDEX IF NOT EXISTS idx_files_user
ON files(user_id);

-- Analysis History
CREATE INDEX IF NOT EXISTS idx_analysis_user
ON analysis_history(user_id);

CREATE INDEX IF NOT EXISTS idx_analysis_file
ON analysis_history(file_id);

-- AI Results
CREATE INDEX IF NOT EXISTS idx_ai_analysis
ON ai_results(analysis_id);

-- Reports
CREATE INDEX IF NOT EXISTS idx_reports_analysis
ON reports(analysis_id);

-- Settings
CREATE INDEX IF NOT EXISTS idx_settings_user
ON settings(user_id);

--2. Automatically Update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users Trigger
CREATE TRIGGER trg_users_updated_at

BEFORE UPDATE ON users

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();


-- Settings Trigger
CREATE TRIGGER trg_settings_updated_at

BEFORE UPDATE ON settings

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();


--3. Automatically Set analyzed_at'
CREATE OR REPLACE FUNCTION set_analysis_completed_time()
RETURNS TRIGGER AS $$
BEGIN

IF NEW.analysis_status='COMPLETED'
AND OLD.analysis_status<>'COMPLETED'

THEN

NEW.analyzed_at=NOW();

END IF;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;


-- Trigger
CREATE TRIGGER trg_analysis_completed

BEFORE UPDATE

ON analysis_history

FOR EACH ROW

EXECUTE FUNCTION set_analysis_completed_time();

-- 4. Enable UUID Generation (if not already)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 5. Verify Constraints
SELECT *
FROM information_schema.table_constraints;

-- 6. Verify Foreign Keys
SELECT

tc.table_name,

kcu.column_name,

ccu.table_name AS foreign_table,

ccu.column_name AS foreign_column

FROM information_schema.table_constraints tc

JOIN information_schema.key_column_usage kcu

ON tc.constraint_name=kcu.constraint_name

JOIN information_schema.constraint_column_usage ccu

ON ccu.constraint_name=tc.constraint_name

WHERE tc.constraint_type='FOREIGN KEY';


-- 7. Verify Indexes'
SELECT *

FROM pg_indexes

WHERE schemaname='public';


-- 8. Test Everything
SELECT * FROM users;

SELECT * FROM files;

SELECT * FROM analysis_history;

SELECT * FROM ai_results;

SELECT * FROM reports;

SELECT * FROM settings;

