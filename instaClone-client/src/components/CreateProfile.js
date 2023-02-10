import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function CreateProfile() {
  const [profile, setProfile] = useState({})
  const {isLoading} = useContext(AuthContext)
  const naviagate = useNavigate()
  const storedToken = localStorage.getItem("authToken")

// profile fields: profileName - bio - avatar
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/api/profile`, profile, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((res) => {
        console.log(res.data)
        setProfile({})
        naviagate(`/profile/${res.data._id}`)
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setProfile(values => ({...values, [name]: value}))
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0])
    axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response)=>{
      console.log(response.data.image)
      setProfile(() => ({...profile, avatar: response.data.image}))    
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
          value={profile.profileName}
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
          Tell us about yoursel
        <input type="text" name="bio" value={profile.bio} onChange={handleChange} className="form-control" 
          maxLength="50" placeholder="I love..."/>  
        </label> 
      </div>
      <div className="col-auto">
        <label className="form-label">
          What abaut you?
          <input  type="file" name="image" className="form-control"  onChange={handleFileUpload}/>
        </label>
        
      </div>
      <button type="submit" className="btn btn-dark">Submit</button>
    </form>
    </div>
  );
}

export default CreateProfile;
