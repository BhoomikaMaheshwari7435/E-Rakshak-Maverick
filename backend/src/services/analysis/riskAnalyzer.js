/**
 * ==========================================================
 * File: riskAnalyzer.js
 * Purpose: Analyze text content and detect potential scam risks.
 * Author: Team E-Rakshak
 * ==========================================================
 */

// List of common URL shortening services
const SHORT_URL_SERVICES = [
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "ow.ly",
    "is.gd",
    "buff.ly",
    "cutt.ly"
];

// List of suspicious scam-related keywords
const SUSPICIOUS_KEYWORDS = [
    "otp",
    "verify",
    "urgent",
    "bank",
    "account",
    "click",
    "winner",
    "won",
    "gift",
    "prize",
    "claim",
    "limited",
    "offer",
    "reward",
    "password",
    "upi",
    "payment",
    "refund",
    "kyc",
    "update"
];

/**
 * Analyze the given text and generate a scam risk assessment.
 *
 * @param {string} text - Input text to analyze.
 * @returns {Object} Scam analysis result.
 */
exports.analyze = (text) => {

    // Handle empty or invalid input
    if (!text || typeof text !== "string") {
        return {
            riskScore: 0,
            riskLevel: "SAFE",
            category: "Unknown",
            reasons: ["No valid text provided."],
            safeNextStep: "Please provide valid text for analysis."
        };
    }

    // Convert text to lowercase for case-insensitive comparison
    const content = text.toLowerCase();

    let riskScore = 0;
    const reasons = [];

    // Check for HTTP links (less secure)
    if (content.includes("http://")) {
        riskScore += 20;
        reasons.push("Uses HTTP instead of HTTPS.");
    }

    // Check for known URL shortening services
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

    // Prevent score from exceeding 100
    riskScore = Math.min(riskScore, 100);

    // Decide Risk Level
    let riskLevel = "SAFE";

    if (riskScore >= 70) {
        riskLevel = "DANGER";
    } else if (riskScore >= 30) {
        riskLevel = "BE_CAREFUL";
    }

    // Decide Scam Category
    let category = "Unknown";

    if (riskLevel === "DANGER") {
        category = "Phishing";
    } else if (riskLevel === "BE_CAREFUL") {
        category = "Suspicious";
    }

    // Suggest Safe Next Step
    let safeNextStep = "This content looks safe.";

    if (riskLevel === "BE_CAREFUL") {
        safeNextStep = "Verify the sender before taking any action.";
    }

    if (riskLevel === "DANGER") {
        safeNextStep = "Do not click any links or share personal information.";
    }

    // Return final analysis
    return {
        riskScore,
        riskLevel,
        category,
        reasons,
        safeNextStep
    };

};