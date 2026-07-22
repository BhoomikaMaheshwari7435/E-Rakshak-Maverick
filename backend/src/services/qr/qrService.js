const Jimp = require("jimp");
const jsQR = require("jsqr");

const riskAnalyzer = require("../analysis/riskAnalyzer");
const reportService = require("../report/reportService");

// Part 2 Create the Scanner Function
exports.scanQRCode = async (file) => {

    // Read uploaded image
    const image = await Jimp.read(file.path);

    // Convert image into raw pixel data
    const { data, width, height } = image.bitmap;

    // Decode QR Code
    const qrResult = jsQR(
        new Uint8ClampedArray(data),
        width,
        height
    );

    // QR Code not found
    if (!qrResult) {
        throw new Error("No QR Code found in the uploaded image.");
    }





// FINAL PART OF qrService.js : connect everything
    // Extract text from QR Code
    const extractedText = qrResult.data;

    // Analyze the extracted text
    const analysisResult = riskAnalyzer.analyze(extractedText);

    // Generate formatted report
    const report = reportService.generateReport(analysisResult);

    return {
        extractedText,
        report
    };

};