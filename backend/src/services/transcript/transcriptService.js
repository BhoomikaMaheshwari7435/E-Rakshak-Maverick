/**
 * ============================================================
 * E-Rakshak Maverick
 * Transcript Service
 * ------------------------------------------------------------
 * Purpose:
 * Handles call transcript analysis by using the Risk Analyzer
 * and Report Service to detect scam-related conversations.
 *
 * Responsibilities:
 * - Receive transcript text from controller
 * - Analyze transcript for scam indicators
 * - Generate formatted analysis report
 * - Return transcript with generated report
 *
 * Author: Team E-Rakshak
 * ============================================================
 */

// Import Risk Analyzer Service
const riskAnalyzer = require("../analysis/riskAnalyzer");

// Import Report Generator Service
const reportService = require("../report/reportService");

/**
 * Analyze Call Transcript
 * @param {string} transcript - Transcript text received from controller
 * @returns {Object} Analysis report
 */
exports.scanTranscript = (transcript) => {

    console.log("Transcript received:", transcript);
    console.log("Risk Analyzer:", riskAnalyzer);
    console.log("Report Service:", reportService);

    // Analyze transcript using Risk Analyzer
    const analysisResult = riskAnalyzer.analyze(transcript);

    // Generate formatted report
    const report = reportService.generateReport(analysisResult);

    // Return transcript and generated report
    return {
        transcript,
        report
    };
};