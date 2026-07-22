# reportService.js

## Purpose

Formats the analysis result into a standardized report for the frontend.

## Function

generateReport(analysisResult)

## Report Structure

### generatedAt

Stores the report creation timestamp.

### summary

Contains:

- Risk Score
- Risk Level
- Scam Category

### details

Contains:

- Reasons
- Safe Next Step

## Benefits

- Reusable by all scanners
- Easy PDF generation
- Consistent frontend response
- Follows Single Responsibility Principle (SRP)


# Code
exports.generateReport = (analysisResult) => {

    return {

        generatedAt: new Date().toISOString(),

        summary: {
            riskScore: analysisResult.riskScore,
            riskLevel: analysisResult.riskLevel,
            category: analysisResult.category
        },

        details: {
            reasons: analysisResult.reasons,
            safeNextStep: analysisResult.safeNextStep
        }

    };

};






## Export Function
_exports.generateReport = (analysisResult) => {_
**Every scanner can use it like:**
const reportService = require("../report/reportService");
const report = reportService.generateReport(result);

Same service. Different scanners.


## Timestamp
_generatedAt: new Date().toISOString(),_
**Suppose user scans:**  Today 4:15 PM
**We save:** 2026-07-22T13:45:31.527Z

Why? Later History Page can show:
**Scanned**
22 Jul 2026   7:15 PM


## Summary
_summary_
Contains only the important information.
**Example:**
{
    "riskScore": 90,
    "riskLevel": "DANGER",
    "category": "Phishing"
}
**These are the first things the user should see.**


## Details
_details_
Contains the explanation.
**Example**
{
   "reasons":[
      "Uses HTTP",
      "Contains Winner"
   ],
   "safeNextStep":"Do not click the link."
}

If the user wants more information, the frontend expands this section.



## 🎯 Final Output Example
{
  "generatedAt": "2026-07-22T13:45:31.527Z",

  "summary": {
    "riskScore": 90,
    "riskLevel": "DANGER",
    "category": "Phishing"
  },

  "details": {
    "reasons": [
      "Uses HTTP",
      "Contains suspicious keyword: winner."
    ],
    "safeNextStep": "Do not click the link or share personal information."
  }
}

