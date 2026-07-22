exports.generateReport = (analysisResult) => {

    return {

        generatedAt: new Date().toISOString(),

        summary: {
            riskScore: analysisResult.riskScore,
            riskLevel: analysisResult.riskLevel,
            category: analysisResult.category
        },

        details: {
            reasons: analysisResult.reasons,
            safeNextStep: analysisResult.safeNextStep
        }

    };

};