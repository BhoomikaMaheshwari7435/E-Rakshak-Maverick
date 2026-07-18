## Authentication Controller

### File

backend/src/controllers/authController.js

### Responsibilities

- Receives authentication requests from authentication routes.
- Extracts the Google ID Token from the request body.
- Validates required request data.
- Calls the Google Authentication Service.
- Returns HTTP responses to the client.
- Handles unexpected server errors.

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Authentication successful |
| 400 | Missing or invalid Google ID Token |
| 500 | Internal server error |

### Architecture Flow

Frontend
↓
Authentication Route
↓
Authentication Controller
↓
Google Authentication Service
↓
Supabase Database


## 1. Import Service
### Code Line : const googleAuthService = require("../services/auth/googleAuthService");
The controller should not verify Google tokens or talk to the database.
Its job is only to coordinate.

## 2. Export Function
### Code : exports.googleLogin = async (req, res) => {
This function needs to be used in another file.
Remember: router.post("/google", authController.googleLogin);
That line works because we exported googleLogin.

## 3. req and res
### (req, res)
These are provided by Express.
req
Contains everything sent by the frontend.
**Example:** {    "id_token": "eyJhbGc..."  }
We read it from: req.body

**res**
Used to send a response back.
**Example:** res.status(200).json(...)


## 4. async
### code : async
Google verification and database operations take time. We don't want to freeze the server while waiting.
So we write asynchronous code.

## 5. Extract Token
### code : const { id_token } = req.body;
**If frontend sends:** {    "id_token":"ABC123"   }
Then   : id_token 
contains : ABC123

 ## 6. Validation
 ### if (!id_token)
Suppose frontend forgets to send the token. Instead of crashing,
**we immediately reply:** 400 Bad Request
**Meaning: ** Client sent an invalid request.

## 7. Call Service
### await googleAuthService.verifyGoogleUser(id_token);
Controller says: "Service, here's the token. Please verify it."
The controller doesn't know how verification works.  That's the Service's responsibility.

## 8. Success
### code : return res.status(200).json(result);
Means : Everything worked.Send the result back.

## 9. Catch
### code : catch(error)

**If anything unexpected happens:**
Google server down
Database error  
Coding mistake

we send
500
**Meaning :** Internal Server Error


| Code | Meaning               | Who made the mistake?    |
| ---- | --------------------- | ------------------------ |
| 200  | Success               | Nobody                   |
| 400  | Bad Request           | Client/User              |
| 401  | Unauthorized          | User isn't authenticated |
| 404  | Not Found             | API doesn't exist        |
| 500  | Internal Server Error | Backend                  |
