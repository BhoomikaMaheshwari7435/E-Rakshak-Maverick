/**
 * ------------------------------------------------------------
 * File: transcriptController.js
 * Project: E-Rakshak Maverick
 * Description:
 * Handles incoming Call Transcript Analysis requests.
 * Validates uploaded audio files, sends them to the
 * Transcript Service, and returns the analysis report.
 * ------------------------------------------------------------
 */

const transcriptService = require("../services/transcript/transcriptService");

/**
 * ------------------------------------------------------------
 * Scan Call Transcript
 * ------------------------------------------------------------
 */
exports.scanTranscript = async (req, res) => {

    try {

        // Check whether an audio file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an audio file."
            });
        }

        // Send uploaded audio file to Transcript Service
        const result = await transcriptService.scanTranscript(req.file);

        // Return successful response
        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Transcript Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to analyze transcript."
        });

    }

};

