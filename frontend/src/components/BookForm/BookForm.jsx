// components/BookForm/BookForm.jsx
// Reusable controlled form for creating and editing book listings.
// Used by both the AddBook page (new listing) and the edit route (existing listing).
// When editing, the `initial` prop pre-populates all fields.
// Validates required fields client-side before calling the onSubmit callback.

import { useState } from "react";
import PropTypes from "prop-types";
import "./BookForm.css";

// Valid condition options — must match the allowed values in backend validation
const CONDITIONS = ["Like New", "Good", "Fair", "Poor"];

/**
 * BookForm component — controlled form for adding or editing a book listing.
 * @param {Object}   props
 * @param {Object}   [props.initial]     - Pre-populated values when editing an existing listing
 * @param {Function} props.onSubmit      - Callback receiving the validated form data object
 * @param {string}   [props.submitLabel] - Label for the submit button (defaults to 'Submit')
 */
export default function BookForm({ initial, onSubmit, submitLabel }) {
  // Each field is a controlled input initialised from `initial` if provided
  const [title, setTitle] = useState(initial?.title ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [condition, setCondition] = useState(initial?.condition ?? "Good");
  const [description, setDescription] = useState(initial?.description ?? "");

  // Holds a user-facing validation error message
  const [error, setError] = useState("");

  /**
   * Validates required fields and calls onSubmit with the form data.
   * Price is parsed to a float before being passed up.
   */
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title || !author || price === "") {
      setError("Title, author, and price are required.");
      return;
    }
    onSubmit({
      title,
      author,
      price: parseFloat(price),
      condition,
      description,
    });
  }

  return (
    <div className="book-form">
      {/* Inline validation error shown above the fields */}
      {error && <p className="book-form__error">{error}</p>}

      <div className="book-form__fields">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="condition">Condition</label>
        {/* Dropdown restricted to the four accepted condition values */}
        <select
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="book-form__submit"
        >
          {submitLabel ?? "Submit"}
        </button>
      </div>
    </div>
  );
}

BookForm.propTypes = {
  initial: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number,
    condition: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};
