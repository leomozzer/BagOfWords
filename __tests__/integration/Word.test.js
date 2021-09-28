const request = require('supertest');
const app = require('../../src/app');

let testApp;

const makeGetRequest = path => new Promise((resolve, reject) => {
    testApp.get(path).end((err, res) => {
        if (err) {
            return reject(err);
        }

        resolve(res);
    });
});

beforeEach(() => {
    testApp = request(app);
});

describe('Words Routes', () => {
    it('Word', async () => {
        const word = await makeGetRequest('/word')
        expect(word.status).toBe(200)
    })
})