function DeleteProfileButton({deleteProfile, profile_id}) {

  return (
        <button className="btn btn-danger" onClick={() => {deleteProfile(profile_id)}}>
          Delete
        </button>
  );
}

export default DeleteProfileButton;
