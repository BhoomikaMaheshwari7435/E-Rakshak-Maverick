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


# Quize Q.s & Ans.
## Q1. Why do we need Multer if Express is already handling requests?
**My Ans. :**  Multer being a translator as Express doesn't understand png or jpg.
_Currect Ans. :_   _Express can receive the request, but it cannot process uploaded files by itself. Multer processes the uploaded image and makes it available as req.file._

## Q2. Why do we rename uploaded files using Date.now() instead of keeping the original filename?
**My Ans. :** Original name can't be repeated and every file has a unique name.
**Currect Ans. :** _Without renaming: qr.png => Another user uploads, qr.png => Old file overwritten ❌
                     With Date.now(): 1753087456123.png, 1753087489990.png so Every upload is unique. ✅_

## Q3. What will happen if a user uploads a .pdf file instead of a .png?
**My Ans. :** fileFilter rejects PDF because only png, jpg, jpeg are allowed.
**Currect Ans. :** _✔️ Perfect Ans. Exactly. This is our first security layer._


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
**Imagine two users upload:**  qr.png
**If we keep the original name:**  qr.png  => Second upload  =>  Old file overwritten ❌

**Instead:**  Date.now()
**creates something like:**  1753074567821.png
Every file becomes unique.


## 4. What is fileFilter?
Suppose someone uploads: virus.exe, notes.pdf (Should our scanner accept it?  :  NO)
**Only :** photo.jpg, photo.jpeg, photo.png will be accepted.


## 5. 5️⃣ What Gets Exported?
### module.exports = upload;

This exports the configured Multer middleware.
**Later, in qrRoutes.js, we'll use:**  upload.single("qrImage")
**which means:**  Accept one image whose field name is "qrImage".

**🎯 Flow After This File**
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
