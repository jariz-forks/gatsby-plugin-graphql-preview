"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = require('react');

var PropTypes = require('prop-types');

var _require = require('react-apollo-hooks'),
    useQuery = _require.useQuery;

var murmurhash = require('imurmurhash');

var PreviewRenderer = require('./PreviewRenderer').default;

var useState = React.useState,
    useRef = React.useRef;

function prefixTypename(data, prefix) {
  return transformObj(data, function (key, value) {
    if (key === '__typename') {
      return "".concat(prefix, "_").concat(value);
    }

    return value;
  });
}

function transformObj(obj, fn) {
  return JSON.parse(JSON.stringify(obj), fn);
}

function PreviewFetcher(_ref) {
  var element = _ref.element,
      elementProps = _ref.elementProps,
      fieldName = _ref.fieldName,
      typeName = _ref.typeName,
      isolatedQuery = _ref.isolatedQuery,
      PreviewUIComponent = _ref.PreviewUIComponent,
      initialPollInterval = _ref.initialPollInterval;

  var _useState = useState(initialPollInterval),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      pollInterval = _useState2[0],
      setPollInterval = _useState2[1];

  var _useQuery = useQuery(isolatedQuery, {
    pollInterval: pollInterval,
    notifyOnNetworkStatusChange: true,
    variables: elementProps.pageContext
  }),
      fetchedData = _useQuery.data,
      error = _useQuery.error,
      loading = _useQuery.loading,
      _refetch = _useQuery.refetch,
      rest = (0, _objectWithoutProperties2.default)(_useQuery, ["data", "error", "loading", "refetch"]);

  var mergedDataPropsRef = useRef({
    data: null,
    key: null
  });

  if (fetchedData && Object.keys(fetchedData).length !== 0) {
    mergedDataPropsRef.current = {
      data: (0, _objectSpread3.default)({}, elementProps.data, (0, _defineProperty2.default)({}, fieldName, prefixTypename(fetchedData, typeName))),
      key: murmurhash(JSON.stringify(fetchedData)).result()
    };
  }

  return React.createElement(PreviewRenderer, {
    element: element,
    PreviewUIComponent: PreviewUIComponent,
    setPollInterval: setPollInterval,
    pollInterval: pollInterval,
    error: error,
    loading: loading,
    refetch: function refetch() {
      return _refetch;
    },
    data: mergedDataPropsRef.current.data,
    key: mergedDataPropsRef.current.key
  });
}

PreviewFetcher.propTypes = {
  element: PropTypes.element.isRequired,
  elementProps: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  typeName: PropTypes.string.isRequired,
  isolatedQuery: PropTypes.object.isRequired,
  PreviewUIComponent: PropTypes.func.isRequired,
  initialPollInterval: PropTypes.number.isRequired
};
exports.default = PreviewFetcher;