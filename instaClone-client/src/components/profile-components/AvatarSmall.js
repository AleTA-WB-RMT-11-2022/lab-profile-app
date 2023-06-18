import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentProfileContext } from "../../context/profile.context";

function AvatarSmall( profile ) {

  const {getCurrentProfile} = useContext(CurrentProfileContext)

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
        onClick={() => {getCurrentProfile(profile._id)}}
        style={{ textDecoration: "none", color: "black", textAlign: "start" }}
      >
        <div style={imageStile}></div>
        {"  "} {profile.profileName}
      </Link>
    )
}

export default AvatarSmall