"use strict";
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

var memMap = {};
var LocalDatastoreController = {
  fromPinWithName: function (name
  /*: string*/
  )
  /*: ?any*/
  {
    if (memMap.hasOwnProperty(name)) {
      return memMap[name];
    }

    return null;
  },
  pinWithName: function (name
  /*: string*/
  , value
  /*: any*/
  ) {
    memMap[name] = value;
  },
  unPinWithName: function (name
  /*: string*/
  ) {
    delete memMap[name];
  },
  getAllContents: function () {
    return memMap;
  },
  clear: function () {
    for (var key in memMap) {
      if (memMap.hasOwnProperty(key)) {
        delete memMap[key];
      }
    }
  }
};
module.exports = LocalDatastoreController;