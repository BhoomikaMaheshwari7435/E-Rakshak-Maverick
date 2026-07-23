# transcriptRoutes.js

## Purpose
Defines the API endpoint for Call Transcript Analysis.

## Endpoint

POST /api/scan/transcript

## Middleware

upload.single("file")

## Controller

transcriptController.scanTranscript

## Request

Multipart/Form-Data

Field Name:
file

## Flow

Audio Upload

↓

Controller

↓

Transcript Service

↓

Risk Analyzer

↓

Report Service

↓

JSON Response




# Code:
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




## 1. _const express = require("express");_
**Imports Express.**

## 2. _const router = express.Router();_
Creates a Router object.

## 3. _const upload = require("../middleware/uploadMiddleware");_
**Reuses our existing upload middleware. No duplicate code.**

## 4. Imports the controller.
_const transcriptController =
require("../controllers/transcriptController");_

## 5. Creates a POST API.
_router.post(...)_
**Endpoint:**  POST /api/scan/transcript

## 6. Accepts one uploaded file.
_upload.single("file")_

The uploaded audio becomes  _req.file_

## 7. Calls the controller after upload is complete.
_transcriptController.scanTranscript_

## 8. Exports the router.
_module.exports = router;_

