"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var React = require('react');

var PropTypes = require('prop-types');

var cloneElement = React.cloneElement,
    Children = React.Children;

function deepClonePageElement(element, props) {
  return cloneElement(element, (0, _objectSpread2.default)({}, props, element.props.children ? {
    children: deepClonePageElement(Children.only(element.props.children), props)
  } : undefined));
}

function PreviewRenderer(_ref) {
  var element = _ref.element,
      PreviewUIComponent = _ref.PreviewUIComponent,
      setPollInterval = _ref.setPollInterval,
      pollInterval = _ref.pollInterval,
      error = _ref.error,
      loading = _ref.loading,
      refetch = _ref.refetch,
      data = _ref.data;
  return React.createElement(React.Fragment, null, data ? deepClonePageElement(element, {
    data: data
  }) : React.createElement("div", null, "Preparing preview\u2026"), React.createElement(PreviewUIComponent, {
    setPollInterval: setPollInterval,
    pollInterval: pollInterval,
    refetch: refetch,
    loading: loading,
    error: error
  }));
}

PreviewRenderer.propTypes = {
  element: PropTypes.element.isRequired,
  PreviewUIComponent: PropTypes.func.isRequired,
  setPollInterval: PropTypes.func.isRequired,
  pollInterval: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]).isRequired,
  refetch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])])
};
exports.default = PreviewRenderer;