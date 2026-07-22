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
