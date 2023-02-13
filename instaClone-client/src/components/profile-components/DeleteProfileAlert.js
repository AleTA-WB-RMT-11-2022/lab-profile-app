function DeleteProfileAlert({profileName, deleteProfile, setAlert}){
    return(
       <div className="DeleteProfileAlert">
        <p>Are you sure you want to delete {profileName}</p>
        <button className="btn btn-dark" onClick={() => {setAlert(false)}}>Calcel</button>
        <button className="btn btn-danger" onClick={deleteProfile}>Delete</button>
       </div>
    )
}

export default DeleteProfileAlert