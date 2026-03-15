// components/Header/Header.jsx
// Site-wide navigation bar, rendered on every page via App.jsx.
// Displays the site logo, nav links, and auth controls.
// Shows a "Sell a Book" link only when the user is logged in.
// Manages the visibility of the LoginForm modal.

import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm/LoginForm.jsx";
import { logout } from "../../api/auth.js";
import "./Header.css";

/**
 * Header component — sticky top navigation bar.
 * @param {Object} props
 * @param {Object|null} props.user - The currently logged-in user, or null if not authenticated
 * @param {Function} props.setUser - Setter to update the global user state in App.jsx
 */
export default function Header({ user, setUser }) {
  // Controls whether the LoginForm modal is visible
  const [showLogin, setShowLogin] = useState(false);

  /**
   * Calls the logout API, then clears the user from global state.
   */
  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <header className="header">
      {/* Site logo — links back to the home/browse page */}
      <Link to="/" className="header__logo">
        📚 Second-Shelf
      </Link>

      <nav className="header__nav">
        <Link to="/">Browse</Link>

        {/* Only show the sell link if the user is logged in */}
        {user && <Link to="/add">Sell a Book</Link>}

        {user ? (
          <>
            <span className="header__username">Hi, {user.username}</span>
            <button className="header__btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          /* Open the login modal when the user is not authenticated */
          <button className="header__btn" onClick={() => setShowLogin(true)}>
            Log In
          </button>
        )}
      </nav>

      {/* Render the login modal only when showLogin is true */}
      {showLogin && (
        <LoginForm setUser={setUser} onClose={() => setShowLogin(false)} />
      )}
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string, id: PropTypes.string }),
  setUser: PropTypes.func.isRequired,
};
