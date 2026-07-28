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





const axios = require("axios");
const fs = require("fs");

// Import Risk Analyzer Service
const riskAnalyzer = require("../analysis/riskAnalyzer");

// Import Report Generator Service
const reportService = require("../report/reportService");

/**
 * Analyze Call Transcript
 * @param {Object} file - Uploaded audio file received from controller
 * @returns {Object} Analysis report
 */
exports.scanTranscript = async (file) => {

    try {

    console.log("Uploaded File:", file.originalname);

    // Read uploaded audio file
    const audioBuffer = fs.readFileSync(file.path);

    console.log("Sending audio to Hugging Face Whisper...");

    // Whisper API URL
    const apiUrl = "https://router.huggingface.co/hf-inference/models/openai/whisper-large-v3";

    console.log("Calling URL:", apiUrl);




    console.log("HF Token Loaded:", process.env.HF_API_TOKEN ? "YES" : "NO");
    console.log("Token Prefix:", process.env.HF_API_TOKEN?.substring(0, 8));
    console.log("Sending MIME Type:", file.mimetype);



        // Normalize MIME type for Hugging Face
let contentType = file.mimetype;

if (contentType === "video/mpeg") {
    contentType = "audio/mpeg";
}

console.log("Sending MIME Type:", contentType);





    // Send audio to Hugging Face Whisper
    const response = await axios.post(
        apiUrl,
        audioBuffer,
        {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
                "Content-Type": contentType
            },
            timeout: 30000
        }
    );

    // Extract transcript
    const transcript = response.data.text || "";

    console.log("Transcript:", transcript);

    // Analyze transcript
    const analysisResult = riskAnalyzer.analyze(transcript);

    // Generate report
    const report = reportService.generateReport(analysisResult);

    // Return final response
    return {
        transcript,
        report
    };

} 
    
    catch (error) {

    console.error("========== WHISPER ERROR ==========");
    console.error("Message:", error.message);

    if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response:", error.response.data);
    }

    console.error("===================================");

    throw error;
}

};      