import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import CheckBox from "./CheckBox";

function SearchForm() {
    const [ queryParams, setQuery ] = useState({hashtags: false, profileName: false})
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setQuery((values) => ({ ...values, [name]: checked }));
  };

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <>
      <CheckBox lable={"#"} name={"hashtags"} checked={queryParams.hashtags} handleChange={handleChange} />
      <CheckBox lable={"@"} name={"profileName"} checked={queryParams.profileName} handleChange={handleChange} />

      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          {queryParams.hashtags && " # "}
          {queryParams.profileName && " @ "}

        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Type here..."
          aria-describedby="addon-wrapping"
        />
      </div>
      {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
    </>
  );
}

export default SearchForm;
