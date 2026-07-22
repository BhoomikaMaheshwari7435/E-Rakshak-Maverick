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
};