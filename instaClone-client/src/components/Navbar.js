import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { CurrentProfileContext } from "../context/profile.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { currentProfile, cleanCurrentProfile } = useContext(
    CurrentProfileContext
  );

  const imageStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundImage: `url(${currentProfile.avatar})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const handleLogOut = () => {
    logOutUser();
    cleanCurrentProfile();
  };

  useEffect(() => {
  }, [currentProfile])

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="container">
        {!isLoggedIn && (
          <div className="buttons-style">
            <NavLink
              to="/"
              className="navbar-brand home-page-brand btn btn-dark login-btn"
            >
              Home
            </NavLink>
          </div>
        )}

        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        {isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {currentProfile && (
                <li className="nav-item">
                  <NavLink
                    to={`/${currentProfile._id}`}
                    className="nav-link me-3"
                  >
                    <div style={imageStyle}></div>
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/my-profiles" className="nav-link me-3">
                  My Profiles
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/search/profileName" className="nav-link me-3">
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
                    onClick={handleLogOut}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
