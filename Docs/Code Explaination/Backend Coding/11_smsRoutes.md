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
