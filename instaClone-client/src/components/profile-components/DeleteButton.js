import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteProfileAlert from "./DeleteProfileAlert";

function DeleteButton({_id, profileName}){
    const [alert, setAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined);
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()

    const deleteProfile = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/${_id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(() => {
            navigate('/profiles')
            setAlert(false)  
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }

    return (
        <>
       <button className="btn btn-danger" onClick={deleteProfile}>Delete Profile</button>
       {/* {alert && <DeleteProfileAlert deleteProfile={deleteProfile} profileName={profileName} setAlert={setAlert}/>} */}
        {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
        </>
    )
}

export default DeleteButton