const request = require('supertest');
const app = require('../../src/app');

describe('Words Routes', () => {
    test("Word", () => {
        const responseObject = {}
        const response = {
            json: jest.fn().mockImplementation((result) => {
                console.log(result)
                responseObject = result
            })
        }
    })
    // it('Word', async () => {
    //     const res = await request(app)
    //         .get('/word')
    //     expect(res.status).toBe(200)
    // })
})