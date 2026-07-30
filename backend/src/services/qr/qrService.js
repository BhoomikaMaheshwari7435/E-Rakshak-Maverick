const Jimp = require("jimp");
const jsQR = require("jsqr");

const riskAnalyzer = require("../analysis/riskAnalyzer");
const reportService = require("../report/reportService");
const databaseService = require("../database/databaseService");

// Part 2 Create the Scanner Function
exports.scanQRCode = async (userId, file) => {

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


    const savedFile = await databaseService.saveFile(
        userId,
        file
    );

    const analysis = await databaseService.saveAnalysis(
        userId,
        "QR",
        extractedText,
        savedFile.file_id
    );

    await databaseService.saveAIResult(
        analysis.analysis_id,
        analysisResult
    );


    await databaseService.saveReport(
        analysis.analysis_id,
        report
    );

    

    return {
        extractedText,
        report
    };

    st.divider()

    st.caption(t["footer1"])
    st.caption(t["footer2"])
    st.caption(t["footer3"])

};