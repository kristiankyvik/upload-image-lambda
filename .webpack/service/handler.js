(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(2);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(4).config();
var request = __webpack_require__(5);
var rp = __webpack_require__(6);
var AWS = __webpack_require__(7);
var Nightmare = __webpack_require__(8);
var fetch = __webpack_require__(9);

var s3 = new AWS.S3();

var nightmare = Nightmare({
  show: false
});

Nightmare.action('extractUrl', function (selector, done) {
  //`this` is the Nightmare instance
  this.evaluate_now(function (selector) {
    var url = document.querySelector("img").getAttribute("src");
    return url;
  }, done, selector);
});

module.exports.nightmareWebhookListener = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var _JSON$parse, name, query, picUrl, picture, picture_data, AwsParams, upload, response;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _JSON$parse = JSON.parse(event.body), name = _JSON$parse.name, query = _JSON$parse.query;
            _context.next = 3;
            return nightmare.goto('https://source.unsplash.com/254x156/?' + query).wait(1000).extractUrl('img');

          case 3:
            picUrl = _context.sent;


            console.log("pic URL", picUrl);

            _context.next = 7;
            return fetch(picUrl, { encoding: null });

          case 7:
            picture = _context.sent;
            _context.next = 10;
            return picture.buffer();

          case 10:
            picture_data = _context.sent;


            console.log("picutreeeee", picture_data);

            AwsParams = {
              'Bucket': 'erasmoose',
              'Key': name + '.jpg',
              'Body': picture_data,
              'ContentEncoding': 'base64',
              'ContentType': 'image/jpeg',
              'ACL': 'public-read'
            };
            _context.next = 15;
            return s3.putObject(AwsParams).promise();

          case 15:
            upload = _context.sent;
            response = {
              statusCode: 200,
              body: (0, _stringify2.default)({
                message: "Sucesssss"
              })
            };


            callback(null, response);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("nightmare");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ })
/******/ ])));