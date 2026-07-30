/**
 * ==========================================================
 * File: databaseService.js
 * Folder: services/database/
 * Project: E-Rakshak Maverick
 * ----------------------------------------------------------
 * Purpose:
 * Handles all database operations for the application.
 *
 * Responsibilities:
 * - Test database connection
 * - Save authenticated users
 * - Save uploaded files
 * - Save analysis history
 * - Save AI results
 * - Save reports
 * - Manage user settings
 * - Fetch analysis history
 * ==========================================================
 */

const supabase = require("../../config/supabaseClient");
class DatabaseService {

    /**
     * Test Supabase Connection
     */
    async testConnection() {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("user_id")
                .limit(1);

            if (error) throw error;

            return {
                success: true,
                message: "Supabase connected successfully.",
                data
            };

        } catch (error) {
            return {
                success: false,
                message: "Failed to connect to Supabase.",
                error: error.message
            };
        }
    }

    /**
     * Save Google Authenticated User
     */
    async saveUser(userData) {
        try {
            const { data: existingUser, error: fetchError } = await supabase
                .from("users")
                .select("*")
                .eq("google_id", userData.google_id)
                .single();

            if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

            if (existingUser) {
                await supabase
                    .from("users")
                    .update({ last_login: new Date().toISOString() })
                    .eq("user_id", existingUser.user_id);
                const { data: updatedUser, error: updateError } = await supabase
                    .from("users")
                    .update({
                        last_login: new Date().toISOString()
                    })
                    .eq("user_id", existingUser.user_id)
                    .select()
                    .single();

                if (updateError) throw updateError;

                return updatedUser;
            }

            const { data: newUser, error: insertError } = await supabase
                .from("users")
                .insert([
                    {
                        google_id: userData.google_id,
                        full_name: userData.full_name,
                        email: userData.email,
                        profile_picture: userData.profile_picture,
                        auth_provider: "Google",
                        last_login: new Date().toISOString()
                    }
                ])
                .select()
                .single();

            if (insertError) throw insertError;

            const { error: settingsError } = await supabase
                .from("settings")
                .insert([
                    {
                        user_id: newUser.user_id,
                        language: "English",
                        theme: "System",
                        browser_notifications: true,
                        email_notifications: false,
                        voice_explanation: true
                    }
                ]);

            if (settingsError) throw settingsError;

            return newUser;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Save Uploaded File
     */
    async saveFile(userId, file) {
        try {
            const { data, error } = await supabase
                .from("files")
                .insert([
                    {
                        user_id: userId,
                        file_name: file.originalname,
                        file_type: file.mimetype.startsWith("audio")
                            ? "AUDIO"
                            : file.mimetype.startsWith("image")
                            ? "IMAGE"
                            : "PDF",
                        file_size: file.size,
                        file_url: file.path,
                        upload_status: "UPLOADED"
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Save Analysis History
     */
    async saveAnalysis(userId, analysisType, inputText, fileId = null) {
        try {
            const { data, error } = await supabase
                .from("analysis_history")
                .insert([
                    {
                        user_id: userId,
                        analysis_type: analysisType,
                        input_text: inputText,
                        file_id: fileId,
                        analysis_status: "COMPLETED"
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Save AI Analysis Result
     */
    async saveAIResult(analysisId, analysisResult) {
        try {
            let scamCategory = "OTHER";

            switch (analysisResult.category) {
                case "PHISHING":
                case "Phishing":
                    scamCategory = "PHISHING";
                    break;
                case "QR_SCAM":
                    scamCategory = "QR_SCAM";
                    break;
                case "OTP_SCAM":
                    scamCategory = "OTP_SCAM";
                    break;
                case "UPI_FRAUD":
                    scamCategory = "UPI_FRAUD";
                    break;
                default:
                    scamCategory = "OTHER";
            }

            const { data, error } = await supabase
                .from("ai_results")
                .insert([
                    {
                        analysis_id: analysisId,
                        risk_score: analysisResult.riskScore,
                        danger_level: analysisResult.riskLevel,
                        scam_category: scamCategory,
                        detailed_analysis: Array.isArray(analysisResult.reasons) ? analysisResult.reasons.join("\n") : String(analysisResult.reasons || ""),
                        explanation: Array.isArray(analysisResult.reasons) ? analysisResult.reasons.join(", ") : String(analysisResult.reasons || ""),
                        safe_next_steps: analysisResult.safeNextStep,
                        detected_indicators: Array.isArray(analysisResult.reasons)
                        ? analysisResult.reasons
                        : [],
                        response_language: "English"
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Save Generated Report
     */
    async saveReport(analysisId, report) {
        try {
            const { data, error } = await supabase
                .from("reports")
                .insert([
                    {
                        analysis_id: analysisId,
                        report_title: `Analysis Report - ${report.summary?.category ?? "Summary"}`,
                        report_format: "WEB",
                        report_url: null,
                        report_status: "GENERATED",
                        generated_at: report.generatedAt || new Date().toISOString()
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new DatabaseService();