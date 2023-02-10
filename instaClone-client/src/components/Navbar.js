import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar () {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  
  
    return (
        
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid ">
            <div className="buttons-style">
            <Link to= "/" className="navbar-brand home-page-brand btn btn-dark login-btn">Home</Link>
            </div>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                   <li className="nav-item">
                   <Link to= "/profile" className="nav-link me-3" >
                   My Profile
                   </Link>
                   </li>
              {/* <li className="nav-item ">
                <a className="nav-link home-page-brand me-3" href="/events-create">Create an Event</a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link home-page-brand" href="/user-events">My Events</a>
              </li> */}
              
                </ul>
            
                {isLoggedIn && <div className="dropdown-center">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome {user.email}
                </button>
                <ul className="dropdown-menu bg-light">
                  <li><button className="dropdown-item btn btn-dark" href="/auth/logout" onClick={logOutUser}>Logout</button></li>
                </ul>
              </div>}
            
             {!isLoggedIn && <div className="dropdown-center">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login or Sign up
                </button>
                <ul className="dropdown-menu bg-light">
                  <li><Link to="/login" className="dropdown-item btn btn-dark">Login</Link></li>
                  <li><Link to="/signup" className="dropdown-item btn btn-dark">Register</Link></li>
                </ul>
              </div>}
            
          </div>
        </div>
      </nav>
 
    )
}

export default Navbar