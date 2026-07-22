# riskAnalyzer.js

## Purpose
Analyzes extracted text from different sources (QR, SMS, WhatsApp, Call Transcript) and determines scam risk.

## Current Components

### SUSPICIOUS_KEYWORDS
Stores commonly used scam-related words.

### SHORT_URL_SERVICES
Stores known URL shortening services that may hide malicious links.

### analyze(text)
Main reusable function that receives extracted text and returns a risk analysis.

## Initial Values

- riskScore = 0
- reasons = []

These values are updated as suspicious indicators are detected.

# Code:
// Suspicious keywords commonly used in scams
const SUSPICIOUS_KEYWORDS = [
    "urgent",
    "verify",
    "otp",
    "bank",
    "prize",
    "lottery",
    "winner",
    "claim",
    "gift",
    "reward",
    "limited time",
    "click here",
    "account blocked",
    "payment failed"
];

// URL shortener services
const SHORT_URL_SERVICES = [
    "bit.ly",
    "tinyurl.com",
    "cutt.ly",
    "rb.gy",
    "is.gd",
    "t.co"
];

exports.analyze = (text) => {

    // Default Result
    let riskScore = 0;
    let reasons = [];

    return {
        riskScore,
        reasons
    };
};






## 1️. SUSPICIOUS_KEYWORDS
_const SUSPICIOUS_KEYWORDS = [...]_
This array contains words that scammers frequently use. Words detected: winner, claim, reward
Each detected word will increase the risk score later.

## 2️. SHORT_URL_SERVICES 
_const SHORT_URL_SERVICES = [...]_

Why? Scammers often hide dangerous links using URL shorteners.
**Example:** Instead of (https://fake-bank-login.xyz)
**they send :** (https://bit.ly/3KXh92A)
You cannot immediately see the real destination. So we increase the risk if a shortened URL is detected.

## 3️. exports.analyze
This is the main function. Later every scanner will call it.
**Example:**
**QR Scanner :** _riskAnalyzer.analyze(qrText);_
**SMS Scanner :**  _riskAnalyzer.analyze(messageText);_
**WhatsApp Scanner :**  _riskAnalyzer.analyze(messageText);_
Same function. Different sources.
That's called code reusability, and it's one of the reasons we separated this into its own service.

## 4️. Default Values
_let riskScore = 0;
let reasons = [];_

**Initially we assume:** Risk = 0 , Reasons = []
As we detect suspicious things, we'll update them.
**Example:** Found "winner"  =>  riskScore = 20  =>  reasons.push(...)

