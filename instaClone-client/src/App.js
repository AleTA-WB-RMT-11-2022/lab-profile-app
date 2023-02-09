// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import { Route, Routes } from "react-router-dom";
import {Cloudinary} from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./components/CloudinaryUploadWidget";
//import Signup from "./components/Signup";


function App() {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'daualsgyz'
    }
  });

  return (
    <div className="App container">
   {/* 
   <LogoutButton/> */}
   <Routes >
    <Route path="/" element={<CloudinaryUploadWidget/>} />
    
    {/* <Route path="/login" element={<LoginButton/>} /> */}
   </Routes>
   
    </div>
  );
}

export default App;
