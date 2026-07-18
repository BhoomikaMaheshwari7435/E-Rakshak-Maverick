// ======================================================
// File: supabaseClient.js
// Purpose: Initialize and export the Supabase client
// Project: E-Rakshak
// ======================================================

// Load Supabase SDK
const { createClient } = require("@supabase/supabase-js");

// Read environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export client for use throughout the backend
module.exports = supabase;