"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _db = _interopRequireDefault(require("../db.js"));
var _expressErrors = require("../expressErrors.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** Related functions for items. */

class Item {
  /** Find all items.
   * 
   * returns [{ id, item_name, currency, cost, url }, ...]
   * 
   * searchFilters object s with optional keys:
   * - currency
   * - itemNameLike
   * - minCost
   * - maxCost
   *  
  **/

  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                            item_name AS "itemName",
                            currency,
                            cost,
                            url
                     FROM items`;
    let whereExpressions = [];
    let queryValues = [];

    //search filters 

    if (searchFilters.minCost > searchFilters.maxCost) {
      throw new _expressErrors.BadRequestError("Min cost cannot be greater than max cost");
    }
    if (searchFilters.minCost !== undefined) {
      queryValues.push(searchFilters.minCost);
      whereExpressions.push(`cost >= $${queryValues.length}`);
    }
    if (searchFilters.maxCost !== undefined) {
      queryValues.push(searchFilters.maxCost);
      whereExpressions.push(`cost <= $${queryValues.length}`);
    }
    if (searchFilters.itemNameLike !== undefined) {
      queryValues.push(`%${searchFilters.itemNameLike}%`);
      whereExpressions.push(`item_name ILIKE $${queryValues.length}`);
    }
    if (searchFilters.currency !== undefined) {
      queryValues.push(searchFilters.currency);
      whereExpressions.push(`currency = $${queryValues.length}`);
    }
    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }
    const itemsRes = await _db.default.query(query, queryValues);

    // if no items found, throw NotFoundError
    if (itemsRes.rows.length === 0) {
      throw new _expressErrors.NotFoundError("No items found");
    }
    return itemsRes.rows;
  }

  /** Given an item id, return data about item.
   * 
   * Returns { id, item_name, currency, cost, url }
   * 
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const itemRes = await _db.default.query(`SELECT id,
                    item_name AS "itemName",
                    currency,
                    cost,
                    url
             FROM items
             WHERE id = $1`, [id]);
    const item = itemRes.rows[0];
    if (!item) throw new _expressErrors.NotFoundError(`No item: ${id}`);
    return item;
  }
}
var _default = exports.default = Item;