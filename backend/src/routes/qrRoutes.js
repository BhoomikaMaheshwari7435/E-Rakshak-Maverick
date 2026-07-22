// ======================================================
// File: qrRoutes.js
// Purpose: Defines QR Scanner API routes
// Project: E-Rakshak
// ======================================================

const express = require("express");
const router = express.Router();

const qrController = require("../controllers/qrController");
const upload = require("../middleware/uploadMiddleware");

// Scan QR Code
router.post(
    "/scan/qr",
    upload.single("qrImage"),
    qrController.scanQRCode
);

module.exports = router;