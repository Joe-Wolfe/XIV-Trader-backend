"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _app = _interopRequireDefault(require("../app"));
var _testCommon = require("./_testCommon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
beforeAll(_testCommon.commonBeforeAll);
beforeEach(_testCommon.commonBeforeEach);
afterEach(_testCommon.commonAfterEach);
afterAll(_testCommon.commonAfterAll);

/************************************** GET /items */

describe('GET /items', function () {
  test('works', async function () {
    const resp = await (0, _supertest.default)(_app.default).get('/items');
    expect(resp.body).toEqual({
      items: [{
        id: expect.any(Number),
        itemName: 'item1',
        currency: '1',
        cost: 100,
        url: 'www.item1.com'
      }, {
        id: expect.any(Number),
        itemName: 'item2',
        currency: '2',
        cost: 200,
        url: 'www.item2.com'
      }, {
        id: expect.any(Number),
        itemName: 'item3',
        currency: '1',
        cost: 300,
        url: 'www.item3.com'
      }]
    });
  });
  test('works: filtering', async function () {
    const resp = await (0, _supertest.default)(_app.default).get('/items').query({
      currency: '1'
    });
    expect(resp.body).toEqual({
      items: [{
        id: expect.any(Number),
        itemName: 'item1',
        currency: '1',
        cost: 100,
        url: 'www.item1.com'
      }, {
        id: expect.any(Number),
        itemName: 'item3',
        currency: '1',
        cost: 300,
        url: 'www.item3.com'
      }]
    });
  });
  test('works: filtering on multiple fields', async function () {
    const resp = await (0, _supertest.default)(_app.default).get('/items').query({
      currency: '2',
      minCost: 200
    });
    expect(resp.body).toEqual({
      items: [{
        id: expect.any(Number),
        itemName: 'item2',
        currency: '2',
        cost: 200,
        url: 'www.item2.com'
      }]
    });
  });
});