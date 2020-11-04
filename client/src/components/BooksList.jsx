import React from 'react';

import { useQuery } from '@apollo/client';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BooksList = () => {
  const [bookId, setBookId] = React.useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map(({ name, genre, id }) => (
          <li key={name} onClick={() => setBookId(id)}>
            {`${name}:${genre}`}
          </li>
        ))}
      </ul>
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default BooksList;
