import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { fetchBooks } from "../../api/books";
// import BookList from "../../components/BookList/BookList";
// import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // async function loadBooks() {
    //   try {
    //     const data = await fetchBooks();
    //     setBooks(data);
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // }

    // loadBooks();
  }, []);

//   function handleSelect(id) {
//     navigate(`/books/${id}`);
//   }

  return (
    <main className="home-page">
      <h1>Second-Shelf</h1>
      <p>Discover affordable used books and read community reviews.</p>
      {/* {error && <p>{error}</p>} */}
      {/* <BookList books={books} onSelect={handleSelect} /> */}
    </main>
  );
}

export default Home;