import { useEffect, useState } from "react";


function FollowModalButton( {myProfile, handleFollow, followersArr} ){
  const [follow, setFollow] = useState(null);
      
  const isFollower = () => {
    setFollow(followersArr.includes(myProfile))
  };
  const handleClick = () => {
    handleFollow(myProfile)
    isFollower()
  }

  useEffect(() => {
    isFollower()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    return(
        <>
        {!follow ? 
        <button className="btn btn-warning" onClick={() => {handleClick()}} >Follow</button>
        :
        <button className="btn btn-warning" onClick={() => {handleFollow(myProfile)}} >Unfollow</button>
  }

   </>
    )
}

export default FollowModalButton  