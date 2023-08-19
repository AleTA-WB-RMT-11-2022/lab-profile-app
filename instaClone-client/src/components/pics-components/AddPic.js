import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import WidgetUpload from "./WidgetUpload";

function AddPic({ profileId, getProfile }) {
  // const [pic, setPic] = useState(undefined);
  // const [hashtags, setHashtags] = useState('');
  // const [description, setDescription] = useState('');
  const [item, setItem] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("new ITEM ", item);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/pics/${profileId}`, item, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        getProfile();
        setErrorMessage(undefined);
        setItem({ description: "", hashtags: "" });
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setErrorMessage(undefined);
    const name = e.target.name;
    const value = e.target.value;
    setItem((values) => ({ ...values, [name]: value }));
  };

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="card align-items-center p-2" style={{ width: "20vw" }}>
      <form onSubmit={handleSubmit}>

          <label className="form-label">
            <WidgetUpload setItem={setItem} />
          </label>

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
        {item.pic && (
          <button type="submit" className="btn btn-dark d-block m-auto mt-2">
            Post
          </button>
        )}
        {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
      </form>
    </div>
  );
}

export default AddPic;
