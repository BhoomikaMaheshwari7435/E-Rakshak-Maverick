# qrRoutes.js

## Purpose
Defines all QR Scanner API routes for the E-Rakshak backend.

## Responsibilities
- Receives incoming QR scan API requests.
- Maps API endpoints to controller functions.
- Keeps routing logic separate from business logic.

## Flow
Client Request
↓
qrRoutes.js
↓
qrController.js
↓
qrService.js
↓
Response

## API

### POST /scan/qr

Purpose:
Accepts a QR scan request and forwards it to the QR Controller for processing.

## Notes
- The Route does not perform QR decoding.
- It only forwards the request to the Controller.
- Business logic belongs in the Service layer.




## 1. const express = require("express");

This imports the Express framework into our file. Without this line, Express functions like Router() would not exist.
**Think of it like:** "Hey Node.js, I want to use Express in this file."


## 2.  const router = express.Router();
This creates a Router Object.  Think of a Router as a mini Express application.
Instead of writing all APIs inside app.js, we divide them into separate files.
**Example:**   Authentication APIs  =>   authRoutes.js
               QR APIs     =>     qrRoutes.js
               SMS APIs    =>     smsRoutes.js

## 3. const qrController = require("../controllers/qrController");
 This imports the QR Controller.
 Client  =>  Route  =>  Controller  =>  Service  => Database

** The route never performs the scan itself.**
Its only job is to say:   _"Controller... someone called me. Please handle this."_

## 4.
/**
 * @route POST /scan/qr
 * @desc Scan and analyze QR Code
 * @access Private

 */

These are documentation comments.  They don't affect the program.  They're useful because:
Developers understand the API quickly.
Documentation tools (like Swagger) can generate API docs from comments like these.


## 5. router.post("/qr", qrController.scanQRCode);
This is the most important line in the file.
Let's break it down.

**router** :  The Router object we created earlier.

**.post()**
**This means:**  "When someone sends a POST request, run this function."
**Examples:** POST /login,       POST /register,         POST /scan/qr
_POST is used when we send data to the server.  Here, the user sends a QR image._


**qrController.scanQRCode**
This is the function that will execute.
**Flow:** POST /scan/qr  =>  Route  =>  scanQRCode()  =>  Service  =>  Response
Notice that the route doesn't know how to scan a QR code.
It simply forwards the request.


## 6. module.exports = router;
This exports the Router.
**Without this line:** app.use("/scan", qrRoutes);

_would fail because qrRoutes would be undefined.
So this line makes the Router available to other files._



**🧠 Overall Flow**
User  =>  POST /scan/qr  =>  qrRoutes.js  =>  qrController.js  =>  qrService.js  =>  AI Analysis  =>  Response


# Change of the code From Here...

# qrRoutes.js

## Purpose
Defines the QR Scanner API endpoint.

## Endpoint

POST /scan/qr

## Middleware Used

upload.single("qrImage")

## Flow

Client
↓
Upload Image
↓
Multer Middleware
↓
Controller
↓
QR Service

## Notes

The uploaded image is available as `req.file`.

The frontend must send the image using the field name `qrImage`.


## What's New?  There are only two new lines here.
### 1️. Import the middleware
### const upload = require("../middleware/uploadMiddleware");
**This imports the Multer configuration that we created.**

### Use the middleware  
upload.single("qrImage")
_This tells Express: **"Before going to the controller, accept one uploaded image whose field name is qrImage."**_

**So the flow becomes:**
User Uploads Image

↓

upload.single("qrImage")

↓

req.file is created

↓

qrController


### Why "qrImage"?
**Because when the frontend sends the image, it will send it like this:**
_formData.append("qrImage", selectedFile);_  **The name must match.**

**If the frontend sends:** _**formData.append("image", selectedFile);**_

**then:** _upload.single("qrImage")_  won't find it.
