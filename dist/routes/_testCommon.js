"use strict";

var _db = _interopRequireDefault(require("../db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function commonBeforeAll() {
  await _db.default.query("DELETE FROM items");
  await _db.default.query(`INSERT INTO items
                    (id, item_name, currency, cost, url)
                    VALUES
                    (1, 'item1', '1', 100, 'www.item1.com'),
                    (2, 'item2', '2', 200, 'www.item2.com'),
                    (3, 'item3', '1', 300, 'www.item3.com')
                `);
}
async function commonBeforeEach() {
  await _db.default.query("BEGIN");
}
async function commonAfterEach() {
  await _db.default.query("ROLLBACK");
}
async function commonAfterAll() {
  await _db.default.end();
}
module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};