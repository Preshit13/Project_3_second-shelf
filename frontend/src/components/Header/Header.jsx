import PropTypes from "prop-types";
import { Link, NavLink } from "react-router";
import "./Header.css";

function Header({ user, onLogout }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg site-navbar">
        <div className="container">
          <Link className="navbar-brand site-navbar__brand" to="/">
            Second-Shelf
          </Link>

          <button
            className="navbar-toggler site-navbar__toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link site-navbar__link${isActive ? " active" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              {user && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/add"
                      className={({ isActive }) =>
                        `nav-link site-navbar__link${isActive ? " active" : ""}`
                      }
                    >
                      Sell a Book
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/my-listings"
                      className={({ isActive }) =>
                        `nav-link site-navbar__link${isActive ? " active" : ""}`
                      }
                    >
                      My Listings
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center gap-2">
              {user ? (
                <>
                  <span className="site-navbar__welcome">Hi, {user.name}</span>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `btn btn-outline-light btn-sm${isActive ? " active" : ""}`
                    }
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `btn btn-light btn-sm${isActive ? " active" : ""}`
                    }
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
