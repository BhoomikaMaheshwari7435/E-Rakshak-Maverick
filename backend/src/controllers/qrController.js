// ======================================================
// File: qrController.js
// Purpose: Handles QR Scanner API requests
// Project: E-Rakshak
// ======================================================

const qrService = require("../services/qr/qrService");

exports.scanQRCode = async (req, res) => {
    try {

        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a QR code image."
            });
        }

        // Send uploaded image to service
        const result = await qrService.scanQRCode(req.file);

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