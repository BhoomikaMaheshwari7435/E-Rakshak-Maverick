/**
 * ==========================================================
 * File: whatsappRoutes.js
 * Purpose: Define all WhatsApp scanning API routes.
 * Author: Team E-Rakshak
 * ==========================================================
 */


// Import Express framework
const express = require("express");

// Create Express Router
const router = express.Router();
const whatsappController = require("../controllers/whatsappController");

// Route to analyze WhatsApp messages
router.post(
    "/scan/whatsapp",
    whatsappController.scanWhatsApp
);

module.exports = router;