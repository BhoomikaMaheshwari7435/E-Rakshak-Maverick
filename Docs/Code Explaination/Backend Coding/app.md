# App.js

## Purpose

The `app.js` file is the central configuration file of the Express application.

It creates the Express app, registers middleware, and connects all route modules.

## Responsibilities

- Configure Express middleware.
- Enable CORS.
- Enable Helmet for security.
- Enable Morgan for request logging.
- Parse JSON request bodies.
- Register application routes.

## Route Registration

```javascript
app.use("/", healthRoutes);
app.use("/auth", authRoutes);
```

This tells Express:

- `/` → Health APIs
- `/auth` → Authentication APIs

## Why Register Routes?

Instead of writing all APIs inside `app.js`, routes are divided into separate files to improve readability, scalability, and maintenance.

## Architecture

Client
↓
Server
↓
App
↓
Routes
↓
Controller
↓
Service
↓
Database / External APIs

**What is the difference between app.use() and router.post()?**
app.use() registers a group of routes or middleware with the Express application. router.post() defines a specific POST endpoint inside a route module. Together they allow us to organize APIs in a modular way.
