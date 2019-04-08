"use strict";

var React = require('react');

var PropTypes = require('prop-types');

var Draggable = require('react-draggable');

var style = {
  container: {
    position: 'fixed',
    zIndex: Number.MAX_SAFE_INTEGER,
    padding: '4px 6px',
    borderRadius: 5,
    top: 0,
    left: 0,
    border: '1px solid rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(240, 240, 240, 0.75)',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.15)'
  },
  handle: {
    float: 'right',
    padding: '0 0.2em',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(128, 128, 128, .75)',
    borderRadius: 5,
    cursor: 'move'
  }
};

function PreviewUI(_ref) {
  var setPollInterval = _ref.setPollInterval,
      pollInterval = _ref.pollInterval,
      refetch = _ref.refetch,
      loading = _ref.loading,
      error = _ref.error;
  return React.createElement(Draggable, {
    handle: ".handle",
    defaultPosition: {
      x: 10,
      y: 10
    }
  }, React.createElement("div", {
    style: style.container
  }, React.createElement("div", {
    className: "handle",
    style: style.handle
  }, "\u271B"), React.createElement("div", null, React.createElement("strong", null, "Live preview ", loading ? 'loading' : error ? 'errored' : 'active')), React.createElement("div", null, React.createElement("label", null, "Update every:", ' ', React.createElement("select", {
    onChange: function onChange(e) {
      setPollInterval(e.target.value);
    },
    value: pollInterval
  }, React.createElement("option", {
    value: 500
  }, "0.5 seconds"), React.createElement("option", {
    value: 2500
  }, "2.5 seconds"), React.createElement("option", {
    value: 10000
  }, "10 seconds")))), React.createElement("div", null, React.createElement("label", null, React.createElement("input", {
    type: "button",
    onClick: refetch,
    value: "Update now"
  })))));
}

PreviewUI.propTypes = {
  setPollInterval: PropTypes.func.isRequired,
  pollInterval: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]).isRequired,
  refetch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};
exports.default = PreviewUI;