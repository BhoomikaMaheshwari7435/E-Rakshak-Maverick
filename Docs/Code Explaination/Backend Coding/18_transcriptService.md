# Transcript Service (`transcriptService.js`)

## Overview

The Transcript Service is responsible for analyzing call transcript text received from the Transcript Controller.

It acts as the bridge between the controller and the AI analysis layer.

Instead of directly analyzing or generating reports itself, this service delegates those responsibilities to the shared Risk Analyzer and Report Service.

This keeps the code modular and reusable.

---

## Responsibilities

- Receive transcript text from the Transcript Controller.
- Pass transcript text to the Risk Analyzer.
- Receive AI analysis result.
- Generate a formatted report using the Report Service.
- Return the transcript along with the generated report.

---

## Workflow

```
User uploads audio
        │
        ▼
Speech-to-Text (Future Integration)
        │
        ▼
Transcript Controller
        │
        ▼
Transcript Service
        │
        ▼
Risk Analyzer
        │
        ▼
Report Service
        │
        ▼
Controller
        │
        ▼
Frontend Response
```

---

## Input

| Parameter | Type | Description |
|-----------|------|-------------|
| transcript | String | Transcript text generated from uploaded audio |

---

## Output

Example:

```json
{
    "transcript": "Your bank account has been blocked. Share your OTP.",
    "report": {
        "riskScore": 94,
        "riskLevel": "HIGH",
        "category": "OTP Scam"
    }
}
```

---

## Dependencies

### Risk Analyzer

Responsible for identifying scam indicators inside the transcript.

Functions Used:

- analyze()

---

### Report Service

Responsible for converting the AI analysis into a formatted report.

Functions Used:

- generateReport()

---

## Advantages

- Reuses common Risk Analyzer logic.
- Reuses Report Service.
- Easy to maintain.
- Easy to extend with new AI models.
- Keeps Controller lightweight.
- Follows Separation of Concerns.

---

## Future Improvements

- Integrate Hugging Face Whisper Speech-to-Text.
- Support multiple languages.
- Detect speaker changes.
- Extract scam entities like OTP, UPI IDs, URLs, phone numbers, and bank names.
- Save transcript history in Supabase.

---

## Backend Architecture

```
Transcript Controller
        │
        ▼
Transcript Service
        │
        ▼
Risk Analyzer
        │
        ▼
Report Service
        │
        ▼
Frontend
```

---

## Status

✅ Completed
