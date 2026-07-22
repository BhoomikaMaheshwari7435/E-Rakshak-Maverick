const smsService = require("../services/sms/smsService");

exports.scanSMS = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "SMS message is required."
            });
        }

        const result = smsService.scanSMS(message);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("SMS Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to scan SMS."
        });

    }

};