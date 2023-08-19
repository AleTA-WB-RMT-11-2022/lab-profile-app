import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CurrentProfileContext } from "../context/profile.context"
import AddPic from "../components/pics-components/AddPic";
import PicsProfile from "../components/pics-components/PicsProfilePage";
import SummaryProfiles from "../components/profile-components/SummaryProfiles";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading, user } = useContext(AuthContext);
  const { currentProfile } = useContext(CurrentProfileContext)
  const { profileId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  // new profiles without current chosen profile
  const filteredNewProfiles = profiles.filter((el) => el._id !== profileId)

  const imageStyle = {
    width: "15vw",
    height: "15vw",
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
      });
  };

  // "/follow/:profileId/:followedId"
  const handleFollow = () => {
    console.log("MY", currentProfile.profileName, "who i want", profile.profileName);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/follow/${currentProfile._id}/${profile._id}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => {
        getProfile()
        getProfiles();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <>
      <div className="ProfilePage row mt-2 h-50">

        <div className="col col-3">
          <div className="card" style={{ width: "20vw"}}>
            <h3 className="card-title mb-2">{profile.profileName}</h3>
            <div style={imageStyle}></div>
            <p className="card-text m-3">{profile.bio}</p>

            {profile.owner !== user._id && (
              <button className="btn btn-dark" onClick={handleFollow}>Follow</button>
            )}
          </div>
        </div>

        {/* profile info */}
        <div className="col">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {profile.pics?.length === 0
                ? "No pictures yet"
                : `Item: ${profile.pics?.length}`}
            </li>
            <li className="list-group-item">
              {profile.followers?.length === 0
                ? "No Followers yet"
                : `Followers: ${profile.followers?.length}`
              }
            </li>
            <li className="list-group-item">
              {profile.followed?.length === 0
                ? `Don't follow anyone yet`
                : `Profiles followed: ${profile.followed?.length}`}
            </li>
          </ul>
        </div>

        {errorMessage && <p className="text-danger">- {errorMessage} -</p>}

        {profile?.owner && user._id === profile.owner && (
          <div className="col">
            <AddPic profileId={profileId} getProfile={getProfile} />
          </div>
        )}

        {profiles && (
          <div className="col-4 max-he">
            <h2>New profiles</h2>
            <SummaryProfiles
              profiles={filteredNewProfiles}
              displayedProfile={profileId}
            />
          </div>
        )}
      </div>
      <div className="row mt-4 h-50 align-middle bg-danger justify-content-start">
        <PicsProfile pics={profile.pics} profileId={profileId} />
      </div>
    </>
  );
}

export default ProfilePage;
