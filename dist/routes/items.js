"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _item = _interopRequireDefault(require("../model/item.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = new _express.default.Router();

/** GET /  => 
 * { items: [ { id, item_name, currency, cost ,url }, ...] }
 *
 * 
 * can filter on provided search filters:
 *  - currency 
 *  - itemNameLike (will find case-insensitive, partial matches)
 *  - minCost
 *  - maxCost
 */

router.get('/', async function (req, res, next) {
  try {
    const {
      currency,
      itemNameLike,
      minCost,
      maxCost
    } = req.query;
    const items = await _item.default.findAll({
      currency,
      itemNameLike,
      minCost,
      maxCost
    });
    return res.json({
      items
    });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  =>  { item }
 * 
 *  item is { id, item_name, currency, cost, url } 
 */

router.get('/:id', async function (req, res, next) {
  try {
    const item = await _item.default.get(req.params.id);
    return res.json({
      item
    });
  } catch (err) {
    return next(err);
  }
});
var _default = exports.default = router;