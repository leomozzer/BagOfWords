const { GenerateRandomWords } = require("../../src/models/Words")
const { HandleWords } = require("../../src/handlers/WordHandler");
const { TableParams, PutItem } = require('../../src/models/aws/DynamoDB');

describe('Mongo Functions', () => {
    it('Create Item', async () => {
        const words = await HandleWords(GenerateRandomWords(3))
        //expect(words.length).toBeGreaterThan(0)
        // console.log(words)
        // words.forEach(word => {
        //     console.log(word)
        // });
        for await (const word of words) {
            console.log(word)
        }
    })
})