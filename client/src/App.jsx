import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import BooksList from './components/BooksList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading Books</h1>
        <BooksList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
