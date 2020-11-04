import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {
  const [state, setState] = React.useState({ name: '', genre: '', authorId: '' });
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const displayAuthors = () => {
    if (loading) {
      return (<option disabled>Loading authors</option>);
    }
    return data.authors.map((author) => (<option key={author.id} value={author.id}>{ author.name }</option>));
  };

  const updateFieldValue = (fieldName, fieldValue) => {
    setState({ ...state, [fieldName]: fieldValue });
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: { ...state },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" value={state.name} onChange={(e) => updateFieldValue('name', e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" value={state.genre} onChange={(e) => updateFieldValue('genre', e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select value={state.authorId} onChange={(e) => updateFieldValue('authorId', e.target.value)}>
          <option>Select author</option>
          { displayAuthors() }
        </select>
      </div>
      <button onClick={submitForm}>+</button>

    </form>
  );
};

export default AddBook;
