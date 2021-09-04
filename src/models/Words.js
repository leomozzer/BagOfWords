const RandomWords = require('random-words');

module.exports = {
    GenerateRandomWords(number) {
        return number !== undefined ? RandomWords(number) : RandomWords(Math.floor(Math.random() * (11 - 1)) + 1)
    }
}