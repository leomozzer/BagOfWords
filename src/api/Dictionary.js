const axios = require('axios');
require('dotenv').config()

module.exports = {
    async WordDefinition(language = String, word = String) {
        try {
            const getWord = await axios.get(`${process.env.DICTIONARY_API}/${language}/${word}`)
            return getWord['data']
        }
        catch (error) {
            throw error
        }
    }
}