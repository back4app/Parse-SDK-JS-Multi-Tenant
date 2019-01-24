"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var RNStorage = require('./StorageController.react-native');

var LocalDatastoreController = {
  fromPinWithName: function () {
    var _fromPinWithName = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(name
    /*: string*/
    ) {
      var values, objects;
      return regeneratorRuntime.wrap(function (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return RNStorage.getItemAsync(name);

            case 2:
              values = _context.sent;

              if (values) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", Promise.resolve(null));

            case 5:
              objects = JSON.parse(values);
              return _context.abrupt("return", Promise.resolve(objects));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function () {
      return _fromPinWithName.apply(this, arguments);
    };
  }(),
  pinWithName: function () {
    var _pinWithName = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(name
    /*: string*/
    , value
    /*: any*/
    ) {
      var values;
      return regeneratorRuntime.wrap(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              values = JSON.stringify(value);
              _context2.next = 4;
              return RNStorage.setItemAsync(name, values);

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0); // Quota exceeded, possibly due to Safari Private Browsing mode

              console.log(_context2.t0.message);
            // eslint-disable-line no-console

            case 9:
              return _context2.abrupt("return", Promise.resolve());

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 6]]);
    }));

    return function () {
      return _pinWithName.apply(this, arguments);
    };
  }(),
  unPinWithName: function () {
    var _unPinWithName = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(name
    /*: string*/
    ) {
      return regeneratorRuntime.wrap(function (_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return RNStorage.removeItemAsync(name);

            case 2:
              return _context3.abrupt("return", Promise.resolve());

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function () {
      return _unPinWithName.apply(this, arguments);
    };
  }(),
  getAllContents: function () {
    var _getAllContents = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var LDS, keys, i, key, value;
      return regeneratorRuntime.wrap(function (_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              LDS = {};
              _context4.next = 3;
              return RNStorage.getAllKeys();

            case 3:
              keys = _context4.sent;
              i = 0;

            case 5:
              if (!(i < keys.length)) {
                _context4.next = 14;
                break;
              }

              key = keys[i];
              _context4.next = 9;
              return RNStorage.getItemAsync(key);

            case 9:
              value = _context4.sent;
              LDS[key] = JSON.parse(value);

            case 11:
              i += 1;
              _context4.next = 5;
              break;

            case 14:
              return _context4.abrupt("return", Promise.resolve(LDS));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function () {
      return _getAllContents.apply(this, arguments);
    };
  }(),
  clear: function ()
  /*: Promise*/
  {
    return RNStorage.clear();
  }
};
module.exports = LocalDatastoreController;