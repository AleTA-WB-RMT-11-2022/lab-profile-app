import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function CreateProfile({getProfiles}) {
  const [newProfile, setNewProfile] = useState({})
  const [picLoading, setPicLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined);
  const {isLoading} = useContext(AuthContext)
  const storedToken = localStorage.getItem("authToken")

// profile fields: profileName - bio - avatar
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/api/profiles`, newProfile, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
         setNewProfile({})
         getProfiles()
       
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
  }

  const handleChange = (e) => {
    setErrorMessage(undefined)
    const name = e.target.name
    const value = e.target.value
    setNewProfile(() => ({...newProfile, [name]: value}))
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    setPicLoading(true)
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0])
    axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response)=>{
      setNewProfile(() => ({...newProfile, avatar: response.data.image})) 
      setPicLoading(false)   
  })
} 
if(isLoading){
    return <p>loading</p>
}

  return (
    <div className="row align-items-center ms-2">
    <form className="border mt-2 p-1" onSubmit={handleSubmit}>
      <div className="col-auto">
      <label className="form-label">
        Profile name
        <input
          type="text"
          name="profileName"
          value={newProfile.profileName}
          onChange={handleChange}
          className="form-control"
          placeholder="GattaMorta68"
          minLength="3"
          maxLength="20"
          required
        />
        </label>
      </div>
      <div className="col-auto">
      <label className="form-label">
          Tell about yoursel
        <input type="text" name="bio" value={newProfile.bio} onChange={handleChange} className="form-control" 
          maxLength="50" placeholder="I love..."/>  
        </label> 
      </div>
      <div className="col-auto">
        <label className="form-label">
          What abaut you?
          <input  type="file" name="image" className="form-control"  onChange={handleFileUpload}/>
          {newProfile.avatar && <img src={newProfile.avatar} className="rounded" style={{width: "28px"}} alt={newProfile.profileName} />}
        </label>
        
      </div>
      {!picLoading && <button type="submit" className="btn btn-dark">Submit</button>}
      {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
    </form>
    </div>
  );
}

export default CreateProfile;
