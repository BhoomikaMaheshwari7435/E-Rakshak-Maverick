# Quick Quiz 
## 1️⃣ What does this line do?
**const qrService = require("../services/qr/qrService");**
My Ans. : _This line sent the request to service to execute._
Correct Ans. : This line does not send the request.  It imports the service into this file.
Think of it like this: **Controller  =>  "Hey Node.js, 
                                          bring me qrService.js."    =>    Now I can use its functions.**



## 2️⃣ Why are we using:
**async (req, res)**
My Ans. : _req get the responses from frontend and res give the response_
Currect Ans. : Same as Mine & **Remember forever:  req = Incoming data,    res = Outgoing data**



## 3️⃣ What is stored inside:
**const result**
after this line?
**const result = await qrService.scanQRCode(req.body);**
My Ans. : _we store the response req get as we read from req.body_
Currect Ans. : result stores what the Service returns, not req.body.
Flow: req.body  =>  Service  =>  Service works  =>  Returns Result  =>  Stored inside    Result




## 4️⃣ Why do we use:
**return res.status(200).json(...)**
instead of just:   **return result;**
My Ans. : _it's giving 200 response..._
Currect Ans. : Why not simply do:  return result;
Because...The browser, frontend or mobile app cannot understand   _return result;_
Only the controller knows how to send an HTTP Response.
**So we send:**   res.status(200).json(...)
That creates a proper HTTP response.

**Think of it like:**  Service  =>  Plain JavaScript Object  =>  Controller  =>  Controller  =>  HTTP Response
  =>  Frontend



## 5️⃣ Why do we have:
try {
   ...
}
catch(error){
   ...
}

My Ans. : _to caught errors and exeptions to handle_
Currect Ans. : try-catch protects your application.  It prevents one error from crashing the entire backend.
**Professional backend = Always use try-catch around async operations.**




# Code : 
const qrService = require("../services/qr/qrService");

/**
 * @function scanQRCode
 * @description Receives a QR scan request from the Route,
 * sends it to the Service for processing,
 * and returns the final response to the client.
 */
exports.scanQRCode = async (req, res) => {
    try {

        // Send request data to the Service
        const result = await qrService.scanQRCode(req.body);

        // Return success response
        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("QR Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to scan QR Code."
        });

    }
};




# qrController.js

## Purpose

The QR Controller receives requests from the Route, sends them to the QR Service, and returns the final HTTP response to the client.

## Responsibilities

- Receives request data (`req`).
- Calls the QR Service to process the request.
- Waits for the Service to finish.
- Returns a success response (200).
- Handles unexpected errors using `try-catch`.
- Returns an error response (500) if something goes wrong.

## Flow

Client Request
↓
qrController.js
↓
qrService.js
↓
Result
↓
HTTP Response

## Key Concepts

- `req` contains data sent by the client.
- `res` sends data back to the client.
- `async/await` waits for the Service to complete.
- `try-catch` prevents the server from crashing due to runtime errors.




# New Updated Code Changed From Here.......
# Code

const qrService = require("../services/qr/qrService");

exports.scanQRCode = async (req, res) => {
    try {

        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a QR code image."
            });
        }

        // Send uploaded image to service
        const result = await qrService.scanQRCode(req.file);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("QR Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to scan QR Code."
        });
    }
};






## Change 1  Earlier we had:
_req.body_
**Now We Have:**  _req.file_

### Why?  Earlier our API expected something like:
_{   "text":"Hello"  }_

### But now users upload: 
_paymentQR.png_
**So after Multer processes the request:** _req.file_  contains information about the uploaded image.


## What does req.file contain?
**Something like:**
{
   filename: "1753245678.png",
   originalname: "paymentQR.png",
   mimetype: "image/png",
   destination: "uploads/",
   path: "uploads/1753245678.png"
}

_This object is exactly what we'll pass to qrService.js._


## Change 2 : Before sending anything to the service, we added:
_if (!req.file)_

**Why? Imagine the frontend accidentally sends no image.**
**Without this check:**  qrService   =>   tries to read image   =>   Crash ❌

**Instead:** No image   =>   400 Bad Request   =>   "Please upload a QR code image."

_Much safer._

## Our Flow Now:
User

↓

Upload Image

↓

uploadMiddleware

↓

req.file

↓

qrController

↓

qrService
