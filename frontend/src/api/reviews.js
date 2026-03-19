///api/reviews.js//
// const BASE = "/api/reviews";

const BASE = `${import.meta.env.VITE_API_BASE_URL}/api/reviews`;
/**
 * Fetches all reviews for a specific book.
 * @param {string} bookId - The book's MongoDB _id
 * @returns {Promise<Array>} Array of review objects
 */
export async function fetchReviewsByBookId(bookId) {
  const response = await fetch(`${BASE}/book/${bookId}`, {
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch reviews");
  }

  return data;
}

/**
 * Creates a new review for a book.
 * Requires the user to be logged in.
 * @param {Object} reviewData
 * @returns {Promise<Object>} Created review response
 */
export async function createReview(reviewData) {
  const response = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(reviewData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create review");
  }

  return data;
}

/**
 * Updates an existing review.
 * Requires the review owner to be logged in.
 * @param {string} id - The review's MongoDB _id
 * @param {Object} reviewData - Updated rating/reviewText
 * @returns {Promise<Object>} Success response
 */
export async function updateReview(id, reviewData) {
  const response = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(reviewData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update review");
  }

  return data;
}

/**
 * Deletes an existing review.
 * Requires the review owner to be logged in.
 * @param {string} id - The review's MongoDB _id
 * @returns {Promise<Object>} Success response
 */
export async function deleteReview(id) {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete review");
  }

  return data;
}