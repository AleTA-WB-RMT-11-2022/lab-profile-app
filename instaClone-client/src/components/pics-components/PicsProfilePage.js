import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
//import { Link } from "react-router-dom";

function PicsProfilePage({ pics }) {
  const { isLoading } = useContext(AuthContext);
  const picsStyle = {
    maxWith: "15vh",
    height: "15vh",
    borderRadius: "6px",
    justifyContent: "space-evenly",
    display: "block"
  };

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <>
      {pics && pics.map((pic) => {
        return (
          <div key={pic._id} className="col col-2 p-1 text-start">
              <p>❤️ {pic.likes.length}</p>
              <img src={pic.pic} alt={pic.description} style={picsStyle} />
              {pic.hashtags.map((hashtag) => {
                  return (<>
                    <a href="/search" key={hashtag}>#{hashtag} </a>{" "}
                  </>)
              })}
            
          </div>
        );
      })}
    </>
  );
}

export default PicsProfilePage;
