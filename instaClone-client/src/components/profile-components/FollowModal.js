import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FollowModalButton from "./FollowModalButton";
import AvatarSmall from "./AvatarSmall";

function FollowModal({ show, onHide, handleFollow, followersArr}) {
  const [myProfiles, setMyProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoading, user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const getMyProfiles = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profiles/my-profiles`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setMyProfiles(res.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    if (user?._id) {
      getMyProfiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <h1>🤘</h1>;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      keyboard={false}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {myProfiles.map((profile) => {
          return (
            <div className="row" key={profile._id}>
              <div className="col">
                <AvatarSmall {...profile} />
              </div>
              <div className="col">
                <FollowModalButton myProfile ={profile._id}  handleFollow={handleFollow} followersArr= {followersArr}/>
              </div>
            </div>
          );
        })}

        {errorMessage && <p className="text-danger">- {errorMessage} -</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FollowModal;
