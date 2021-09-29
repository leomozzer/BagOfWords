const { GenerateRandomWords } = require("../../src/models/Words")
const { HandleWords } = require("../../src/handlers/WordHandler");

describe('Test', () => {
    it('Dictionary API', async () => {
        const words = await HandleWords(GenerateRandomWords(3))
        expect(words.length).toBeGreaterThan(0)
    })
})