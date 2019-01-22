"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));
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


var DEFAULT_PIN = '_default';
var PIN_PREFIX = 'parsePin_';
var LocalDatastore = {
  fromPinWithName: function (name
  /*: string*/
  )
  /*: Promise*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.fromPinWithName(name);
  },
  pinWithName: function (name
  /*: string*/
  , value
  /*: any*/
  )
  /*: Promise*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.pinWithName(name, value);
  },
  unPinWithName: function (name
  /*: string*/
  )
  /*: Promise*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.unPinWithName(name);
  },
  _getAllContents: function ()
  /*: Promise*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.getAllContents();
  },
  _clear: function ()
  /*: Promise*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.clear();
  },
  // Pin the object and children recursively
  // Saves the object and children key to Pin Name
  _handlePinWithName: function () {
    var _handlePinWithName2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(name
    /*: string*/
    , object
    /*: ParseObject*/
    ) {
      var pinName, objects, objectKey, pinned, objectIds, toPin;
      return regeneratorRuntime.wrap(function (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pinName = this.getPinName(name);
              objects = this._getChildren(object);
              objects[this.getKeyForObject(object)] = object._toFullJSON();
              _context.t0 = regeneratorRuntime.keys(objects);

            case 4:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 10;
                break;
              }

              objectKey = _context.t1.value;
              _context.next = 8;
              return this.pinWithName(objectKey, objects[objectKey]);

            case 8:
              _context.next = 4;
              break;

            case 10:
              _context.next = 12;
              return this.fromPinWithName(pinName);

            case 12:
              _context.t2 = _context.sent;

              if (_context.t2) {
                _context.next = 15;
                break;
              }

              _context.t2 = [];

            case 15:
              pinned = _context.t2;
              objectIds = Object.keys(objects);
              toPin = (0, _toConsumableArray2.default)(new Set([].concat((0, _toConsumableArray2.default)(pinned), (0, _toConsumableArray2.default)(objectIds))));
              _context.next = 20;
              return this.pinWithName(pinName, toPin);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function () {
      return _handlePinWithName2.apply(this, arguments);
    };
  }(),
  // Removes object and children keys from pin name
  // Keeps the object and children pinned
  _handleUnPinWithName: function () {
    var _handleUnPinWithName2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(name
    /*: string*/
    , object
    /*: ParseObject*/
    ) {
      var localDatastore, pinName, objects, objectIds, pinned, _i, objectKey, hasReference, key, pinnedObjects;

      return regeneratorRuntime.wrap(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this._getAllContents();

            case 2:
              localDatastore = _context2.sent;
              pinName = this.getPinName(name);
              objects = this._getChildren(object);
              objectIds = Object.keys(objects);
              objectIds.push(this.getKeyForObject(object));
              pinned = localDatastore[pinName] || [];
              pinned = pinned.filter(function (item) {
                return !objectIds.includes(item);
              });

              if (!(pinned.length == 0)) {
                _context2.next = 15;
                break;
              }

              _context2.next = 12;
              return this.unPinWithName(pinName);

            case 12:
              delete localDatastore[pinName];
              _context2.next = 18;
              break;

            case 15:
              _context2.next = 17;
              return this.pinWithName(pinName, pinned);

            case 17:
              localDatastore[pinName] = pinned;

            case 18:
              _i = 0;

            case 19:
              if (!(_i < objectIds.length)) {
                _context2.next = 38;
                break;
              }

              objectKey = objectIds[_i];
              hasReference = false;
              _context2.t0 = regeneratorRuntime.keys(localDatastore);

            case 23:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 32;
                break;
              }

              key = _context2.t1.value;

              if (!(key === DEFAULT_PIN || key.startsWith(PIN_PREFIX))) {
                _context2.next = 30;
                break;
              }

              pinnedObjects = localDatastore[key] || [];

              if (!pinnedObjects.includes(objectKey)) {
                _context2.next = 30;
                break;
              }

              hasReference = true;
              return _context2.abrupt("break", 32);

            case 30:
              _context2.next = 23;
              break;

            case 32:
              if (hasReference) {
                _context2.next = 35;
                break;
              }

              _context2.next = 35;
              return this.unPinWithName(objectKey);

            case 35:
              _i++;
              _context2.next = 19;
              break;

            case 38:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function () {
      return _handleUnPinWithName2.apply(this, arguments);
    };
  }(),
  // Retrieve all pointer fields from object recursively
  _getChildren: function (object
  /*: ParseObject*/
  ) {
    var encountered = {};

    var json = object._toFullJSON();

    for (var key in json) {
      if (json[key].__type && json[key].__type === 'Object') {
        this._traverse(json[key], encountered);
      }
    }

    return encountered;
  },
  _traverse: function (object
  /*: any*/
  , encountered
  /*: any*/
  ) {
    if (!object.objectId) {
      return;
    } else {
      var objectKey = this.getKeyForObject(object);

      if (encountered[objectKey]) {
        return;
      }

      encountered[objectKey] = object;
    }

    for (var key in object) {
      var json = object[key];

      if (!object[key]) {
        json = object;
      }

      if (json.__type && json.__type === 'Object') {
        this._traverse(json, encountered);
      }
    }
  },
  // Transform keys in pin name to objects
  _serializeObjectsFromPinName: function () {
    var _serializeObjectsFromPinName2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(name
    /*: string*/
    ) {
      var _this = this;

      var localDatastore, allObjects, key, pinName, pinned, objects;
      return regeneratorRuntime.wrap(function (_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._getAllContents();

            case 2:
              localDatastore = _context4.sent;
              allObjects = [];

              for (key in localDatastore) {
                if (key !== DEFAULT_PIN && !key.startsWith(PIN_PREFIX)) {
                  allObjects.push(localDatastore[key]);
                }
              }

              if (name) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", Promise.resolve(allObjects));

            case 7:
              _context4.next = 9;
              return this.getPinName(name);

            case 9:
              pinName = _context4.sent;
              _context4.next = 12;
              return this.fromPinWithName(pinName);

            case 12:
              pinned = _context4.sent;

              if (Array.isArray(pinned)) {
                _context4.next = 15;
                break;
              }

              return _context4.abrupt("return", Promise.resolve([]));

            case 15:
              objects = pinned.map(
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3(objectKey) {
                  return regeneratorRuntime.wrap(function (_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _this.fromPinWithName(objectKey);

                        case 2:
                          return _context3.abrupt("return", _context3.sent);

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                return function () {
                  return _ref.apply(this, arguments);
                };
              }());
              return _context4.abrupt("return", Promise.all(objects));

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function () {
      return _serializeObjectsFromPinName2.apply(this, arguments);
    };
  }(),
  // Replaces object pointers with pinned pointers
  // The object pointers may contain old data
  // Uses Breadth First Search Algorithm
  _serializeObject: function () {
    var _serializeObject2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(objectKey
    /*: string*/
    , localDatastore
    /*: any*/
    ) {
      var LDS, root, queue, meta, uniqueId, nodeId, subTreeRoot, field, value, key, pointer;
      return regeneratorRuntime.wrap(function (_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              LDS = localDatastore;

              if (LDS) {
                _context5.next = 5;
                break;
              }

              _context5.next = 4;
              return this._getAllContents();

            case 4:
              LDS = _context5.sent;

            case 5:
              root = LDS[objectKey];

              if (root) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", null);

            case 8:
              queue = [];
              meta = {};
              uniqueId = 0;
              meta[uniqueId] = root;
              queue.push(uniqueId);

              while (queue.length !== 0) {
                nodeId = queue.shift();
                subTreeRoot = meta[nodeId];

                for (field in subTreeRoot) {
                  value = subTreeRoot[field];

                  if (value.__type && value.__type === 'Object') {
                    key = this.getKeyForObject(value);
                    pointer = LDS[key];

                    if (pointer) {
                      uniqueId++;
                      meta[uniqueId] = pointer;
                      subTreeRoot[field] = pointer;
                      queue.push(uniqueId);
                    }
                  }
                }
              }

              return _context5.abrupt("return", root);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function () {
      return _serializeObject2.apply(this, arguments);
    };
  }(),
  // Called when an object is save / fetched
  // Update object pin value
  _updateObjectIfPinned: function () {
    var _updateObjectIfPinned2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(object
    /*: ParseObject*/
    ) {
      var objectKey, pinned;
      return regeneratorRuntime.wrap(function (_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this.isEnabled) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              objectKey = this.getKeyForObject(object);
              _context6.next = 5;
              return this.fromPinWithName(objectKey);

            case 5:
              pinned = _context6.sent;

              if (!pinned) {
                _context6.next = 9;
                break;
              }

              _context6.next = 9;
              return this.pinWithName(objectKey, object._toFullJSON());

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function () {
      return _updateObjectIfPinned2.apply(this, arguments);
    };
  }(),
  // Called when object is destroyed
  // Unpin object and remove all references from pin names
  // TODO: Destroy children?
  _destroyObjectIfPinned: function () {
    var _destroyObjectIfPinned2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(object
    /*: ParseObject*/
    ) {
      var localDatastore, objectKey, pin, key, pinned;
      return regeneratorRuntime.wrap(function (_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (this.isEnabled) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              _context7.next = 4;
              return this._getAllContents();

            case 4:
              localDatastore = _context7.sent;
              objectKey = this.getKeyForObject(object);
              pin = localDatastore[objectKey];

              if (pin) {
                _context7.next = 9;
                break;
              }

              return _context7.abrupt("return");

            case 9:
              _context7.next = 11;
              return this.unPinWithName(objectKey);

            case 11:
              delete localDatastore[objectKey];
              _context7.t0 = regeneratorRuntime.keys(localDatastore);

            case 13:
              if ((_context7.t1 = _context7.t0()).done) {
                _context7.next = 30;
                break;
              }

              key = _context7.t1.value;

              if (!(key === DEFAULT_PIN || key.startsWith(PIN_PREFIX))) {
                _context7.next = 28;
                break;
              }

              pinned = localDatastore[key] || [];

              if (!pinned.includes(objectKey)) {
                _context7.next = 28;
                break;
              }

              pinned = pinned.filter(function (item) {
                return item !== objectKey;
              });

              if (!(pinned.length == 0)) {
                _context7.next = 25;
                break;
              }

              _context7.next = 22;
              return this.unPinWithName(key);

            case 22:
              delete localDatastore[key];
              _context7.next = 28;
              break;

            case 25:
              _context7.next = 27;
              return this.pinWithName(key, pinned);

            case 27:
              localDatastore[key] = pinned;

            case 28:
              _context7.next = 13;
              break;

            case 30:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function () {
      return _destroyObjectIfPinned2.apply(this, arguments);
    };
  }(),
  // Update pin and references of the unsaved object
  _updateLocalIdForObject: function () {
    var _updateLocalIdForObject2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(localId, object
    /*: ParseObject*/
    ) {
      var localKey, objectKey, unsaved, localDatastore, key, pinned;
      return regeneratorRuntime.wrap(function (_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (this.isEnabled) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return");

            case 2:
              localKey = "".concat(object.className, "_").concat(localId);
              objectKey = this.getKeyForObject(object);
              _context8.next = 6;
              return this.fromPinWithName(localKey);

            case 6:
              unsaved = _context8.sent;

              if (unsaved) {
                _context8.next = 9;
                break;
              }

              return _context8.abrupt("return");

            case 9:
              _context8.next = 11;
              return this.unPinWithName(localKey);

            case 11:
              _context8.next = 13;
              return this.pinWithName(objectKey, unsaved);

            case 13:
              _context8.next = 15;
              return this._getAllContents();

            case 15:
              localDatastore = _context8.sent;
              _context8.t0 = regeneratorRuntime.keys(localDatastore);

            case 17:
              if ((_context8.t1 = _context8.t0()).done) {
                _context8.next = 29;
                break;
              }

              key = _context8.t1.value;

              if (!(key === DEFAULT_PIN || key.startsWith(PIN_PREFIX))) {
                _context8.next = 27;
                break;
              }

              pinned = localDatastore[key] || [];

              if (!pinned.includes(localKey)) {
                _context8.next = 27;
                break;
              }

              pinned = pinned.filter(function (item) {
                return item !== localKey;
              });
              pinned.push(objectKey);
              _context8.next = 26;
              return this.pinWithName(key, pinned);

            case 26:
              localDatastore[key] = pinned;

            case 27:
              _context8.next = 17;
              break;

            case 29:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function () {
      return _updateLocalIdForObject2.apply(this, arguments);
    };
  }(),
  getKeyForObject: function (object
  /*: any*/
  ) {
    var objectId = object.objectId || object._getId();

    return "".concat(object.className, "_").concat(objectId);
  },
  getPinName: function (pinName
  /*: ?string*/
  ) {
    if (!pinName || pinName === DEFAULT_PIN) {
      return DEFAULT_PIN;
    }

    return PIN_PREFIX + pinName;
  },
  checkIfEnabled: function () {
    if (!this.isEnabled) {
      console.log('Parse.enableLocalDatastore() must be called first'); // eslint-disable-line no-console
    }

    return this.isEnabled;
  }
};
LocalDatastore.DEFAULT_PIN = DEFAULT_PIN;
LocalDatastore.PIN_PREFIX = PIN_PREFIX;
LocalDatastore.isEnabled = false;
module.exports = LocalDatastore;

_CoreManager.default.setLocalDatastoreController(require('./LocalDatastoreController.browser'));

_CoreManager.default.setLocalDatastore(LocalDatastore);