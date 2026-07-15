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
