import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Login from "../components/Login";
import Signup from "../components/Signup";
import LoginButton from "../components/passport/LoginButton"

function HomePage() {
  const [toggler, setToggler] = useState(true);
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div className="HomePage row">
    <LoginButton />
      {!isLoggedIn && (
        <>
          <h1 className="mt-4">ALE INSTA CLONE</h1>
          
          {toggler ? (
            <div className="col col-4">
              <Login />
              <button
                className="badge bg-primary text-wrap"
                onClick={(pre) => {
                  setToggler(false);
                }}
              >
                Or Sign Up
              </button>
            </div>
          ) : (
            <div className="col col-4">
              <Signup />
              <button
                className="badge bg-primary text-wrap"
                onClick={(pre) => {
                  setToggler(true);
                }}
              >
                Or Log In
              </button>
            </div>
          )}
          <div className="col col-8">add carosel!!!!</div>
        </>
      )}
    </div>
  );
}

export default HomePage;
