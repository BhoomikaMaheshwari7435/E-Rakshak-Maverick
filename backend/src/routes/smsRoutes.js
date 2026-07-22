const express = require("express");
const router = express.Router();

const smsController = require("../controllers/smsController");

router.post(
    "/scan/sms",
    smsController.scanSMS
);

module.exports = router;