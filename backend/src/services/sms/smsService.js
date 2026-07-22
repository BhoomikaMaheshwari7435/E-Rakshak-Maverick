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