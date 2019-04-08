"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./helpers'),
    getComponentId = _require.getComponentId,
    getIsolatedQuery = _require.getIsolatedQuery,
    getFragmentTypes = _require.getFragmentTypes;

exports.default =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref, _ref2) {
    var store, actions, plugins, fieldName, typeName, url, headers, credentials, isolatedQueries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, componentPath, query, fragmentTypes;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, actions = _ref.actions, plugins = _ref.plugins;
            fieldName = _ref2.fieldName, typeName = _ref2.typeName, url = _ref2.url, headers = _ref2.headers, credentials = _ref2.credentials;
            isolatedQueries = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;

            for (_iterator = store.getState().components[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _step$value = (0, _slicedToArray2.default)(_step.value, 2), componentPath = _step$value[0], query = _step$value[1].query;
              isolatedQueries[getComponentId(componentPath)] = query ? getIsolatedQuery(query, fieldName, typeName) : null;
            }

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 14:
            _context.prev = 14;
            _context.prev = 15;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 17:
            _context.prev = 17;

            if (!_didIteratorError) {
              _context.next = 20;
              break;
            }

            throw _iteratorError;

          case 20:
            return _context.finish(17);

          case 21:
            return _context.finish(14);

          case 22:
            _context.next = 24;
            return getFragmentTypes({
              url: url,
              headers: headers,
              credentials: credentials
            });

          case 24:
            fragmentTypes = _context.sent;
            actions.setWebpackConfig({
              plugins: [plugins.define({
                GATSBY_PLUGIN_GRAPHQL_PREVIEW_ISOLATED_QUERIES: JSON.stringify(isolatedQueries),
                GATSBY_PLUGIN_GRAPHQL_PREVIEW_FRAGMENT_TYPES: JSON.stringify(fragmentTypes)
              })]
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 10, 14, 22], [15,, 17, 21]]);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();