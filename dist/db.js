"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pg = _interopRequireDefault(require("pg"));
var _config = require("./config.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Client
} = _pg.default;
let db;
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: (0, _config.getDatabaseUri)(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: (0, _config.getDatabaseUri)()
  });
}
db.connect();
var _default = exports.default = db;