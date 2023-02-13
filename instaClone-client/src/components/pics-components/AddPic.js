import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";

function AddPic({ profileId, getProfiles }) {
  const [newPic, setNewPic] = useState({});
  const [picLoading, setPicLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/pic/${profileId}`, newPic, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setNewPic({});
        getProfiles();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleChange = (e) => {
    setErrorMessage(undefined);
    const name = e.target.name;
    const value = e.target.value;
    setNewPic(() => ({ ...newPic, [name]: value }));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setPicLoading(true);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNewPic(() => ({ ...newPic, avatar: response.data.image }));
        setPicLoading(false);
      });
  };
  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="row align-items-center ms-2">
      <form className="border mt-2 p-1" onSubmit={handleSubmit}>
        <div className="col-auto">
          <label className="form-label">
            <CloudinaryUploadWidget
              name="profileName"
              value={newPic.pic}
              handleFileUpload={handleFileUpload}
            />
            <input
              type="text"
              name="hashtag"
              value={newPic.hashtag}
              onChange={handleChange}
              className="form-control"
              minLength="3"
              maxLength="20"
            />
          </label>
        </div>
        <div className="col-auto">
          <label className="form-label">
            Add a description
            <textarea
              type="text"
              name="description"
              value={newPic.description}
              onChange={() => {
                handleChange();
              }}
              className="form-control"
              maxLength="50"
              placeholder="My summer in..."
            />
          </label>
        </div>
        <div className="col-auto">
          <label className="form-label">
            What abaut you?
            {/* <input  type="file" name="image" className="form-control"  onChange={handleFileUpload}/> */}
            {newPic.pic && (
              <img
                src={newPic.pic}
                className=""
                style={{ width: "30px" }}
                alt={newPic.hashtag}
              />
            )}
          </label>
        </div>
        {!picLoading && (
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
