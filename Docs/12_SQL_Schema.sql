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
