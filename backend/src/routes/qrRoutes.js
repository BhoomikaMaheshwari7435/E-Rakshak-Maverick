// ======================================================
// File: qrRoutes.js
// Purpose: Defines QR Scanner API routes
// Project: E-Rakshak
// ======================================================

const express = require("express");

const router = express.Router();

const qrController = require("../controllers/qrController");

/**
 * @route POST /scan/qr
 * @desc Scan and analyze QR Code
 * @access Private
 */

router.post("/qr", qrController.scanQRCode);

module.exports = router;