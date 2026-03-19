////api/books.js//
const BASE = "/api/books";

/**
 * Fetches all book listings from the database.
 * @returns {Promise<Array>} Array of book objects
 */
export async function fetchBooks() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function fetchMyBooks() {
  const res = await fetch("/api/books/mine/listings", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch your listings");
  }

  return data;
}

/**
 * Fetches a single book listing by its MongoDB _id.
 * @param {string} id - The book's _id
 * @returns {Promise<Object>} A single book object
 */
export async function fetchBook(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

/**
 * Creates a new book listing. Requires the user to be logged in.
 * @param {Object} data - Book fields: title, author, price, condition, description
 * @returns {Promise<Object>} Object containing the new listing's insertedId
 */
export async function createBook(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create book");
  return res.json();
}

/**
 * Updates an existing book listing by id. Only the owner may update.
 * @param {string} id - The book's _id
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Confirmation message
 */
export async function updateBook(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
}

/**
 * Deletes a book listing by id. Only the owner may delete.
 * @param {string} id - The book's _id
 * @returns {Promise<Object>} Confirmation message
 */
export async function deleteBook(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
}

export async function fetchBooksSortedByRating() {
  const res = await fetch("/api/books/sorted/rating");

  if (!res.ok) {
    throw new Error("Failed to fetch sorted books");
  }

  return res.json();
}
