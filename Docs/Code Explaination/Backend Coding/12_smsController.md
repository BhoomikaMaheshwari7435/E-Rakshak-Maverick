# smsController.js

## Purpose

Handles incoming SMS scan requests.

## Responsibilities

- Read the SMS text from `req.body`
- Validate that a message exists
- Call `smsService`
- Return the result to the frontend
- Handle errors

## Flow

Frontend
↓
Controller
↓
smsService
↓
Controller
↓
Frontend



# Code:
const smsService = require("../services/sms/smsService");

exports.scanSMS = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "SMS message is required."
            });
        }

        const result = smsService.scanSMS(message);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("SMS Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to scan SMS."
        });

    }

};






## 1. Import
_const smsService = require("../services/sms/smsService");_
Exactly like QR. **Instead of:**  _qrService_
we're importing  _smsService_


## 2. _exports.scanSMS = async (req, res) => {_
**This is the function that runs when someone calls:**  _POST /api/scan/sms_


## 3. _const { message } = req.body;_
**Instead of**  _req.file_
**we now use :** _req.body_
because the frontend sends JSON.
**Example:**  _{   "message": "Congratulations! You won ₹10,000. Click here..."  }_

So, message becomes  **Congratulations! You won ₹10,000...**


## 4. Validation
_if (!message)_

**Suppose user sends**  {}   or  _{    "message": ""   }_
**We immediately return** 400 Bad Request
instead of calling the service. Controllers should always validate the incoming request.


## 5. _const result = smsService.scanSMS(message);_
Here We send only the message. Not  _req_  Not  _res_  Only the data the service needs.


## 6. _return res.status(200).json(...)_
Same as QR. Controller sends the final response.
