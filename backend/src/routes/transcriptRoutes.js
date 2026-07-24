/**
 * ------------------------------------------------------------
 * File: transcriptRoutes.js
 * Project: E-Rakshak Maverick
 * Description:
 * Defines API routes for Call Transcript Analysis.
 * Receives uploaded audio recordings and forwards them
 * to the Transcript Controller.
 * ------------------------------------------------------------
 */

const express = require("express");
const router = express.Router();

// Reusable upload middleware
const upload = require("../middleware/uploadMiddleware");

// Transcript Controller
const transcriptController = require("../controllers/transcriptController");

/**
 * ------------------------------------------------------------
 * POST /api/scan/transcript
 *
 * Upload an audio recording and analyze it.
 *
 * Request:
 * Multipart/Form-Data
 * Field Name: file
 *
 * Supported Formats (V1):
 * - .mp3
 * - .wav
 * - .m4a
 *
 * Flow:
 * Upload
 *   ↓
 * Controller
 *   ↓
 * Transcript Service
 *   ↓
 * Risk Analyzer
 *   ↓
 * Report Generator
 * ------------------------------------------------------------
 */

router.post(
    "/transcript",
    upload.single("file"),
    transcriptController.scanTranscript
);

module.exports = router;