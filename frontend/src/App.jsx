import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { fetchCurrentUser, logoutUser } from "./api/auth.js";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import BookDetails from "./pages/BookDetails/BookDetails.jsx";
import AddBook from "./pages/AddBook/AddBook.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchCurrentUser();
        setUser(data.user || null);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogin(userData) {
    setUser(userData);
  }

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/books/:id" element={<BookDetails user={user} />} />
        <Route path="/add" element={<AddBook user={user} />} />
        <Route path="/edit/:id" element={<AddBook user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
