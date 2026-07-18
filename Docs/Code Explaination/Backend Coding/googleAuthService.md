# Google Authentication Service

## Purpose

The Google Authentication Service contains the business logic for verifying a user's Google ID Token.

## Responsibilities

- Receive Google ID Token from the controller.
- Verify the token using Google's official OAuth2 library.
- Extract authenticated user information.
- Return verified user details.
- Throw an error if the token is invalid.

## Flow

Frontend
↓
Google Login
↓
ID Token
↓
Google Authentication Service
↓
Google Verification
↓
User Information
↓
Controller

## Why Service Layer?

The service layer contains business logic such as authentication and external API communication. This keeps controllers simple and makes the logic reusable.

## Security

The backend never trusts the frontend directly.

Every Google ID Token is verified with Google's servers before the user is authenticated.




## 1. Import Google Library
### code : const { OAuth2Client } = require("google-auth-library");
Google already provides a secure library to verify Google Sign-In tokens.
Instead of writing our own verification algorithm (which is risky and complex), we use Google's official library.
Rule: Never create your own authentication system when an official SDK exists.

## 2. Create Client
### code : const client = new OAuth2Client();
Think of it like thid :
Google Server

☁

↓

OAuth2Client

↓

Our Backend

This client acts as the communication bridge between our backend and Google's authentication servers.

## 3. Export Function
### code : exports.verifyGoogleUser = async (idToken) => {

Because the controller needs to call it:  googleAuthService.verifyGoogleUser(id_token);

## 4. Parameter
### Code: (idToken)
This token comes from the frontend after the user signs in with Google.
Example: eyJhbGciOiJSUzI1NiIsImtpZCI6...   Think of it as Google's digital identity card for the user.

## 5. Verify Token
### code: const ticket = await client.verifyIdToken({    idToken: idToken    });

This is the most important line. What happens?
Frontend

↓

Google Login

↓

ID Token

↓

Our Backend

↓

Google Server

↓

"Yes, this token is genuine."

If Google says it's valid, we continue. Otherwise... Exception.

## 6. Payload
### code : const payload = ticket.getPayload();
Think of the payload as opening an ID card.
Inside it are things like:
Name
Email
Profile Photo
Google User ID

## 7. Return User
### code: return {
    success: true,
    ... }

We are not storing anything in the database yet.
We're only returning the verified user details.
Later we'll insert/update them in the users table.

## 8. Catch
### Code: throw new Error("Invalid Google ID Token.");
Suppose someone sends: ABC123XYZ
instead of a real Google token. Google rejects it. So we stop immediately.
This protects our application from fake logins.

**🏗️ Complete Flow**
User clicks

↓

Continue with Google

↓

Google Login

↓

Google returns ID Token

↓

Frontend sends ID Token

↓

Route

↓

Controller

↓

GoogleAuthService

↓

Google verifies token

↓

User information returned

↓

Controller

↓

Frontend




# New Updated Code....

# Database Integration

## Purpose

After Google verifies the user's identity, the backend checks whether the user already exists in the `users` table.

## Steps

1. Verify the Google ID Token.
2. Extract the user payload.
3. Search the `users` table using the Google ID.
4. If the user exists, return the existing record.
5. If the user does not exist, create a new user.
6. Return the authenticated user data.

## Why check before inserting?

This prevents duplicate user accounts and ensures every Google account maps to a single database record.

## Supabase Methods Used

- `.from("users")` → Select the users table.
- `.select("*")` → Retrieve all columns.
- `.eq()` → Filter records.
- `.single()` → Return one object instead of an array.
- `.insert()` → Add a new user.

