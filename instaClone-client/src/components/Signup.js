import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {
  const [credentials, setCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, credentials)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit} className="card">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Email
          </span>

          <input
            type="email"
            name='email'
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="email@me.com"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>         
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Password
          </span>

          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="********"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>          
        </label>
        <button className="btn btn-primary m-2" type="submit">
          Submit
        </button>

        {errorMessage && <p className="">- {errorMessage} -</p>}
      </form>
    </div>
  );
}

export default Signup;
