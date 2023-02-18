import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DeleteButton from "../components/profile-components/DeleteButton";
import AddPic from "../components/Pics-components/AddPic";
import PicsProfile from "../components/Pics-components/PicsProfilePage";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const { isLoading } = useContext(AuthContext);
  const { profileId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const getProfile = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setProfile(res.data);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <>
      <div className="row">
        <div className="col col-4 card m-2" style={{ width: "50vh" }}>
          <img
            src={profile.avatar}
            className="card-img-top rounded-circle mt-2"
            alt={profile.profileName}
            
          />

          <div className="card-body">
            <h3 className="card-title mb-2">{profile.profileName}</h3>
            <p className="card-text">{profile.bio}</p>
            <DeleteButton _id={profile._id} profileName={profile.profileName} />
          </div>
        </div>
        <div className="col col-2 card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {profile.pics?.length === 0
                ? "No pictures yet"
                : `Item: ${profile.pics?.length}`}
            </li>
            <li className="list-group-item">
              {profile.followers?.length === 0
                ? "No Followers yet"
                : `Followers: ${profile.followers?.length}`}
            </li>
            <li className="list-group-item">
              {profile.followed?.length === 0
                ? `You don't follow anyone yet`
                : `Profile You follow: ${profile.followed?.length}`}
            </li>
          </ul>
        </div>
        <div className="col col-4">
          <AddPic profileId={profileId} getProfile={getProfile} />
        </div>
      </div>
      <div className="row">
        <PicsProfile pics={profile.pics} profileId={profileId} />
      </div>
      </>
  );
}

export default ProfilePage;
