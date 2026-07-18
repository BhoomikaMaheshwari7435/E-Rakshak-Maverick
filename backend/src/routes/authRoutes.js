// ======================================================
// File: authRoutes.js
// Purpose: Defines authentication-related API routes
// Project: E-Rakshak
// ======================================================

const express = require("express");
const router = express.Router();

// Import authentication controller
const authController = require("../controllers/authController");

/**
 * @route   POST /auth/google
 * @desc    Authenticate user using Google ID Token
 * @access  Public
 */
router.post("/google", authController.googleLogin);

module.exports = router;