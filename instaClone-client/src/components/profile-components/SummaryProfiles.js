import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import DeleteProfileButton from "./DeleteProfileButton";
import ProfileCardSmall from "./ProfileCardSmall";

function SummaryProfiles({ profiles, deleteProfile, displayedProfile }) {
  const { user } = useContext(AuthContext);

  console.log('from summary', displayedProfile)

  return (
    <ul className="list-group">
      {profiles.map((profile) => {
        return (
          <li
            className="d-flex justify-content-between align-items-end list-group-item"
            key={profile._id}
            data-attribute={(displayedProfile === profile._id) ? 'hidden' : ''}
            hidden= {(displayedProfile === profile._id) ? "hidden" : ""}
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
