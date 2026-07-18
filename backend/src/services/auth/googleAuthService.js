// ======================================================
// File: googleAuthService.js
// Purpose: Verify Google ID Token and Authenticate User
// Project: E-Rakshak
// ======================================================

const { OAuth2Client } = require("google-auth-library");
const supabase = require("../../config/supabaseClient");

const client = new OAuth2Client();

/**
 * Verify Google ID Token
 * Create user if not exists
 * Return authenticated user
 */
exports.verifyGoogleUser = async (idToken) => {
    try {

        // Verify token with Google
        const ticket = await client.verifyIdToken({
            idToken: idToken
        });

        // Extract Google user details
        const payload = ticket.getPayload();

        // Check if user already exists
        let { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("google_id", payload.sub)
            .single();

        // If user doesn't exist, create one
        if (!user) {

            const { data: newUser, error: insertError } = await supabase
                .from("users")
                .insert([
                    {
                        google_id: payload.sub,
                        full_name: payload.name,
                        email: payload.email,
                        profile_picture: payload.picture,
                        preferred_language: "English"
                    }
                ])
                .select()
                .single();

            if (insertError)
                throw insertError;

            user = newUser;
        }

        return {
            success: true,
            message: "Authentication successful.",
            user
        };

    } catch (error) {

        throw new Error(error.message);

    }
};