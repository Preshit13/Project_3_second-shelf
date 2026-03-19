import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import BookCard from "../BookCard/BookCard.jsx";
import "./BookList.css";

const BOOKS_PER_PAGE = 12;

export default function BookList({ books, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * BOOKS_PER_PAGE;
    const end = start + BOOKS_PER_PAGE;
    return books.slice(start, end);
  }, [books, currentPage]);

  function handlePrevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) return <p className="booklist__status">Loading books...</p>;

  if (error) {
    return <p className="booklist__status booklist__status--error">{error}</p>;
  }

  if (!books.length) {
    return <p className="booklist__status">No books found.</p>;
  }

  return (
    <>
      <section className="booklist">
        {paginatedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </section>

      <div className="booklist__pagination">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="booklist__page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

BookList.defaultProps = {
  error: ""
};