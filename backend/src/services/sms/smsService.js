const riskAnalyzer = require("../analysis/riskAnalyzer");
const reportService = require("../report/reportService");
const databaseService = require("../database/databaseService");


exports.scanSMS = async (userId, message) => {

    // Analyze SMS text
    const analysisResult = riskAnalyzer.analyze(message);
    const analysis = await databaseService.saveAnalysis(
        userId,
        "SMS",
        message
    );

        await databaseService.saveAIResult(
        analysis.analysis_id,
        analysisResult
    );


    // Generate formatted report
    const report = reportService.generateReport(analysisResult);

    await databaseService.saveReport(
        analysis.analysis_id,
        report
    );

    return {
        message,
        report
    };

};