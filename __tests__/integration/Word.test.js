const { default: axios } = require('axios');
const request = require('supertest');
const app = require('../../src/app');

const server = app.listen(80, "http://127.0.0.1", () => { })

// const server = app.listen(80, function () {
//     console.log('App listening on port ' + 80)
// });

// let testApp;

// const makeGetRequest = path => new Promise((resolve, reject) => {
//     testApp.get(path).end((err, res) => {
//         if (err) {
//             return reject(err);
//         }

//         resolve(res);
//     });
// });

// beforeEach(() => {
//     testApp = request(app);
// });

describe('Words Routes', () => {
    // it('Word', async () => {
    //     // const word = await makeGetRequest('/word')
    //     // // console.log(word)
    //     // expect(word.status).toBe(200)
    //     // // // mockAxios.get.mockImplementationOnce(() => {
    //     // // //     Promise.resolve({
    //     // // //         'data': {
    //     // // //             'results': ['Ola']
    //     // // //         }
    //     // // //     })
    //     // // // })
    //     // // const res = await request(app)
    //     // //     .get('/word')
    //     // // // console.log(res)
    //     // // expect(res.status).toBe(200)
    // })
    // test("Word", () => {
    //     const responseObject = {}
    //     const response = {
    //         json: jest.fn().mockImplementation((result) => {
    //             responseObject = result
    //         })
    //     }
    // })
    it('Word', async () => {
        // const agent = request.agent(server)
        // const res = await agent.get("/word")
        // console.log(res)
        const res = await request(server)
            .get('/word')
        expect(res.status).toBe(200)
    })
})