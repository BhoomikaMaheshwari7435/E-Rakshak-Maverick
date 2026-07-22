# smsRoutes.js

## Purpose

Defines all SMS-related API endpoints.

## Route

POST /scan/sms

## Flow

Frontend
↓
smsRoutes
↓
smsController

## Notes

No upload middleware is required because SMS is sent as plain text instead of an image.




# Code:
const express = require("express");
const router = express.Router();

const smsController = require("../controllers/smsController");

router.post(
    "/scan/sms",
    smsController.scanSMS
);

module.exports = router;


## 1. 
_const express = require("express");
const router = express.Router();_

**Creates a new router for SMS APIs.**


## 2. _const smsController = require("../controllers/smsController");_
Imports the controller that will handle SMS requests.


## 3. 
_router.post(
    "/scan/sms",
    smsController.scanSMS
);_

**When the frontend sends:**  POST /scan/sms\
**Express calls:** _smsController.scanSMS()_
Unlike QR, there is no upload middleware because we're sending text, not a file.


## 4. _module.exports = router;_
Makes this router available so we can use it in app.js.
