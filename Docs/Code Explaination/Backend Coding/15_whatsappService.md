# whatsappService.js

## Purpose

Analyzes WhatsApp messages by reusing the common scam analysis and report generation services.

---

## Responsibilities

- Receive WhatsApp message.
- Send message to `riskAnalyzer`.
- Generate formatted report.
- Return analysis result.

---

## Flow

WhatsApp Message

↓

riskAnalyzer.js

↓

reportService.js

↓

Return Result

---

## Reusability

This service contains no scam detection logic.

All scam analysis is delegated to `riskAnalyzer.js`.

This makes the code reusable for SMS, WhatsApp, Email, and future modules.





# Code :
/**
 * ==========================================================
 * File: whatsappService.js
 * Purpose: Analyze WhatsApp messages for scam detection.
 * Author: Team E-Rakshak
 * ==========================================================
 */

// Import Risk Analyzer Service
const riskAnalyzer = require("../analysis/riskAnalyzer");

// Import Report Generator Service
const reportService = require("../report/reportService");

/**
 * Analyze WhatsApp Message
 * @param {string} message - WhatsApp message received from controller
 * @returns {Object} Analysis report
 */
exports.scanWhatsApp = (message) => {

    // Analyze the WhatsApp message
    const analysisResult = riskAnalyzer.analyze(message);

    // Generate formatted report
    const report = reportService.generateReport(analysisResult);

    // Return original message and generated report
    return {
        message,
        report
    };

};




## 1. Import Risk Analyzer
_const riskAnalyzer = require("../analysis/riskAnalyzer");_

## 2. Import Report Service
_const reportService = require("../report/reportService");_

## 3. Export Function
_exports.scanWhatsApp = (message) => {_

## 4. Analyze Message
_const analysisResult = riskAnalyzer.analyze(message);_

**Example input:**
Congratulations!
You've won ₹25,000.
Click here:
https://bit.ly/abcd

**The analyzer checks:**
Scam keywords
HTTP/HTTPS links
Short URLs
Risk Score
Scam Category
Safe Next Steps


## 5. Generate Report
_const report = reportService.generateReport(analysisResult);_


## 6. Return Result
_return {
    message,
    report
};_


**This returns:**

**{
    "message": "Congratulations! You won ₹25,000.",
    "report": {
        ...
    }
}**
The controller then sends this back to the frontend.



**🏗 Complete Flow**
User

↓

WhatsApp Message

↓

whatsappRoutes.js

↓

whatsappController.js

↓

whatsappService.js

↓

riskAnalyzer.js

↓

reportService.js

↓

whatsappController.js

↓

Frontend
