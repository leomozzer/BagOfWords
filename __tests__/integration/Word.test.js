const request = require('supertest');
const app = require('../../src/app');

describe('Words Routes', () => {
    it('Word', async () => {
        const res = await request(app)
            .get('/word')
        expect(res.status).toBe(200)
    })
})