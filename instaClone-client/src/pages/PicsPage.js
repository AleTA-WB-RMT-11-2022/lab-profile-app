import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function PicsPage() {
    const [profile, setProfile] = useState({});
    const [pics, setPics] = useState([])
    const { isLoading, user } = useContext(AuthContext);
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

    return(<div>hey</div>)
}

export default PicsPage