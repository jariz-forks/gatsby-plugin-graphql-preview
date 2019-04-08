"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _require = require('./helpers'),
    getComponentId = _require.getComponentId;

var _require2 = require('../const'),
    PREVIEW_CONTEXT = _require2.PREVIEW_CONTEXT;
/**
 * append our component id onto every page
 */


exports.default = function (_ref) {
  var page = _ref.page,
      _ref$actions = _ref.actions,
      createPage = _ref$actions.createPage,
      deletePage = _ref$actions.deletePage;
  deletePage((0, _objectSpread3.default)({}, page));
  createPage((0, _objectSpread3.default)({}, page, {
    context: (0, _objectSpread3.default)({}, page.context, (0, _defineProperty2.default)({}, PREVIEW_CONTEXT, getComponentId(page.componentPath)))
  }));
};