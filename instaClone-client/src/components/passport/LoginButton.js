
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  console.log('Auth0',loginWithRedirect)
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;