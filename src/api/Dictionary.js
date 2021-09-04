const axios = require('axios');

module.exports = {
    async WordDefinition(language = String, word = String) {
        try {
            const getWord = await axios.get(`${process.env.DICTIONARY_API}/${language}/${word}`)
            return getWord['data']
        }
        catch (error) {
            return error['response']['data'];
        }
    }
}