import { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth.context";

const CurrentProfileContext = createContext();

function CurrentProfileWrapper(props) {
  const [currentProfile, setCurrentProfile] = useState({});
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const getCurrentProfile = (profileId) => {
    console.log("Checking...");
    if (user.profiles.includes(profileId)) {
      console.log(profileId);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/profiles/${profileId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          console.log("we have a winner", res.data);
          setCurrentProfile(res.data);
          localStorage.setItem("currentProfile", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log("ERROR FROM PROFILE CONTEXT", error);
        });
    }
  };

  const cleanCurrentProfile = () => {
    setCurrentProfile({});
    localStorage.removeItem("currentProfile");
  };

  return (
    <CurrentProfileContext.Provider
      value={{ currentProfile, getCurrentProfile, cleanCurrentProfile }}
    >
      {props.children}
    </CurrentProfileContext.Provider>
  );
}

export { CurrentProfileContext, CurrentProfileWrapper };
