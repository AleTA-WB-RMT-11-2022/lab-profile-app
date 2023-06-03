import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import CheckBox from "./CheckBox";
import SearchForm from "./SearchForm";

function Search() {
  const [serachParameter, setSearchParameter] = useState({hashtags: true, profileName: false});
  const [queryWord, setQueryWord] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  // /search?q=${query}
  // 1. search by @ profileName --> all profile (profileName ==> .startWith( my query word )
  // 2. search by # hashtags --> all pics, loop trhought all hashtags []--> .include( .startWith( my query word ) )

///search?q=${query}

  const handleSearch = () => {
    console.log(queryWord)
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/search`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
};


  const handleChange = (e) => {
    // e.preventDefault()
    const name = e.target.name;
    const checked = e.target.checked;
    setSearchParameter(() => ({[name]: checked }));
  };

  useEffect(() => {
    handleSearch();
    setErrorMessage(undefined)
  }, [queryWord]);


  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div>
      <h2>Search by...</h2>
      <CheckBox
        lable={"#"}
        name={"hashtags"}
        checked={serachParameter.hashtags}
        handleChange={handleChange}
      />
      <CheckBox
        lable={"@"}
        name={"profileName"}
        checked={serachParameter.profileName}
        handleChange={handleChange}
      />
      <div>
        <SearchForm
          hashtags={serachParameter.hashtags}
          profileName={serachParameter.profileName}
          queryWord={queryWord}
          setQueryWord={setQueryWord}
        />
      </div>

      {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
    </div>
  );
}

export default Search;
