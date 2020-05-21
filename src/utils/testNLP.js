const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../config/config.env') });
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// console.log(process.env.IBM_API_KEY);
// console.log(process.env.IBM_API_KEY);

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
    }),
    url: process.env.IBM_URL,
});

const analyzeParams = {
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
    .then((analysisResults) => {
        console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch((err) => {
        console.log('error:', err);
    });
