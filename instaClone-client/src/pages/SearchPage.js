import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function Search() {
  const [serachParameter, setSearchParameter] = useState("profileName");
  const [queryWord, setQueryWord] = useState("");
  const [searchResult, setSearchResul] = useState([])
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  // /search?q=${query}
  // 1. search by @ profileName --> all profile (profileName ==> .startWith( my query word )
  // 2. search by # hashtags --> all pics, loop trhought all hashtags []--> .include( .startWith( my query word ) )

  ///search?q=${query}
  const imageStyle = {
    width: "15vw",
    height: "15vw",
    margin: "0 auto",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const filteredResult = searchResult.filter((el) => el.profileName.toLowerCase().startsWith(queryWord))


  const handleSearch = () => {
    console.log(serachParameter);
    console.log(queryWord);
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/search?${serachParameter}=${queryWord}`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    )
    .then((res) => {
      setSearchResul(res.data)
      console.log(res);
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div>
      <h2>Search by...</h2>
      <div className="input-group flex-nowrap">
        <form action="/search" method="GET" className="search-form">
          <div className="form-check m-2" onChange={(e) => {
                  setSearchParameter(e.target.value);
                }}>
            <label className="form-check-label m-2">
              Hashtag
              <input
                className="form-check-input m-2"
                type="radio"
                name={serachParameter}
                value="hashtags"
                // onChange={(e) => {
                //   setSearchParameter(e.target.value);
                // }}
              />
            </label>
            <label className="form-check-label m-2">
              Profile Name
              <input
                className="form-check-input m-2"
                type="radio"
                name={serachParameter}
                value="profileName"
                // onChange={(e) => {
                //   setSearchParameter(e.target.value);
                // }}
              />
            </label>
          </div>

          <input
            type="text"
            name="queryWord"
            onChange={(e) => setQueryWord(e.target.value)}
            className="form-control"
            placeholder="what are you looking for?"
            aria-describedby="addon-wrapping"
          />
        </form>
      </div>

      {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
      <div className="row mt-5 align-middle justify-content-start">
         {filteredResult.map((el) => {
          return (
            <div className="col" key={el._id} >
              <p>{el.profileName}</p>
              <img src={el.avatar} style={imageStyle} alt="avatar"/>
              <p><small>{el.followers.length} followers</small></p>
            </div>
          )
         })}
      </div>
    </div>
  );
}

export default Search;
