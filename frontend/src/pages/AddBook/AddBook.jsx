// pages/AddBook/AddBook.jsx
// Page for creating a new book listing or editing an existing one.
// Handles both /add (create) and /edit/:id (update) routes in a single component.
// When editing, fetches the existing book data on mount and passes it to
// BookForm as the `initial` prop to pre-populate the fields.
// On successful submit, redirects to the listing's detail page.
// Redirects unauthenticated users with a message instead of showing the form.

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BookForm from "../../components/BookForm/BookForm.jsx";
import { createBook, fetchBook, updateBook } from "../../api/books.js";
import "./AddBook.css";

/**
 * AddBook page — create a new listing or edit an existing one.
 * @param {Object}      props
 * @param {Object|null} props.user - The currently logged-in user, or null if not authenticated
 */
export default function AddBook({ user }) {
  // id is present on the /edit/:id route; undefined on the /add route
  const { id } = useParams();
  const navigate = useNavigate();

  // True when an id is in the URL (edit mode), false for new listings (create mode)
  const isEditing = Boolean(id);

  // Holds the existing book data when editing, used to pre-populate BookForm
  const [initial, setInitial] = useState(null);

  // True while the existing book is being fetched in edit mode
  const [loading, setLoading] = useState(isEditing);

  // Fetch the existing book data when in edit mode so we can pre-fill the form
  useEffect(() => {
    if (!isEditing) return;
    fetchBook(id)
      .then(setInitial)
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  /**
   * Called by BookForm on submission with the validated form data.
   * Creates a new listing or updates the existing one depending on the mode,
   * then redirects to the relevant BookDetails page.
   * @param {Object} data - Validated book fields from BookForm
   */
  async function handleSubmit(data) {
    if (isEditing) {
      await updateBook(id, data);
      navigate(`/books/${id}`); // Return to the listing that was just edited
    } else {
      const result = await createBook(data);
      navigate(`/books/${result.insertedId}`); // Go to the newly created listing
    }
  }

  // Guard: show a message and no form if the user is not logged in
  if (!user) {
    return (
      <p className="addbook__auth-msg">
        You must be logged in to {isEditing ? "edit" : "add"} a listing.
      </p>
    );
  }

  // Show a loading indicator while the existing book data is being fetched
  if (loading) return <p className="addbook__status">Loading...</p>;

  return (
    <div className="addbook">
      {/* Page heading changes based on whether we are creating or editing */}
      <h1 className="addbook__heading">
        {isEditing ? "Edit Listing" : "Sell a Book"}
      </h1>
      <p className="addbook__subheading">
        {isEditing
          ? "Update the details for your listing below."
          : "Fill in the details below to list your book for sale."}
      </p>

      {/* BookForm receives pre-populated values when editing, empty defaults when creating */}
      <BookForm
        initial={initial}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? "Save Changes" : "List Book"}
      />
    </div>
  );
}

AddBook.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string, id: PropTypes.string }),
};
