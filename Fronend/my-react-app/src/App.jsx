import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTile] = useState();
  const [author, setAutor] = useState();
  const [genre, setGenre] = useState();
  const [publicationDate, setPublicationDate] = useState();
  const [discription, setDescription] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:2999/book")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Book Catalog</h1>

      {/* Form to Add a New Book */}
      {/* <form onSubmit={addBook}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTile(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Author"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            required
          />
        </div>
        <div>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            placeholder="Publication Date"
            required
          />
        </div>
        <div>
          <textarea
            value={discription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form> */}

      {/* Display List of Books */}
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Published on: {book.publicationDate}</p>
            <p>Description: {book.description}</p>
            {/* <button onClick={() => editBook(book.id)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
