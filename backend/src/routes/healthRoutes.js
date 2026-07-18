// ======================================================
// File: healthRoutes.js
// Purpose: Health check endpoint
// Project: E-Rakshak
// ======================================================

const express = require("express");

const router = express.Router();

// Health Check API
router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully.",
        timestamp: new Date().toISOString()
    });
});

module.exports = router;