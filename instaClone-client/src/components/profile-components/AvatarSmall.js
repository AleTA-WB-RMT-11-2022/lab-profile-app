import { Link } from "react-router-dom";

function AvatarSmall( profile ) {

    const imageStile = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundImage: `url(${profile.avatar})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
}

    return (
        <Link
        to={`/${profile._id}`}
        style={{ textDecoration: "none", color: "black", textAlign: "start" }}
      >
        <div style={imageStile}></div>
        {"  "} {profile.profileName}
      </Link>
    )
}

export default AvatarSmall