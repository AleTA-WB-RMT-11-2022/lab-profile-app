import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import WidgetUpload from "./WidgetUpload";

function AddPic({ profileId, getProfile }) {
  // const [pic, setPic] = useState(undefined);
  // const [hashtags, setHashtags] = useState('');
  // const [description, setDescription] = useState('');
  const [item, setItem] = useState({})
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("new ITEM ", item);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/pic/${profileId}`, item, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        getProfile();
        setErrorMessage(undefined);
        setItem({description: '', hashtags: ''})
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setErrorMessage(undefined)
    const name = e.target.name
    const value = e.target.value
    setItem((values) => ({...values, [name]: value}))
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="row align-items-center ms-2">
      <form
        onSubmit={handleSubmit}
        className="border mt-2 p-1 "
        style={{ width: "50vh" }}
      >
        <div className="col-auto">
          <label className="form-label">
            <WidgetUpload setItem={setItem} />
          </label>
        </div>
        <div className="col-auto">
          <label className="form-label">
            Add a description
            <textarea
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              className="form-control"
              maxLength="50"
              placeholder="My summer in..."
            />
          </label>
        </div>
        <div className="col-auto">
          <label className="form-label">
            ###What about###
            <textarea
              type="text"
              name="hashtags"
              value={item.hashtags}
              onChange={handleChange}
              className="form-control"
              maxLength="50"
              placeholder="#summer"
            />
          </label>
          {item.pic && (
            <img
              src={item.pic}
              className=""
              style={{ width: "50px" }}
              alt={item.description}
            />
          )}
        </div>
        {item.pic && (
          <button type="submit" className="btn btn-dark">
            Post
          </button>
        )}
        {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
      </form>
    </div>
  );
}

export default AddPic;
