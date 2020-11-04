import React from 'react';

import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const {
    loading, error, data, refetch,
  } = useQuery(getBookQuery, { variables: { id: bookId } });

  React.useEffect(() => {
    if (bookId) {
      refetch(bookId);
    }
  }, [bookId, refetch]);

  if (loading || error) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      {!data || !data.book
        ? (<p>No Book Selected</p>)
        : (
          <div>
            <h2>{ data.book.name }</h2>
            <p>{ data.book.genre }</p>
            <p>{ data.book.author.name }</p>
            <p>All books by this author:</p>
            <ul className="other-books">
              { data.book.author.books.map((item) => <li key={item.id}>{ item.name }</li>)}
            </ul>
          </div>
        )}
    </div>
  );
};

export default BookDetails;
