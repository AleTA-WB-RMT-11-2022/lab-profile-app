import AvatarSmall from "./AvatarSmall";

function ProfileCardSmall(profile) {
  
  return (
    <>
      <div>
        <AvatarSmall {...profile} />
      </div>
      <div>
        <span>📷 {profile.pics.length} | </span>
        <span>@ followers {profile.followers.length}</span>
      </div>
    </>
  );
}

export default ProfileCardSmall;
