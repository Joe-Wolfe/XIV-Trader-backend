"use strict";

//express app for backend
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _items = _interopRequireDefault(require("./routes/items.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//import routes
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use((0, _morgan.default)('tiny'));

//use routes
app.use('/items', _items.default);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    error: {
      message,
      status
    }
  });
});
var _default = exports.default = app;