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


    console.log("Message received:", message);
    console.log("Risk Analyzer:", riskAnalyzer);
    console.log("Report Service:", reportService);


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