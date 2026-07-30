/**
 * ============================================================
 * File: databaseRoutes.js
 * Folder: src/routes/
 * ------------------------------------------------------------
 * Purpose:
 * This route is used to test the connection between
 * the Node.js backend and the Supabase database.
 *
 * Endpoint:
 * GET /api/db-test
 *
 * Future Endpoints:
 * - GET    /history
 * - POST   /save-analysis
 * - POST   /save-report
 * - PUT    /settings
 * ============================================================
 */

const express = require("express");
const router = express.Router();

// Import Database Service
const databaseService = require("../services/database/databaseService");

/**
 * ------------------------------------------------------------
 * GET /api/db-test
 * ------------------------------------------------------------
 * Tests whether the backend can successfully connect
 * to the Supabase database.
 * ------------------------------------------------------------
 */
router.get("/db-test", async (req, res) => {
    try {

        const data = await databaseService.testConnection();

        res.status(200).json({
            success: true,
            message: "Successfully connected to Supabase.",
            data
        });

    } catch (error) {

        console.error("Database Connection Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to connect to Supabase.",
            error: error.message
        });

    }
});

module.exports = router;