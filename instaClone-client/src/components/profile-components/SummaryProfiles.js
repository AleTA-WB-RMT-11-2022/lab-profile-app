import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import DeleteProfileButton from "./DeleteProfileButton";
import ProfileCardSmall from "./ProfileCardSmall";

function SummaryProfiles({ profiles, deleteProfile }) {
  const { user } = useContext(AuthContext);

  return (
    <ul className="list-group">
      {profiles.map((profile) => {
        return (
          <li
            className="d-flex justify-content-between align-items-end list-group-item"
            key={profile._id}
          >
            <ProfileCardSmall {...profile} />
            {(user?._id === profile.owner) && (
            <DeleteProfileButton profile_id={profile._id} deleteProfile={deleteProfile} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default SummaryProfiles;
