import { createContext, useState, useContext } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./auth.context";

const CurrentProfileContext = createContext();

function CurrentProfileWrapper(props) {
    const [currentProfile, setCurrentProfile] = useState({});
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()


    const getCurrentProfile = (profileId) => {
            console.log('Checking...')
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/profiles/${profileId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((res) => {
            
            if(user.profiles.includes(profileId)){
                console.log('we have a winner', res.data)
                setCurrentProfile(res.data);
            }  
            console.log('helloooooo')         
            navigate(`/${profileId}`)
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            console.log('FROM PROFILE CONTEXT', errorDescription)
          });
      };


  return (
    <CurrentProfileContext.Provider value={{ currentProfile, getCurrentProfile }}> 
      {props.children}
    </CurrentProfileContext.Provider>
  );
}

export { CurrentProfileContext, CurrentProfileWrapper };
