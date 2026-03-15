// components/BookList/BookList.jsx
// Renders the full grid of BookCard components on the Home page.
// Handles three display states: loading, error, and the populated grid.
// Receives the books array and status flags as props from Home.jsx,
// which is responsible for fetching the data.

import PropTypes from "prop-types";
import BookCard from "../BookCard/BookCard.jsx";
import "./BookList.css";

/**
 * BookList component — grid of BookCard tiles.
 * @param {Object} props
 * @param {Array}   props.books   - Array of book documents to display
 * @param {boolean} props.loading - When true, shows a loading message instead of the grid
 * @param {string}  props.error   - If set, shows an error message instead of the grid
 */
export default function BookList({ books, loading, error }) {
  // Show a loading indicator while the fetch is in progress
  if (loading) return <p className="booklist__status">Loading books...</p>;

  // Show an error message if the fetch failed
  if (error)
    return <p className="booklist__status booklist__status--error">{error}</p>;

  // Show a friendly message if there are no results (e.g. search returned nothing)
  if (!books.length) return <p className="booklist__status">No books found.</p>;

  return (
    <section className="booklist">
      {/* Render one BookCard per book in the array */}
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </section>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
