import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import CreateProfile from "../components/profile-components/CreateProfile";
import { Link } from "react-router-dom";
import SearchForm from "../components/profile-components/SearchForm";

function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const { isLoading, user, isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const getProfiles = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/profiles`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((res) => {
        setProfiles(res.data);
      });
  };

  useEffect(() => {
    if (user?._id) 
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div className="ProfilesPage">
      {(isLoggedIn && profiles?.length === 0) && (
        <>
          <div className="col col-4">
            <h2>You don't have a profile yet... make one 👇</h2>
            <CreateProfile getProfiles={getProfiles} />
          </div>
        </>
      )}
      {(isLoggedIn && profiles?.length > 0) && (
        <div className="row">
          <div className="col-4">
            <h2>You already have {profiles.length} profiles</h2>
            <ul className="list-group list-group-flush text-start">
              {profiles.map((profile) => {
                return (
                  <li className="list-group-item" key={profile._id}>
                  <img src={profile.avatar} className="rounded-circle" style={{width: "28px"}} alt={profile.profileName} />
                  <Link to={`/${profile._id}`} style={{ textDecoration: "none", color: "black"}}> {profile.profileName}</Link>   
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-4">
            <h2>Wanna create a new profile? 👇</h2>
            <CreateProfile getProfiles={getProfiles} />
          </div>
          <div className="col-4">
            <h2>Search by...</h2>
            <SearchForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilesPage;
