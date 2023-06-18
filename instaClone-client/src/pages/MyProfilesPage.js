import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import CreateProfile from "../components/profile-components/CreateProfile";
import SummaryProfiles from "../components/profile-components/SummaryProfiles";

function MyProfilesPage() {
  const [myProfiles, setMyProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading, user, setUser } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const getMyProfiles = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profiles/my-profiles`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setMyProfiles(res.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const deleteProfile = (profile_id) => {
    console.log("delete", profile_id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/profiles/${profile_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        getMyProfiles()
        setUser(response.data)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    if (user?._id) {
      getMyProfiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div className="MyProfilesPage row">
      {myProfiles?.length === 0 && (
        <div className="col col-6">
          <h3>Create your first profile👇</h3>
          <CreateProfile getMyProfiles={getMyProfiles} />
        </div>
        // add carousel
      )}
      {myProfiles?.length > 0 && (
        <>
          <div className="col col-6">
            <h3>You already have {myProfiles.length} profiles</h3>
            <SummaryProfiles profiles={myProfiles} deleteProfile={deleteProfile} />
          </div>
          <div className="col col-6">
            <h3>Wanna create a new profile?</h3>
            <CreateProfile getMyProfiles={getMyProfiles} />
          </div>
          {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
        </>
      )}
    </div>
  );
}

export default MyProfilesPage;
