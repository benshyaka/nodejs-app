import dbcon from "../db/db.js"
import app from "../app"
import supertest from 'supertest'
const request = supertest(app)

describe('Db connection testing', () => {
    it('If the connection ia alive', () => {
        expect(dbcon).toEqual('Connected to database');
    });
});

it('Gets the test endpoint of /', async done => {
    const res = await request.get('/')
    done()
})