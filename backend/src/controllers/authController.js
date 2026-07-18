// ======================================================
// File: authController.js
// Purpose: Handles authentication-related requests
// Project: E-Rakshak
// ======================================================

// Import Google Authentication Service
const googleAuthService = require("../services/auth/googleAuthService");

/**
 * @route   POST /auth/google
 * @desc    Authenticate user using Google ID Token
 * @access  Public
 */
exports.googleLogin = async (req, res) => {
    try {
        // Extract Google ID Token from request body
        const { id_token } = req.body;

        // Validate request
        if (!id_token) {
            return res.status(400).json({
                success: false,
                message: "Google ID Token is required."
            });
        }

        // Call authentication service
        const result = await googleAuthService.verifyGoogleUser(id_token);

        // Return successful response
        return res.status(200).json(result);

    } catch (error) {
        console.error("Authentication Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Authentication failed."
        });
    }
};