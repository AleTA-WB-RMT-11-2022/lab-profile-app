import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({email:"", password:""});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials)
      .then((res) => {
        storeToken(res.data.authToken)
        authenticateUser()
        setCredentials({})
        navigate("/my-profiles")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  return (
  <div className="row align-items-center ms-2">
    <form className="g-3 border mt-2 p-2" onSubmit={handleSubmit}>
      <div className="col-auto">
        <label className="visually-hidden">Email</label>
        <div className="input-group mb-2">
          <div className="input-group-text">@</div>
             <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange}/>  {/* readonly */}
           </div>
         </div>
      <div className="col-auto mb-2">
        <label className="visually-hidden">Password</label>
        <input type="password" className="form-control" placeholder="Password" name="password" value={credentials.password} onChange={handleChange}/>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-dark mb-2">Confirm identity</button>
      </div>
      {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
    </form>
  </div>
  )
}

export default Login;
