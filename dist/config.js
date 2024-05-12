"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET_KEY = exports.PORT = void 0;
exports.getDatabaseUri = getDatabaseUri;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const SECRET_KEY = exports.SECRET_KEY = process.env.SECRET_KEY || "arandomstringoflettersandnumbers";
const PORT = exports.PORT = process.env.PORT || 3001;
function getDatabaseUri() {
  console.log(process.env.DATABASE_URL);
  return process.env.NODE_ENV === "test" ? "postgresql:///xivtrader_test" : process.env.DATABASE_URL || "postgresql:///xivtrader";
}