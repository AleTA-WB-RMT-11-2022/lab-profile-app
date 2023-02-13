import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DeleteButton from "../components/profile-components/DeleteButton";
import AddPic from "../components/pics-components/AddPic";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div className="ProfilePage col col-6">
      <div className="row">
        <div className="col col-2 card m-2">
          <img
            src={profile.avatar}
            className="rounded-circle"
            alt={profile.profileName}
          />
        </div>
        <div className="col col-2 card-body">
          <h3 className="card-title mb-2">{profile.profileName}</h3>
          <p className="card-text">{profile.bio}</p>
          <DeleteButton _id={profile._id} profileName={profile.profileName}/>
        </div>
        <div className="col col-2 card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
            {(profile.pics?.length === 0) ? 'No pictures yet' : `Item: ${profile.pics?.length}`}
            </li>
            <li className="list-group-item">
            {(profile.followers?.length === 0) ? 'No Followers yet' : `Followers: ${profile.followers?.length}`}
            </li>
            <li className="list-group-item">
            {(profile.followed?.length === 0) ? `You don't follow anyone yet` : `Profile You follow: ${profile.followed?.length}`}
            </li>
          </ul>
        </div>
        <div className="col col-4">
          <AddPic profileId={profile._id} getProfile={getProfile} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
