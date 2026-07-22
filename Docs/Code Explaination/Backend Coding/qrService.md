# qrService.js

## Purpose

Handles QR code processing.

## Imported Libraries

### Jimp

Reads image files and converts them into pixel data.

### jsQR

Scans image pixels to detect and decode QR codes.

### riskAnalyzer

Analyzes extracted QR text.

### reportService

Formats the analysis into a frontend-friendly report.

## Overall Flow

QR Image
↓
Jimp
↓
jsQR
↓
Extracted Text
↓
riskAnalyzer
↓
reportService





# Code
# Part 1 – Imports
const Jimp = require("jimp");
const jsQR = require("jsqr");

const riskAnalyzer = require("../analysis/riskAnalyzer");
const reportService = require("../report/reportService");


## 1. Jimp   :   
_const Jimp = require("jimp");_

Jimp reads image files. **Think of it like:**
paymentQR.png   =>   Jimp   =>   Image Pixels
**Without Jimp, Node.js only knows it's a file.**  but It doesn't know what's inside.


## 2. jsQR
_const jsQR = require("jsqr");_

This library **looks at the image pixels and asks:** _"Is there a QR Code here?"_
**If yes:**    QR Image   =>   https://upi.paytm.com/pay?id=123


## 3. riskAnalyzer
_const riskAnalyzer = require("../analysis/riskAnalyzer");_

**Whatever text we extract from the QR:**   _https://fake-bank.xyz_
gets analyzed here.


## 4. reportService
_const reportService = require("../report/reportService");_
After analysis, we generate the final report for the frontend.



# 🚀 Part 2 — Create the Scanner Function
## Code :
exports.scanQRCode = async (file) => {

    // Read uploaded image
    const image = await Jimp.read(file.path);

    // Convert image into raw pixel data
    const { data, width, height } = image.bitmap;

    // Decode QR Code
    const qrResult = jsQR(
        new Uint8ClampedArray(data),
        width,
        height
    );

    // QR Code not found
    if (!qrResult) {
        throw new Error("No QR Code found in the uploaded image.");
    }

};






## 1.  _exports.scanQRCode = async (file) => {_
This is the function our controller calls.

**Controller does:**
qrService.scanQRCode(req.file);
Notice...  The controller doesn't send the whole request.
**It only sends:**  _req.file_
Because that's all the service needs.



## 2. _const image = await Jimp.read(file.path);_
**Suppose Multer stored:**  uploads/17532567891.png
Jimp opens that image.
**Think of it like:**    Image File   =>    Jimp   =>   Image Object


## 3. _const { data, width, height } = image.bitmap;_
Images are actually made of tiny colored squares called pixels.
**Example:**
🟥🟥🟩🟩

🟦🟨⬜⬛

🟧🟪🟥🟩

**Jimp gives us:**   Pixel Data + Width + Height



## 4. _new Uint8ClampedArray(data)_
This looks scary... But don't worry.
jsQR requires the pixels in a specific format called:  **Uint8ClampedArray**
So we're simply converting Jimp's pixel data into the format that jsQR understands.

**Think of it like:**   English   =>   Translator   =>   French
Same information.  Different format.



## 5. _const qrResult = jsQR(...)_
This is the magic. **It checks:**  Is there a QR Code?   =>   YES   =>   Extract the hidden text

**For example:** QR Image  =>  Output (_https://google.com_)
or  _upi://pay?pa=..._



## 6. _if (!qrResult)_
**Suppose someone uploads:** Dog.jpg (No QR exists.)
**Instead of crashing:**  Throw Error   =>   Controller   =>   Return Error Response





# 🚀 THE FINAL PART OF qrService.js
## Code:
    // Extract text from QR Code
    const extractedText = qrResult.data;

    // Analyze the extracted text
    const analysisResult = riskAnalyzer.analyze(extractedText);

    // Generate formatted report
    const report = reportService.generateReport(analysisResult);

    return {
        extractedText,
        report
    };

};




## 1. _const extractedText = qrResult.data;_
**Suppose the QR contains:**
https://fake-bank-login.xyz

**Now:**  _extractedText_   contains exactly that text.


## 2. _riskAnalyzer.analyze(extractedText);_
**Our analyzer now checks:**  HTTP, Short URLs, Scam keywords, Risk Score, Risk Level, Category
**_This is the brain of E-Rakshak._**


## 3. _reportService.generateReport(...)_
**Instead of sending raw analysis:**
{
    "riskScore":80
}
we send a beautiful structured report.



## 4. 
_return {
    extractedText,
    report
};_

**The controller receives:**
const result = await qrService.scanQRCode(req.file);
**and sends it to the frontend.**


