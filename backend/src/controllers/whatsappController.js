/**
 * ==========================================================
 * File: whatsappController.js
 * Purpose: Handle incoming WhatsApp message scan requests.
 * Author: Team E-Rakshak
 * ==========================================================
 */

// Import WhatsApp Service
const whatsappService = require("../services/whatsapp/whatsappService");

/**
 * Scan WhatsApp Message
 * Route : POST /api/scan/whatsapp
 */
exports.scanWhatsApp = async (req, res) => {

    try {

        // Extract WhatsApp message from request body
        const { message } = req.body;
        const { userId } = req.body;

        // Validate user input
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "WhatsApp message is required."
            });
        }

        // Send message to service for analysis
        const result = await whatsappService.scanWhatsApp(
            userId,
            message
        );

        // Send successful response
        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("WhatsApp Scan Error:", error.message);

        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: "Failed to scan WhatsApp message."
        });

    }

};