const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async MicrosoftTranslate(word = String, InputLanguage = String, OutputLanguage = Array) {
        try {
            const translate = await axios({
                baseURL: process.env.MICROSOFT_API_COGNITIVE_ENDPOINT,
                url: '/translate',
                method: 'post',
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.MICROSOFT_TRANSLATOR_SUBSCRIPTION_KEY,
                    'Ocp-Apim-Subscription-Region': process.env.MICROSOFT_TRANSLATOR_LOCATION,
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuidv4().toString()
                },
                params: {
                    'api-version': '3.0',
                    'from': InputLanguage,
                    'to': OutputLanguage
                },
                data: [{
                    'text': word
                }],
                responseType: 'json'
            })
            return translate['data'][0]['translations']
        }
        catch (error) {
            return error['response']['data']
        }
    }
}