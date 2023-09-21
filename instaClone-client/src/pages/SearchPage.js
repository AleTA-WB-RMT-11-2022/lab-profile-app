import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";

function Search() {
  const [queryWord, setQueryWord] = useState(localStorage.getItem("hashtag"));
  const [searchHashtagsResult, setSearchHashtagsResult] = useState([]);
  const [searchProfilesResult, setSearchProfilesResult] = useState([]);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const { searchParam } = useParams();
  console.log("params", searchParam);

  // 1. search by @ profileName --> all profile (profileName ==> .startWith( my query word )
  const filteredProfilesResult = searchProfilesResult.filter((el) => el.profileName.toLowerCase().startsWith(queryWord));

  // 2. search by # hashtags --> all pics, loop throught all hashtags []--> .includes(  my query word  ) .flat()
  //const filteredHashtagsResult = searchHashtagsResult.filter((el) => el.hashtags.includes(queryWord?.toLowerCase()));
  // .map((el, i, arr) => el.hashtags).flat().
  const filteredHashtagsResult = searchHashtagsResult.filter((el) => el.hashtags.filter((hash) => hash.toLowerCase().startsWith(queryWord))  )
  const imageStyle = {
    width: "15vw",
    height: "15vw",
    margin: "0 auto",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const handleHashtagsSearch = () => {
    console.log('handle hashtags search')
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/pics`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => {
        setSearchHashtagsResult(res.data);
        localStorage.removeItem("hashtag")
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleProfileSearch = () => {
    console.log('handle profile search')
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/profiles`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => {
        setSearchProfilesResult(res.data);
        localStorage.removeItem("hashtag")
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }

  useEffect(() => {
    if(searchParam === "hashtags"){
      console.log('On loading --> hashtag')
      handleHashtagsSearch();
      
    } else if(searchParam === "profileName"){
      console.log('On loading --> profile')
      handleProfileSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div>
      <h2>Search by...</h2>
      <div className="input-group flex-nowrap">
        <form action="/search" method="GET" className="search-form">
          <div
            className="form-check m-2"
            // onChange={(e) => {
            //   setSearchParameter(e.target.value);
            // }}
          >
            <label className="form-check-label m-2">
              Hashtag
              <input
                className="form-check-input m-2"
                type="radio"
                // name={serachParameter}
                // value="hashtags"
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
                // name={serachParameter}
                // value="profileName"
                // onChange={(e) => {
                //   setSearchParameter(e.target.value);
                // }}
              />
            </label>
          </div>

          <input
            type="text"
            name="queryWord"
            value={queryWord}
            onChange={(e) => setQueryWord(e.target.value)}
            className="form-control"
            placeholder="what are you looking for?"
            aria-describedby="addon-wrapping"
          />
        </form>
      </div>

      {errorMessage && <p className="text-danger">- {errorMessage} -</p>}

      {/* dislay result of profiles search */}
      
      {(filteredProfilesResult && searchParam === "profileName") && 
      <div className="row mt-5 align-middle justify-content-start">
      {filteredProfilesResult.map((el) => {
          return (
            <div className="col" key={el._id}>
              <p>{el.profileName}</p>
              <img src={el.avatar} style={imageStyle} alt="avatar" />
              <p>
                <small>{el.followers.length} followers</small>
              </p>
            </div>
          );
        })}
      </div>
      }

      {/* dislay result of hashtags search */}
      
      {(filteredHashtagsResult && searchParam === "hashtags" )&& 
      <div className="row mt-5 align-middle justify-content-start">
        {filteredHashtagsResult.map((el) => {
          return (
            <div className="col" key={el._id}>
              <p>{el.description}</p>
              <img src={el.pic} style={imageStyle} alt={el.description} />
              <p>
                <small>{el.likes.length} likes</small>
                <small>From {el.owner?.profileName}</small>
              </p>
            </div>
          );
        })}
      </div>
      }
    </div>
  );
}

export default Search;
