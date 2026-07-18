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




