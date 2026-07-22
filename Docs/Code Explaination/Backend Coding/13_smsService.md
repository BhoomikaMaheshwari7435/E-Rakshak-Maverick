# smsService.js

## Purpose

Processes SMS text by reusing the common analysis and report services.

## Flow

SMS Text
↓
riskAnalyzer
↓
reportService
↓
Return Result

## Responsibilities

- Receive SMS text
- Analyze scam risk
- Generate formatted report
- Return the result

## Reusability

This service does not contain scam detection logic.
It delegates analysis to `riskAnalyzer.js` and formatting to `reportService.js`.




# Code:
## 🚀 Part 1 - Imports & Main Function
const riskAnalyzer = require("../analysis/riskAnalyzer");
const reportService = require("../report/reportService");

exports.scanSMS = (message) => {

    // Analyze SMS text
    const analysisResult = riskAnalyzer.analyze(message);

    // Generate formatted report
    const report = reportService.generateReport(analysisResult);

    return {
        message,
        report
    };

};




## 1. Import Risk Analyzer
_const riskAnalyzer = require("../analysis/riskAnalyzer");_
Instead of writing scam detection again...  we simply call the file we already built To analyze it's risk.

## 2. Import Report Service
_const reportService = require("../report/reportService");_
Instead of creating JSON manually... we let reportService format everything.
Exactly like QR.

## 3. _exports.scanSMS = (message) => {_
There is no async. Why?
**Because we're not:** Reading files ❌
Reading database ❌
Calling APIs ❌

We're just working with text already in memory. So synchronous code is enough.


## 4. _const analysisResult = riskAnalyzer.analyze(message);_
**Suppose user sends:**
Congratulations!
You won ₹50,000.
Click here to claim.

This line sends the SMS to our analyzer.
**The analyzer checks:** _Keywords_
Links
Short URLs
Risk Score
Category


## 5. _const report = reportService.generateReport(analysisResult);_
**Our report service creates something like:**
_{
  "summary": {
    "riskScore": 80,
    "riskLevel": "DANGER"
  }
}_

No duplicate code.


## 6. 
_return {
    message,
    report
};_

**Finally we return both:**  Original SMS And Analysis Report
_The controller will send this to the frontend._

