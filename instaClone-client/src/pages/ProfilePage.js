import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AddPic from "../components/pics-components/AddPic";
import PicsProfile from "../components/pics-components/PicsProfilePage";
import FollowCardButton from "../components/profile-components/FollowCardButton";
import SummaryProfiles from "../components/profile-components/SummaryProfiles";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading, user } = useContext(AuthContext);
  const { profileId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const imageStile = {
    width: "30vh",
    height: "30vh",
    margin: "0 auto",
    borderRadius: "50%",
    backgroundImage: `url(${profile.avatar})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const getProfile = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profiles/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setProfile(res.data);
        console.log('From ProfilePage', res.data)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const getProfiles = () => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/profiles`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => {
      setProfiles(res.data);
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  }

  // "/follow/:profileId/:followedId"
const handleFollow = (myProfile) => {
  console.log('MY', myProfile, 'who i want', profile._id)
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/follow/${myProfile}/${profile._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => {
      getProfile()
      getProfiles()
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
}

  useEffect(() => {
    getProfile();
    getProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <>
      <div className="row">
        <div className="col col-4 card m-2 p-2" style={{ width: "50vh" }}>
          <div style={imageStile}></div>
          <div className="card-body">
            <h3 className="card-title mb-2">{profile.profileName}</h3>
            <p className="card-text">{profile.bio}</p>
            {(profile?.owner && user._id !== profile.owner) &&
               <FollowCardButton
                profile_id={profile._id}
                followersArr={profile.followers}
                handleFollow={handleFollow}
              /> 
            }
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
          {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
        </div>
        <div className="col col-2">
          <AddPic profileId={profileId} getProfile={getProfile} />
        </div>
        {profiles && 
          <div className="col-4">
            <h2>New profiles</h2>
            <SummaryProfiles profiles={profiles} displayedProfile={profileId} />
          </div>
        }
      </div>
      <div className="row">
        <PicsProfile pics={profile.pics} profileId={profileId} />
      </div>
    </>
  );
}

export default ProfilePage;
