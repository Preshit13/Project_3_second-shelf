import BookCard from "../BookCard/BookCard";
// import { useState } from "react";
import "./BookList.css";

const dummyBooks = [
  {
    _id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 8.99,
    condition: "Good",
  },
  {
    _id: "2",
    title: "1984",
    author: "George Orwell",
    price: 6.5,
    condition: "Fair",
  },
  {
    _id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 9.75,
    condition: "Like New",
  },
  {
    _id: "4",
    title: "Moby Dick",
    author: "Herman Melville",
    price: 7.25,
    condition: "Worn",
  },
];

function BookList() {
  // const [books, setBooks] = useState([]);

  return (
    <section className="book-list">
      {dummyBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </section>
  );
}

export default BookList;
