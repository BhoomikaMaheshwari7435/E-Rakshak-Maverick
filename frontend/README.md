# 🛡️ E-Rakshak Frontend

AI-powered Cyber Fraud Detection & Protection System developed by **Team Mavericks**.

## 🚀 Features

- 🔐 Google Sign-In Authentication
- 📩 SMS Fraud Detection
- 💬 WhatsApp Message Analysis
- 🔗 QR Code Scam Detection
- 📄 Protect & Analyse (File Upload)
- 📜 Scan History
- 🚨 Emergency Help
- 🌐 Multilingual Support (English, Hindi, Gujarati)
- 🎙️ Voice Assistant (ON/OFF)
- 🔒 Privacy Policy & Permission Flow

---

## 📂 Project Structure

```text
frontend/
│── app.py
│── translations.py
│── requirements.txt
│
├── screens/
│   ├── home.py
│   ├── scan.py
│   ├── history.py
│   ├── emergency.py
│   ├── settings.py
│   ├── scan_sms.py
│   ├── whatsapp.py
│   ├── qr.py
│   └── analyse.py
│
├── components/
├── utils/
├── assets/
└── styles/
```

---

## 🖥️ Application Flow

```
Google Sign-In
        │
        ▼
Privacy Policy
        │
        ▼
Home
 │
 ├── Scan & Protect
 │      ├── Scan SMS
 │      ├── WhatsApp Messages
 │      ├── Scan QR
 │      └── Protect & Analyse
 │
 ├── History
 ├── Emergency Help
 └── Settings
```

---

## 🛠️ Tech Stack

**Frontend**
- Python
- Streamlit

**Backend**
- Node.js
- Express.js

**Database**
- Supabase

**Authentication**
- Google OAuth

**AI**
- Hugging Face Models

---

## 🔒 Permissions

The application requests permissions only when required.

- 📩 SMS (SMS Analysis)
- 📷 Camera (QR Scan)
- 📁 File Access (Protect & Analyse)
- 🎤 Microphone (Voice Assistant)

---

## ▶️ Run Locally

```bash
cd frontend
pip install -r requirements.txt
streamlit run app.py
```

---

## 👥 Team E-Rakshak!

Frontend • Backend • AI • Database • UI/UX
