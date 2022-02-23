const { GenerateRandomWords } = require("../../src/models/Words")
const { HandleWords } = require("../../src/handlers/WordHandler");
const { NewWord } = require('../../src/models/data/MongoWords')

describe('Mongo Functions', () => {
    it('Create Item', async () => {
        const words = await HandleWords(GenerateRandomWords(3))
        //expect(words.length).toBeGreaterThan(0)
        // console.log(words)
        words.forEach(word => {
            console.log(word)
        });
    })
})