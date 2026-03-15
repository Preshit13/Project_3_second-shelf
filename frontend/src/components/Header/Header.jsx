import PropTypes from "prop-types";
import { Link } from "react-router";
import "./Header.css";

function Header({ user, onLogout }) {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Second-Shelf</Link>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <span className="welcome-text">Hi, {user.name}</span>
              <button type="button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
