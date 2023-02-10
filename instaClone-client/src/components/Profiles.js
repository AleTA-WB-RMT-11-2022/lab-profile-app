import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function Profiles() {
    const [profiles, setProfiles] = useState([])
    const {isLoading, user} = useContext(AuthContext)
    const storedToken = localStorage.getItem("authToken");

    const getProfiles = () => {
        const query = {owner: user._id}
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/profiles?${query}`,
            query,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((res) => {
          setProfiles(res.data);
        });
    };
  
    useEffect(() => {
        if(user?._id)
      getProfiles();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);
  
    if (isLoading) {
      return <h1>🤘</h1>;
    }

    return (
        <div className="Profiles">
           {profiles.map((profile) => profile._id)}
        </div>
    )
}

export default Profiles