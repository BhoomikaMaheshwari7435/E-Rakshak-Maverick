## Header
// ======================================================

// File: authRoutes.js

// Purpose: Defines authentication-related API routes

// Project: E-Rakshak

// ======================================================

If another developer opens this file after 6 months, they immediately know:
Which file it is
What it does
Which project it belongs to


## 2. Import Express
 | const express = require("express"); | ... |
Express provides all routing features.
it's like we Think of Express as our backend framework.

## 3. Create Router
const router = express.Router();

app is the entire application.
But here we only want authentication routes.
So Express provides:
Router()

Think of it like:

Express Application
 ↓
Authentication Router 
 ↓
Health Router 
 ↓
Analysis Router
↓
Settings Router


## 4. Import Controller
const authController = require("../controllers/authController");

This file should only define routes.
It should not contain business logic.
Professional architecture is:

Request
↓
Route
↓
Controller
↓
Service
↓
Database

## 5. Route
router.post("/google", authController.googleLogin);

router.post   Means: POST Request
Ex. POST /auth/google

authController.googleLogin
This is NOT calling the function now.
It is only saying:
"When someone sends a POST request to /google, execute googleLogin()."

## 6. Export
module.exports = router;
Other files cannot use this router unless we export it.

Later in app.js we'll write:  const authRoutes = require("./routes/authRoutes");
That line only works because we exported the router.

# 🎯 Flow
Suppose a user clicks: Continue with Google

## The flow becomes: 
Frontend
↓
POST /auth/google
↓
authRoutes.js
↓
authController.js
↓
googleAuthService.js
↓
Supabase
↓
Response
↓
Frontend
