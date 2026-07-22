## For whatsappRouter.js the code is same as smsRouter so if we've understand the SMS Router then whatsapp is also easy ans same!!!

# whatsappController.js

## Purpose

Handles incoming WhatsApp message scan requests.

---

## Responsibilities

- Receive request from the router.
- Extract WhatsApp message from `req.body`.
- Validate that a message is provided.
- Call `whatsappService` for scam analysis.
- Return the analysis result to the frontend.
- Handle unexpected server errors.

---

## Request Flow

Frontend

↓

whatsappRoutes.js

↓

whatsappController.js

↓

whatsappService.js

↓

Frontend

---

## Key Concepts

- Controller handles HTTP requests and responses.
- Validation should happen before calling the service.
- Business logic belongs in the service, not the controller.





# Code:
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
exports.scanWhatsApp = (req, res) => {

    try {

        // Extract WhatsApp message from request body
        const { message } = req.body;

        // Validate user input
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "WhatsApp message is required."
            });
        }

        // Send message to service for analysis
        const result = whatsappService.scanWhatsApp(message);

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


## 1. Import Service
_const whatsappService = require("../services/whatsapp/whatsappService");_

## 2. Export Function
_exports.scanWhatsApp = (req, res) => {_
**This function becomes available to:**  whatsappController.scanWhatsApp

which is exactly what we called inside:
_router.post(
    "/scan/whatsapp",
    whatsappController.scanWhatsApp
);_


## 3. Extract Message
_const { message } = req.body;_

## 4. Validation _if (!message)_
**If the user sends:**  {}  or   _{    "message": ""   }_
We immediately return
**400 Bad Request**
instead of wasting processing time.


## 5. Call Service
_const result = whatsappService.scanWhatsApp(message);_
Controller's responsibility ends here.  Service now handles the business logic.

## 6. Success Response
_return res.status(200).json({
    success: true,
    data: result
});_

The frontend receives the analysis result.


## 7. Error Handling
_catch (error)_

If something unexpected happens, instead of crashing the server,
we return :  **500 Internal Server Error**



# 🏗️ Flow
Frontend
     │
     ▼
whatsappRoutes.js
     │
     ▼
whatsappController.js
     │
     ▼
whatsappService.js
     │
     ▼
riskAnalyzer.js
     │
     ▼
reportService.js
     │
     ▼
Frontend

