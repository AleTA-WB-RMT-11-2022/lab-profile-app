import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const [profile, setProfile] = useState({});
  const { isLoading, user } = useContext(AuthContext);
  const { profileId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const getProfile = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/profile/${profileId}`,
        profile,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((res) => {
        setProfile(res.data);
      });
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div class="card" style={{width: "18rem"}}>
      <img
        src={profile.avatar}
        class="card-img-top"
        alt={profile.profileName}
      />
      <div class="card-body">
        <h5 class="card-title">{profile.profileName}</h5>
        <p class="card-text">{profile.bio}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
      <div class="card-body"></div>
    </div>
  );
}

export default Profile;
