import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

function PicsProfilePage({ pics, profileId }) {
  const { isLoading } = useContext(AuthContext);
  const picsStyle = {
    maxWith: "200px",
    height: "200px",
    borderRadius: "6px",
    justifyContent: "space-evenly"
  };

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <>
      {pics && pics.map((pic) => {
        return (
          <div key={pic._id} className="col p-1">
            <Link to={`/pics/${profileId}`}>
              <img src={pic.pic} alt={pic.description} style={picsStyle} />
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default PicsProfilePage;
