"use strict";

var React = require('react');

var _require = require('../const'),
    PREVIEW_CONTEXT = _require.PREVIEW_CONTEXT;

var _require2 = require('react-apollo-hooks'),
    ApolloProvider = _require2.ApolloProvider;

var _require3 = require('apollo-cache-inmemory'),
    IntrospectionFragmentMatcher = _require3.IntrospectionFragmentMatcher;

var ApolloClient = require('apollo-client').default;

var _require4 = require('apollo-cache-inmemory'),
    InMemoryCache = _require4.InMemoryCache;

var _require5 = require('apollo-link-http'),
    HttpLink = _require5.HttpLink;

var PreviewUIComponent = require('../components/PreviewUI').default;

var PreviewFetcher = require('../components/PreviewFetcher').default;

var queryString = require('query-string');

var isolatedQueries = GATSBY_PLUGIN_GRAPHQL_PREVIEW_ISOLATED_QUERIES;
var fragmentTypes = GATSBY_PLUGIN_GRAPHQL_PREVIEW_FRAGMENT_TYPES;
var fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentTypes
});
var cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
}); // eslint-disable-next-line react/prop-types,react/display-name

exports.default = function (_ref, options) {
  var element = _ref.element,
      props = _ref.props;
  var _options$previewQuery = options.previewQueryParam,
      previewQueryParam = _options$previewQuery === void 0 ? 'preview' : _options$previewQuery,
      fieldName = options.fieldName,
      typeName = options.typeName,
      url = options.url,
      headers = options.headers,
      credentials = options.credentials;
  var queryParams = queryString.parse(props.location.search);
  if (!queryParams[previewQueryParam]) return element;
  var componentId = props.pageContext[PREVIEW_CONTEXT];
  var isolatedQuery = isolatedQueries[componentId];
  if (!isolatedQuery) return element;
  var client = new ApolloClient({
    cache: cache,
    link: new HttpLink({
      uri: url,
      headers: headers,
      credentials: credentials
    })
  });
  return React.createElement(ApolloProvider, {
    client: client
  }, React.createElement(PreviewFetcher, {
    element: element,
    fieldName: fieldName,
    typeName: typeName,
    elementProps: props,
    isolatedQuery: isolatedQuery,
    PreviewUIComponent: PreviewUIComponent,
    initialPollInterval: 1e4
  }));
};