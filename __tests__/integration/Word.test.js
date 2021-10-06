const request = require('supertest');
const app = require('../../src/app');

describe('Words Routes', () => {
    const server = app.listen(80, "127.0.0.1")
    it('Word', async () => {
        const res = await request(server)
            .get('/word')
        expect(res.status).toBe(200)
    })
})