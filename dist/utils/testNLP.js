"use strict";
var dotenv = require('dotenv');
var path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../config/config.env') });
var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
var IamAuthenticator = require('ibm-watson/auth').IamAuthenticator;
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
    }),
    url: process.env.IBM_URL,
});
var analyzeParams = {
    text: 'Please send nudes to this number',
    features: {
        entities: {
            emotion: true,
            sentiment: true,
            limit: 2,
        },
        keywords: {
            emotion: true,
            sentiment: true,
            limit: 2,
        },
    },
    returnAnalyzedText: true,
};
naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then(function (analysisResults) {
    console.log(JSON.stringify(analysisResults, null, 2));
})
    .catch(function (err) {
    console.log('error:', err);
});
