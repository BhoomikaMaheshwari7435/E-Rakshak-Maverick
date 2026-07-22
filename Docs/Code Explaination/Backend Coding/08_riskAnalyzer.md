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






# Code Changed From Here 
exports.analyze = (text) => {

    // Convert text to lowercase for easier comparison
    const content = text.toLowerCase();

    let riskScore = 0;
    let reasons = [];

    // Check for HTTP links (less secure)
    if (content.includes("http://")) {
        riskScore += 20;
        reasons.push("Uses HTTP instead of HTTPS.");
    }

    // Check for known URL shorteners
    SHORT_URL_SERVICES.forEach((service) => {
        if (content.includes(service)) {
            riskScore += 25;
            reasons.push(`Uses shortened URL (${service}).`);
        }
    });

    // Check for suspicious keywords
    SUSPICIOUS_KEYWORDS.forEach((keyword) => {
        if (content.includes(keyword)) {
            riskScore += 10;
            reasons.push(`Contains suspicious keyword: "${keyword}".`);
        }
    });

    return {
        riskScore,
        reasons
    };
};







## Detection Rules (Current)

### HTTP Check
Adds risk if the content contains `http://`.

### URL Shortener Check
Checks whether the content contains known URL shortening services.

### Keyword Check
Loops through the suspicious keyword list and increases the risk score whenever a keyword is found.

## Why `toLowerCase()`?

Converts all text to lowercase so keyword matching works regardless of capitalization.



## HTTP Check : _if (content.includes("http://"))_
**Why? A secure website usually starts with:** _https://_

but Also If it starts with: **http://**
it doesn't automatically mean it's a scam, but it's less secure, so we add some risk.

## forEach() 
**Example:**
["apple", "banana", "mango"].forEach((fruit) => {
    console.log(fruit);
});
**Output:** apple   banana   mango

We're doing the same thing with our keyword list.


##  includes()
**Example:**  content.includes("winner")
**Returns:** _true or false_, Simple and efficient.


# Code Changed From Return Block 
## Old Block That We Change 
return {
    riskScore,
    reasons
};

## New Block That Is Replaced : 
    // Decide Risk Level
    let riskLevel = "SAFE";

    if (riskScore >= 70) {
        riskLevel = "DANGER";
    } else if (riskScore >= 30) {
        riskLevel = "BE_CAREFUL";
    }

    // Scam Category
    let category = "Unknown";

    if (riskScore >= 70) {
        category = "Phishing";
    } else if (riskScore >= 30) {
        category = "Suspicious";
    }

    // Safe Next Step
    let safeNextStep = "This content looks safe.";

    if (riskLevel === "BE_CAREFUL") {
        safeNextStep = "Verify the source before taking any action.";
    }

    if (riskLevel === "DANGER") {
        safeNextStep = "Do not click the link or share personal information.";
    }

    return {
        riskScore,
        riskLevel,
        category,
        reasons,
        safeNextStep
    };



### Why This Matters
**Earlier, we only returned:**
{
  "riskScore": 30,
  "reasons": [
    "Contains suspicious keyword: winner"
  ]
}



**Now we'll return something much more useful:**
{
  "riskScore": 30,
  "riskLevel": "BE_CAREFUL",
  "category": "Suspicious",
  "reasons": [
    "Contains suspicious keyword: winner"
  ],
  "safeNextStep": "Verify the source before taking any action."
}

