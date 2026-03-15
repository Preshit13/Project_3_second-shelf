import PropTypes from "prop-types";
import "./BookCard.css";

function BookCard({ book }) {
  return (
    <article className="book-card">
      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>Price:</strong> ${book.price}
      </p>

      <p>
        <strong>Condition:</strong> {book.condition}
      </p>

      <button type="button">View Details</button>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number,
    condition: PropTypes.string
  }).isRequired
};

export default BookCard;