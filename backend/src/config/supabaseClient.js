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


console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY:", process.env.SUPABASE_ANON_KEY?.substring(0, 20));


// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export client for use throughout the backend
module.exports = supabase;