import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Button from 'react-bootstrap/Button';
import FollowModal from "./FollowModal";


function FollowCardButton({ profile_id, followersArr, handleFollow }) {
  const [show, setShow] = useState(false);
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
<>
      <Button variant="warning" onClick={() => setShow(true)}>
        Follow 
      </Button>

      <FollowModal
        show={show}
        onHide={() => setShow(false)}
        profile_id = {profile_id}
        handleFollow = {handleFollow} 
        followersArr = {followersArr}
      />
    </>
  );
}

export default FollowCardButton;
