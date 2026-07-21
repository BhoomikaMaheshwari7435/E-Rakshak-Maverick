// ======================================================
// File: qrController.js
// Purpose: Handles QR Scanner API requests
// Project: E-Rakshak
// ======================================================

const qrService = require("../services/qr/qrService");

/**
 * @function scanQRCode
 * @description Receives a QR scan request from the Route,
 * sends it to the Service for processing,
 * and returns the final response to the client.
 */
exports.scanQRCode = async (req, res) => {
    try {

        // Send request data to the Service
        const result = await qrService.scanQRCode(req.body);

        // Return success response
        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("QR Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to scan QR Code."
        });

    }
};