"use strict";

var _expressErrors = require("../expressErrors");
var _item = _interopRequireDefault(require("./item"));
var _testCommon = require("./_testCommon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
beforeAll(_testCommon.commonBeforeAll);
beforeEach(_testCommon.commonBeforeEach);
afterEach(_testCommon.commonAfterEach);
afterAll(_testCommon.commonAfterAll);

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let items = await _item.default.findAll();
    expect(items).toEqual([{
      id: 1,
      itemName: "item1",
      currency: "1",
      cost: 100,
      url: "www.item1.com"
    }, {
      id: 2,
      itemName: "item2",
      currency: "2",
      cost: 200,
      url: "www.item2.com"
    }, {
      id: 3,
      itemName: "item3",
      currency: "1",
      cost: 300,
      url: "www.item3.com"
    }, {
      id: 4,
      itemName: "item4",
      currency: "1",
      cost: 400,
      url: "www.item4.com"
    }, {
      id: 5,
      itemName: "item5",
      currency: "1",
      cost: 500,
      url: "www.item5.com"
    }, {
      id: 6,
      itemName: "item6",
      currency: "1",
      cost: 600,
      url: "www.item6.com"
    }]);
  });
  test("works: filter by currency", async function () {
    let items = await _item.default.findAll({
      currency: "1"
    });
    expect(items).toEqual([{
      id: 1,
      itemName: "item1",
      currency: "1",
      cost: 100,
      url: "www.item1.com"
    }, {
      id: 3,
      itemName: "item3",
      currency: "1",
      cost: 300,
      url: "www.item3.com"
    }, {
      id: 4,
      itemName: "item4",
      currency: "1",
      cost: 400,
      url: "www.item4.com"
    }, {
      id: 5,
      itemName: "item5",
      currency: "1",
      cost: 500,
      url: "www.item5.com"
    }, {
      id: 6,
      itemName: "item6",
      currency: "1",
      cost: 600,
      url: "www.item6.com"
    }]);
  });
  test("works: filter by itemNameLike", async function () {
    let items = await _item.default.findAll({
      itemNameLike: "ITEM2"
    });
    expect(items).toEqual([{
      id: 2,
      itemName: "item2",
      currency: "2",
      cost: 200,
      url: "www.item2.com"
    }]);
  });
  test("works: filter by minCost", async function () {
    let items = await _item.default.findAll({
      minCost: 400
    });
    expect(items).toEqual([{
      id: 4,
      itemName: "item4",
      currency: "1",
      cost: 400,
      url: "www.item4.com"
    }, {
      id: 5,
      itemName: "item5",
      currency: "1",
      cost: 500,
      url: "www.item5.com"
    }, {
      id: 6,
      itemName: "item6",
      currency: "1",
      cost: 600,
      url: "www.item6.com"
    }]);
  });
  test("works: filter by maxCost", async function () {
    let items = await _item.default.findAll({
      maxCost: 300
    });
    expect(items).toEqual([{
      id: 1,
      itemName: "item1",
      currency: "1",
      cost: 100,
      url: "www.item1.com"
    }, {
      id: 2,
      itemName: "item2",
      currency: "2",
      cost: 200,
      url: "www.item2.com"
    }, {
      id: 3,
      itemName: "item3",
      currency: "1",
      cost: 300,
      url: "www.item3.com"
    }]);
  });
  test("works: filter by minCost and maxCost", async function () {
    let items = await _item.default.findAll({
      minCost: 200,
      maxCost: 400
    });
    expect(items).toEqual([{
      id: 2,
      itemName: "item2",
      currency: "2",
      cost: 200,
      url: "www.item2.com"
    }, {
      id: 3,
      itemName: "item3",
      currency: "1",
      cost: 300,
      url: "www.item3.com"
    }, {
      id: 4,
      itemName: "item4",
      currency: "1",
      cost: 400,
      url: "www.item4.com"
    }]);
  });
  test("Bad request if minCost > maxCost", async function () {
    try {
      await _item.default.findAll({
        minCost: 400,
        maxCost: 200
      });
      fail();
    } catch (err) {
      expect(err instanceof _expressErrors.BadRequestError).toBeTruthy();
    }
  });
  test("not found if no items found", async function () {
    try {
      await _item.default.findAll({
        itemNameLike: "no-such-item"
      });
      fail();
    } catch (err) {
      expect(err instanceof _expressErrors.NotFoundError).toBeTruthy();
    }
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let item = await _item.default.get(1);
    expect(item).toEqual({
      id: 1,
      itemName: "item1",
      currency: "1",
      cost: 100,
      url: "www.item1.com"
    });
  });
  test("not found if no such item", async function () {
    try {
      await _item.default.get(1000);
      fail();
    } catch (err) {
      expect(err instanceof _expressErrors.NotFoundError).toBeTruthy();
    }
  });
});