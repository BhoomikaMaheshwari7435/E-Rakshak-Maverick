// ======================================================
// File: server.js
// Purpose: Start the Express server and verify Supabase
// ======================================================

require("dotenv").config();

const app = require("./app");
const supabase = require("./config/supabaseClient");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Test database connection
        const { error } = await supabase
            .from("users")
            .select("user_id")
            .limit(1);

        if (error) {
            console.error("❌ Supabase connection failed:", error.message);
        } else {
            console.log("✅ Supabase connected successfully.");
        }

        app.listen(PORT, () => {
            console.log(`🚀 E-Rakshak Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Server startup failed:", err.message);
    }
}

startServer();