# uploadMiddleware.js

## Purpose
Handles image uploads for the QR Scanner module.

## Responsibilities
- Accept uploaded image files
- Save images into the uploads folder
- Rename files with unique names
- Reject unsupported file formats

## Flow
Frontend
↓
Upload Image
↓
uploadMiddleware
↓
req.file
↓
Controller

## Packages Used
- multer
- path

## Supported File Types
- JPG
- JPEG
- PNG

## Output
Makes the uploaded image available as `req.file`.




## 1. Why Do We Need Multer?
Normally Express understands: JSON, Text, URL Parameters
But if a user uploads: paymentQR.png
Express cannot understand image files by itself.

Multer acts like a translator. 
Frontend  =>  Image  =>  Multer  =>  req.file  =>  Controller

Without Multer: req.file  => undefined


## 2. What is diskStorage()?
This tells Multer: "Where should I save the uploaded image?"

Here: destination: (req, file, cb) => {
       cb(null, "uploads/"); }

means  Save every uploaded image inside  : backend/uploads/


## 3. Why Rename the File?
Imagine two users upload:  qr.png
If we keep the original name:  qr.png  => Second upload  =>  Old file overwritten ❌

Instead:  Date.now()
creates something like:  1753074567821.png
Every file becomes unique.


## 4. What is fileFilter?
Suppose someone uploads: virus.exe, notes.pdf (Should our scanner accept it?  :  NO)
Only : photo.jpg, photo.jpeg, photo.png will be accepted.


## 5. 5️⃣ What Gets Exported?
### module.exports = upload;

This exports the configured Multer middleware.
Later, in qrRoutes.js, we'll use:  upload.single("qrImage")
which means:  Accept one image whose field name is "qrImage".

🎯 Flow After This File
User

↓

Upload Image

↓

uploadMiddleware

↓

req.file

↓

Controller

↓

qrService
