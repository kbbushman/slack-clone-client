import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('sc_token'),
    'x-refreshToken': localStorage.getItem('sc_refreshToken'),
  }
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    console.log(headers.get('x-token'));
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refreshToken');

      if (token) {
        localStorage.setItem('sc_token', token);
      }

      if (refreshToken) {
        localStorage.setItem('sc_refreshToken', refreshToken);
      }
    }
    console.log('AFTERWARE RAN... Token = ', headers.get('x-token'));
    return response;
}));

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
