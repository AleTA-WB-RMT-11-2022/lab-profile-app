import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function HomePage() {
  const { isLoading, user, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <div className="HomePage ">
      <h1 className="mt-4 bg-danger">ALE INSTA CLONE</h1>
      
    </div>
  );
}

export default HomePage;
