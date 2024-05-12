import request from 'supertest';
import app from '../app';
import { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } from './_testCommon';

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /items */

describe('GET /items', function () {
    test('works', async function () {
        const resp = await request(app).get('/items');
        expect(resp.body).toEqual({
            items: [
                {
                    id: expect.any(Number),
                    itemName: 'item1',
                    currency: '1',
                    cost: 100,
                    url: 'www.item1.com'
                },
                {
                    id: expect.any(Number),
                    itemName: 'item2',
                    currency: '2',
                    cost: 200,
                    url: 'www.item2.com'
                },
                {
                    id: expect.any(Number),
                    itemName: 'item3',
                    currency: '1',
                    cost: 300,
                    url: 'www.item3.com'
                },
            ],
        });
    });

    test('works: filtering', async function () {
        const resp = await request(app).get('/items').query({ currency: '1' });
        expect(resp.body).toEqual({
            items: [
                {
                    id: expect.any(Number),
                    itemName: 'item1',
                    currency: '1',
                    cost: 100,
                    url: 'www.item1.com'
                },
                {
                    id: expect.any(Number),
                    itemName: 'item3',
                    currency: '1',
                    cost: 300,
                    url: 'www.item3.com'
                },
            ],
        });
    });

    test('works: filtering on multiple fields', async function () {
        const resp = await request(app).get('/items').query({ currency: '2', minCost: 200 });
        expect(resp.body).toEqual({
            items: [
                {
                    id: expect.any(Number),
                    itemName: 'item2',
                    currency: '2',
                    cost: 200,
                    url: 'www.item2.com'
                },
            ],
        });
    });
});