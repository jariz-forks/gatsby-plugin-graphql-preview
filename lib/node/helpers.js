"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var gql = require('graphql-tag');

var traverse = require('traverse');

var murmurhash = require('imurmurhash');

var fetch = require('node-fetch');

exports.getComponentId = function getComponentId(componentPath) {
  return murmurhash(componentPath).result().toString(36);
};

function doesQueryUseFragment(query, fragment) {
  var queryUsesFragment = false;
  traverse(query).forEach(function (currentValue) {
    // We're looking for this kind of construct
    // {
    //   "kind": "FragmentSpread", // 1
    //   "name": {                 // 2
    //     "kind": "Name",
    //     "value": "<fragment>"   // 3, currentValue
    //   }
    // }
    if (this.isLeaf && this.key === 'value' && // 3
    this.parent && this.parent.key === 'name' && // 2
    this.parent.parent && this.parent.parent.node.kind === 'FragmentSpread' // 1
    ) {
        if (currentValue === fragment) {
          queryUsesFragment = true;
        }
      }
  });
  return queryUsesFragment;
}

;

exports.getIsolatedQuery = function getIsolatedQuery(querySource, fieldName, typeName) {
  var updatedQuery = traverse(gql(querySource)).clone();
  var updatedRoot = updatedQuery.definitions[0].selectionSet.selections.find(function (selection) {
    return selection.name && selection.name.kind === 'Name' && selection.name.value === fieldName;
  });

  if (updatedRoot) {
    updatedQuery.definitions[0].selectionSet.selections = updatedRoot.selectionSet.selections;
  } else if (fieldName) {
    console.warn('Failed to update query root');
    return;
  }

  traverse(updatedQuery).forEach(function (currentValue) {
    if (this.isLeaf && this.parent && this.parent.key === 'name') {
      if (this.parent.parent && this.parent.parent.node.kind === 'NamedType') {
        if (typeof currentValue === 'string' && currentValue.indexOf("".concat(typeName, "_")) === 0) {
          this.update(currentValue.substr(typeName.length + 1));
        }
      }
    }
  });
  var index = 0;

  do {
    var definition = updatedQuery.definitions[index];

    if (definition.kind === 'FragmentDefinition') {
      if (!doesQueryUseFragment(updatedQuery, definition.name.value)) {
        // delete fragment and start again, since other fragments possibly only
        // depended on the deleted one.
        updatedQuery.definitions.splice(index, 1);
        index = 0;
        continue;
      }
    }

    index += 1;
  } while (index < updatedQuery.definitions.length);

  return updatedQuery;
};

exports.getFragmentTypes =
/*#__PURE__*/
function () {
  var _getFragmentTypes = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var url, headers, credentials, response, result, filteredData;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _ref.url, headers = _ref.headers, credentials = _ref.credentials;
            _context.next = 3;
            return fetch(url, {
              method: 'POST',
              headers: (0, _objectSpread2.default)({
                'Content-Type': 'application/json'
              }, headers),
              credentials: credentials,
              body: JSON.stringify({
                variables: {},
                query: "\n      {\n        __schema {\n          types {\n            kind\n            name\n            possibleTypes {\n              name\n            }\n          }\n        }\n      }\n    "
              })
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            result = _context.sent;
            // here we're filtering out any type information unrelated to unions or interfaces
            filteredData = result.data.__schema.types.filter(function (type) {
              return type.possibleTypes !== null;
            });
            result.data.__schema.types = filteredData;
            return _context.abrupt("return", result.data);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function getFragmentTypes(_x) {
    return _getFragmentTypes.apply(this, arguments);
  }

  return getFragmentTypes;
}();