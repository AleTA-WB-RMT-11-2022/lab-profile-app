import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CreateProfile from "../components/CreateProfile";
import Profiles from "../components/Profiles";

function HomePage() {
  const { isLoading, user, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div className="HomePage ">
      <h1 className="mt-4 bg-danger">ALE INSTACLONE</h1>
      {isLoggedIn && user.profile.length === 0 && (
        <>
          <div className="col col-4">
            <h2>You don't have a profile yet... make one 👇</h2>
            <CreateProfile />
          </div>
        </>
      )}
      {isLoggedIn && user.profile.length > 0 && (
        <div className="row">
          <div className="col-4">
            <h2>You already have {user.profile.length} profiles</h2>
            <Profiles />
          </div>
          <div className="col-4">
            <h2>Wanna create a new profile? 👇</h2>
            <CreateProfile />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
