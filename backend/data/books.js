// data/books.js
// Data access layer for the Books collection.
// All direct MongoDB operations for books live here — routes should never
// touch the db directly and should instead call these functions.

import { getDb } from "../config/mongo.js";
import { ObjectId } from "mongodb";

// The MongoDB collection name used for all book operations
const COL = "books";

/**
 * Retrieves all book listings from the database.
 * @returns {Promise<Array>} Array of all book documents
 */
export function getAllBooks() {
  return getDb().collection(COL).find().toArray();
}

/**
 * Retrieves a single book by its MongoDB ObjectId.
 * @param {string} id - The string representation of the book's _id
 * @returns {Promise<Object|null>} The book document, or null if not found
 */
export function getBookById(id) {
  return getDb()
    .collection(COL)
    .findOne({ _id: new ObjectId(id) });
}

export function getBooksBySellerId(sellerId) {
  return getDb().collection(COL).find({ sellerId }).toArray();
}

/**
 * Inserts a new book listing into the database.
 * Automatically adds a createdAt timestamp.
 * @param {Object} book - Book fields: title, author, price, condition, description, sellerId
 * @returns {Promise<InsertOneResult>} MongoDB insert result containing insertedId
 */
export function createBook(book) {
  return getDb()
    .collection(COL)
    .insertOne({ ...book, createdAt: new Date() });
}

/**
 * Updates fields on an existing book document by id.
 * Uses $set so only the provided fields are modified.
 * @param {string} id - The string representation of the book's _id
 * @param {Object} updates - The fields to update
 * @returns {Promise<UpdateResult>} MongoDB update result
 */
export function updateBook(id, updates) {
  return getDb()
    .collection(COL)
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
}

/**
 * Deletes a book listing from the database by id.
 * @param {string} id - The string representation of the book's _id
 * @returns {Promise<DeleteResult>} MongoDB delete result
 */
export function deleteBook(id) {
  return getDb()
    .collection(COL)
    .deleteOne({ _id: new ObjectId(id) });
}
