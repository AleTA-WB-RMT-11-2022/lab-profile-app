import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="buttons-style">
          <NavLink
            to="/"
            className="navbar-brand home-page-brand btn btn-dark login-btn"
          >
            Home
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {isLoggedIn && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <NavLink to="/my-profiles" className="nav-link me-3">
                    My Profiles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/search" className="nav-link me-3">
                    🔍
                  </NavLink>
                </li>
              </ul>
              <div className="dropdown-center">
                <NavLink
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome {user.email}
                </NavLink>
                <ul className="dropdown-menu bg-light">
                  <li>
                    <NavLink
                      className="dropdown-item btn btn-dark"
                      to="/"
                      onClick={logOutUser}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}

          {!isLoggedIn && (
            <div className="dropdown-center">
              <button
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login or Sign up
              </button>
              <ul className="dropdown-menu bg-light">
                <li>
                  <NavLink to="/login" className="dropdown-item btn btn-dark">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="dropdown-item btn btn-dark">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
